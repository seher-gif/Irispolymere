"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { IMAGE_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

export type PageHeroUploadState = { error?: string; success?: boolean };

export async function uploadPageHeroImage(
  slug: string,
  _prev: PageHeroUploadState,
  formData: FormData
): Promise<PageHeroUploadState> {
  const result = await resolveUpload(formData, "file", IMAGE_TYPES);
  if (!result) return { error: "Choose an image to upload." };
  if ("error" in result) return { error: result.error };

  const existing = await prisma.pageHeroImage.findUnique({ where: { slug } });
  await prisma.pageHeroImage.upsert({
    where: { slug },
    create: { slug, url: result.upload.url },
    update: { url: result.upload.url },
  });
  if (existing) await deleteUpload(existing.url);

  revalidatePath(`/admin/pages/corporate/${slug}`);
  publishContent();
  return { success: true };
}

export async function resetPageHeroImage(slug: string) {
  const existing = await prisma.pageHeroImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.pageHeroImage.delete({ where: { slug } });
  await deleteUpload(existing.url);
  revalidatePath(`/admin/pages/corporate/${slug}`);
  publishContent();
}
