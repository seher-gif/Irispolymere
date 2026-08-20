"use server";

import { redirect } from "next/navigation";
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

async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = slugify(base);
  let suffix = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${slugify(base)}-${++suffix}`;
  }
}

function readPostFields(formData: FormData) {
  return {
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleFr: String(formData.get("titleFr") ?? "").trim() || null,
    titleAr: String(formData.get("titleAr") ?? "").trim() || null,
    excerptEn: String(formData.get("excerptEn") ?? "").trim(),
    excerptFr: String(formData.get("excerptFr") ?? "").trim() || null,
    excerptAr: String(formData.get("excerptAr") ?? "").trim() || null,
    bodyEn: String(formData.get("bodyEn") ?? "").trim(),
    bodyFr: String(formData.get("bodyFr") ?? "").trim() || null,
    bodyAr: String(formData.get("bodyAr") ?? "").trim() || null,
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createPost(formData: FormData) {
  const fields = readPostFields(formData);
  if (!fields.titleEn || !fields.excerptEn || !fields.bodyEn) {
    throw new Error("Title, excerpt and body (English) are required.");
  }
  const slug = await uniqueSlug(fields.titleEn);

  const post = await prisma.post.create({
    data: {
      ...fields,
      slug,
      publishedAt: fields.published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(id: string, formData: FormData) {
  const fields = readPostFields(formData);
  if (!fields.titleEn || !fields.excerptEn || !fields.bodyEn) {
    throw new Error("Title, excerpt and body (English) are required.");
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new Error("Post not found.");

  const wasPublished = existing.published;
  const nowPublished = fields.published;

  await prisma.post.update({
    where: { id },
    data: {
      ...fields,
      publishedAt: !wasPublished && nowPublished ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}
