"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createCategory(formData: FormData) {
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const nameFr = String(formData.get("nameFr") ?? "").trim() || nameEn;
  const nameAr = String(formData.get("nameAr") ?? "").trim() || nameEn;
  if (!nameEn) return;

  let slug = slugify(nameEn);
  let suffix = 1;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${slugify(nameEn)}-${++suffix}`;
  }

  await prisma.category.create({ data: { slug, nameEn, nameFr, nameAr } });
  revalidatePath("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const nameFr = String(formData.get("nameFr") ?? "").trim() || nameEn;
  const nameAr = String(formData.get("nameAr") ?? "").trim() || nameEn;
  if (!nameEn) return;

  await prisma.category.update({ where: { id }, data: { nameEn, nameFr, nameAr } });
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  const inUse = await prisma.post.count({ where: { categoryId: id } });
  if (inUse > 0) {
    throw new Error(`Cannot delete: ${inUse} post(s) still use this category.`);
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
