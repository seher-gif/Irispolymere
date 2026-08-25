"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 20 * 1024 * 1024; // 20MB

const ALLOWED = new Map<string, { ext: string; kind: string }>([
  ["application/pdf", { ext: "pdf", kind: "pdf" }],
  ["image/png", { ext: "png", kind: "image" }],
  ["image/jpeg", { ext: "jpg", kind: "image" }],
  ["image/webp", { ext: "webp", kind: "image" }],
  ["image/svg+xml", { ext: "svg", kind: "image" }],
]);

export type UploadState = { error?: string; success?: boolean };

export async function uploadMedia(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "File is too large (20MB max)." };
  }
  const meta = ALLOWED.get(file.type);
  if (!meta) {
    return { error: "Unsupported file type. Allowed: PDF, PNG, JPG, WEBP, SVG." };
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${meta.ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const altText = String(formData.get("altText") ?? "").trim() || null;

  await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      kind: meta.kind,
      url: `/uploads/${filename}`,
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
  try {
    await unlink(path.join(UPLOAD_DIR, media.filename));
  } catch {
    // file already gone — ignore
  }
  revalidatePath("/admin/media");
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
