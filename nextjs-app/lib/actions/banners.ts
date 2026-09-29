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

async function saveFile(file: File) {
  const ext = ALLOWED.get(file.type);
  if (!ext) return null;
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export type BannerUploadState = { error?: string; success?: boolean };

export async function uploadBanner(_prev: BannerUploadState, formData: FormData): Promise<BannerUploadState> {
  const count = await prisma.banner.count();
  if (count >= MAX_BANNERS) {
    return { error: `You can have at most ${MAX_BANNERS} banners. Delete one first.` };
  }

  const fileEn = formData.get("fileEn");
  if (!(fileEn instanceof File) || fileEn.size === 0) {
    return { error: "Choose an English image to upload — it's required." };
  }
  const fileFr = formData.get("fileFr");
  const fileAr = formData.get("fileAr");

  for (const f of [fileEn, fileFr, fileAr]) {
    if (f instanceof File && f.size > 0 && f.size > MAX_SIZE) {
      return { error: "File is too large (20MB max)." };
    }
  }

  const urlEn = await saveFile(fileEn);
  if (!urlEn) return { error: "Unsupported file type. Allowed: PNG, JPG, WEBP, SVG." };

  let urlFr: string | null = null;
  if (fileFr instanceof File && fileFr.size > 0) {
    urlFr = await saveFile(fileFr);
    if (!urlFr) return { error: "Unsupported file type for the French image. Allowed: PNG, JPG, WEBP, SVG." };
  }
  let urlAr: string | null = null;
  if (fileAr instanceof File && fileAr.size > 0) {
    urlAr = await saveFile(fileAr);
    if (!urlAr) return { error: "Unsupported file type for the Arabic image. Allowed: PNG, JPG, WEBP, SVG." };
  }

  const altTextEn = String(formData.get("altTextEn") ?? "").trim() || null;
  const altTextFr = String(formData.get("altTextFr") ?? "").trim() || null;
  const altTextAr = String(formData.get("altTextAr") ?? "").trim() || null;
  const maxOrder = await prisma.banner.aggregate({ _max: { order: true } });

  await prisma.banner.create({
    data: {
      urlEn,
      urlFr,
      urlAr,
      altTextEn,
      altTextFr,
      altTextAr,
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
  for (const url of [banner.urlEn, banner.urlFr, banner.urlAr]) {
    if (url && url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", url));
      } catch {
        // file already gone — ignore
      }
    }
  }
  revalidatePath("/admin/banners");
}
