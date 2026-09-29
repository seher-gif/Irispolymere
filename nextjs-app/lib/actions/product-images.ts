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

export type ProductImageUploadState = { error?: string; success?: boolean };

export async function uploadProductImage(
  slug: string,
  _prev: ProductImageUploadState,
  formData: FormData
): Promise<ProductImageUploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image to upload." };
  if (file.size > MAX_SIZE) return { error: "File is too large (20MB max)." };
  const ext = ALLOWED.get(file.type);
  if (!ext) return { error: "Unsupported file type. Allowed: PNG, JPG, WEBP." };

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  const url = `/uploads/${filename}`;

  await prisma.productImage.upsert({
    where: { slug },
    create: { slug, url },
    update: { url },
  });

  revalidatePath("/admin/product-images");
  return { success: true };
}

export async function resetProductImage(slug: string) {
  const existing = await prisma.productImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.productImage.delete({ where: { slug } });
  if (existing.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", existing.url));
    } catch {}
  }
  revalidatePath("/admin/product-images");
}
