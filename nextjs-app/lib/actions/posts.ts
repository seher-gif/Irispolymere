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
  const cleaned = slugify(base);
  let slug = cleaned || "post";
  let suffix = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${cleaned || "post"}-${++suffix}`;
  }
}

// Tiptap's serialized "empty" document — treat it the same as a blank field
// so an untouched locale tab still falls back to English at export time.
const EMPTY_RICH_TEXT = new Set(["", "<p></p>"]);

function richText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return EMPTY_RICH_TEXT.has(value) ? null : value;
}

const META_TITLE_MAX = 70;
const META_DESCRIPTION_MAX = 165;

function metaField(formData: FormData, key: string, max: number) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value.slice(0, max) : null;
}

function readPostFields(formData: FormData) {
  return {
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleFr: String(formData.get("titleFr") ?? "").trim() || null,
    titleAr: String(formData.get("titleAr") ?? "").trim() || null,
    excerptEn: String(formData.get("excerptEn") ?? "").trim(),
    excerptFr: String(formData.get("excerptFr") ?? "").trim() || null,
    excerptAr: String(formData.get("excerptAr") ?? "").trim() || null,
    bodyEn: richText(formData, "bodyEn") ?? "",
    bodyFr: richText(formData, "bodyFr"),
    bodyAr: richText(formData, "bodyAr"),
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? "").trim() || null,
    published: formData.get("published") === "on",
    metaTitleEn: metaField(formData, "metaTitleEn", META_TITLE_MAX),
    metaTitleFr: metaField(formData, "metaTitleFr", META_TITLE_MAX),
    metaTitleAr: metaField(formData, "metaTitleAr", META_TITLE_MAX),
    metaDescriptionEn: metaField(formData, "metaDescriptionEn", META_DESCRIPTION_MAX),
    metaDescriptionFr: metaField(formData, "metaDescriptionFr", META_DESCRIPTION_MAX),
    metaDescriptionAr: metaField(formData, "metaDescriptionAr", META_DESCRIPTION_MAX),
  };
}

export type PostFormState = { error?: string };

export async function createPost(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const fields = readPostFields(formData);
  if (!fields.titleEn || !fields.excerptEn || !fields.bodyEn) {
    return { error: "Title, excerpt and body (English) are required." };
  }

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = await uniqueSlug(requestedSlug || fields.titleEn);

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

export async function updatePost(id: string, _prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const fields = readPostFields(formData);
  if (!fields.titleEn || !fields.excerptEn || !fields.bodyEn) {
    return { error: "Title, excerpt and body (English) are required." };
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { error: "Post not found." };

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = requestedSlug
    ? await uniqueSlug(requestedSlug, id)
    : existing.slug;

  const wasPublished = existing.published;
  const nowPublished = fields.published;

  await prisma.post.update({
    where: { id },
    data: {
      ...fields,
      slug,
      publishedAt: !wasPublished && nowPublished ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
  return {};
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}
