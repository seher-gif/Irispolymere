"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { IMAGE_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

export type ProductImageUploadState = { error?: string; success?: boolean };

export async function uploadProductImage(
  slug: string,
  _prev: ProductImageUploadState,
  formData: FormData
): Promise<ProductImageUploadState> {
  const result = await resolveUpload(formData, "file", IMAGE_TYPES);
  if (!result) return { error: "Choose an image to upload." };
  if ("error" in result) return { error: result.error };

  const existing = await prisma.productImage.findUnique({ where: { slug } });
  await prisma.productImage.upsert({
    where: { slug },
    create: { slug, url: result.upload.url },
    update: { url: result.upload.url },
  });
  if (existing) await deleteUpload(existing.url);

  revalidatePath("/admin/product-images");
  publishContent();
  return { success: true };
}

export async function resetProductImage(slug: string) {
  const existing = await prisma.productImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.productImage.delete({ where: { slug } });
  await deleteUpload(existing.url);
  revalidatePath("/admin/product-images");
  publishContent();
}
