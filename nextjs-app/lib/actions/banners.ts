"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_BANNERS = 5;

const ALLOWED = new Map<string, string>([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);

export type BannerUploadState = { error?: string; success?: boolean };

export async function uploadBanner(_prev: BannerUploadState, formData: FormData): Promise<BannerUploadState> {
  const count = await prisma.banner.count();
  if (count >= MAX_BANNERS) {
    return { error: `You can have at most ${MAX_BANNERS} banners. Delete one first.` };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "File is too large (20MB max)." };
  }
  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return { error: "Unsupported file type. Allowed: PNG, JPG, WEBP, SVG." };
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const altText = String(formData.get("altText") ?? "").trim() || null;
  const maxOrder = await prisma.banner.aggregate({ _max: { order: true } });

  await prisma.banner.create({
    data: {
      url: `/uploads/${filename}`,
      altText,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });

  revalidatePath("/admin/banners");
  return { success: true };
}

export async function deleteBanner(id: string) {
  const count = await prisma.banner.count();
  if (count <= 1) {
    throw new Error("At least one banner is required — add another before deleting this one.");
  }

  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) return;
  await prisma.banner.delete({ where: { id } });
  if (banner.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", banner.url));
    } catch {
      // file already gone — ignore
    }
  }
  revalidatePath("/admin/banners");
}
