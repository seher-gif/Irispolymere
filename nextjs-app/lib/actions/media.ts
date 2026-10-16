"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { MEDIA_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

export type UploadState = { error?: string; success?: boolean };

export async function uploadMedia(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const result = await resolveUpload(formData, "file", MEDIA_TYPES);
  if (!result) return { error: "Choose a file to upload." };
  if ("error" in result) return { error: result.error };
  const { url, name, type, size, ext } = result.upload;

  const altText = String(formData.get("altText") ?? "").trim() || null;

  await prisma.media.create({
    data: {
      filename: url.split("/").pop() ?? `file.${ext}`,
      originalName: name || `file.${ext}`,
      mimeType: type,
      sizeBytes: size,
      kind: ext === "pdf" ? "pdf" : "image",
      url,
      altText,
    },
  });

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;
  await prisma.media.delete({ where: { id } });
  await deleteUpload(media.url);
  revalidatePath("/admin/media");
  publishContent();
}

export async function updateMediaAltText(id: string, altText: string) {
  await prisma.media.update({ where: { id }, data: { altText: altText.trim() || null } });
  revalidatePath("/admin/media");
}

export async function listMedia(kind?: "image" | "pdf") {
  return prisma.media.findMany({
    where: kind ? { kind } : undefined,
    orderBy: { uploadedAt: "desc" },
  });
}
