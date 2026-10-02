"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED = new Map<string, string>([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
]);

export type PageHeroUploadState = { error?: string; success?: boolean };

export async function uploadPageHeroImage(
  slug: string,
  _prev: PageHeroUploadState,
  formData: FormData
): Promise<PageHeroUploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image to upload." };
  if (file.size > MAX_SIZE) return { error: "File is too large (20MB max)." };
  const ext = ALLOWED.get(file.type);
  if (!ext) return { error: "Unsupported file type. Allowed: PNG, JPG, WEBP." };

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()));
  const url = `/uploads/${filename}`;

  const existing = await prisma.pageHeroImage.findUnique({ where: { slug } });
  await prisma.pageHeroImage.upsert({ where: { slug }, create: { slug, url }, update: { url } });
  if (existing?.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", existing.url));
    } catch {}
  }

  revalidatePath(`/admin/pages/corporate/${slug}`);
  return { success: true };
}

export async function resetPageHeroImage(slug: string) {
  const existing = await prisma.pageHeroImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.pageHeroImage.delete({ where: { slug } });
  if (existing.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", existing.url));
    } catch {}
  }
  revalidatePath(`/admin/pages/corporate/${slug}`);
}
