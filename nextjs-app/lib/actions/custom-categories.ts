"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { IMAGE_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";
import { HIDDEN_PAGES_KEY } from "@/lib/data/visibility";
import { products } from "@/lib/data/products";

export type CustomCategoryState = { error?: string; success?: boolean };

// Addresses already used by built-in pages under /products/.
const RESERVED = new Set<string>(["pvc", "masterbatch", "color-masterbatch", ...products.map((p) => p.slug)]);

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function fields(formData: FormData) {
  return {
    titleEn: text(formData, "titleEn"),
    titleAr: text(formData, "titleAr") || null,
    titleFr: text(formData, "titleFr") || null,
    descEn: text(formData, "descEn"),
    descAr: text(formData, "descAr") || null,
    descFr: text(formData, "descFr") || null,
  };
}

function refresh() {
  revalidatePath("/admin/product-pages");
  publishContent();
}

export async function createCustomCategory(_prev: CustomCategoryState, formData: FormData): Promise<CustomCategoryState> {
  const data = fields(formData);
  if (!data.titleEn) return { error: "Enter the category name in English." };
  if (!data.descEn) return { error: "Enter a short description in English." };

  const image = await resolveUpload(formData, "file", IMAGE_TYPES);
  if (image && "error" in image) return { error: image.error };

  const base = slugify(data.titleEn) || "category";
  let slug = base;
  for (let i = 2; RESERVED.has(slug) || (await prisma.customCategory.findUnique({ where: { slug } })); i++) slug = `${base}-${i}`;

  const max = await prisma.customCategory.aggregate({ _max: { order: true } });
  await prisma.customCategory.create({
    data: { slug, ...data, imageUrl: image?.upload.url ?? null, order: (max._max.order ?? 0) + 1 },
  });
  refresh();
  return { success: true };
}

export async function updateCustomCategory(id: string, _prev: CustomCategoryState, formData: FormData): Promise<CustomCategoryState> {
  const existing = await prisma.customCategory.findUnique({ where: { id } });
  if (!existing) return { error: "This category no longer exists." };
  const data = fields(formData);
  if (!data.titleEn) return { error: "Enter the category name in English." };
  if (!data.descEn) return { error: "Enter a short description in English." };

  const image = await resolveUpload(formData, "file", IMAGE_TYPES);
  if (image && "error" in image) return { error: image.error };

  await prisma.customCategory.update({
    where: { id },
    data: { ...data, ...(image ? { imageUrl: image.upload.url } : {}) },
  });
  if (image) await deleteUpload(existing.imageUrl);
  refresh();
  return { success: true };
}

export async function deleteCustomCategory(id: string) {
  const existing = await prisma.customCategory.findUnique({ where: { id } });
  if (!existing) return;
  await prisma.customCategory.delete({ where: { id } });
  await deleteUpload(existing.imageUrl);

  // Drop it from the hidden list so a future category reusing the address starts visible.
  const row = await prisma.siteSetting.findUnique({ where: { key: HIDDEN_PAGES_KEY } });
  if (row) {
    try {
      const next = (JSON.parse(row.value) as string[]).filter((s) => s !== existing.slug);
      await prisma.siteSetting.update({ where: { key: HIDDEN_PAGES_KEY }, data: { value: JSON.stringify(next) } });
    } catch {}
  }
  refresh();
}
