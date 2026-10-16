"use server";

import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { prisma } from "@/lib/db";
import { siteAssetRegistryByKey } from "@/lib/data/site-asset-registry";
import { deleteUpload, readUpload, resolveUpload, storeBuffer } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

// Logos come in with generous transparent padding; trim it so the logo fills its box on the
// site without anyone having to crop or resize the file. Opaque images are left untouched.
async function trimTransparentMargins(input: Buffer, ext: string): Promise<Buffer> {
  try {
    const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return input;
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    if (width === info.width && height === info.height) return input;
    const cropped = sharp(input).extract({ left: minX, top: minY, width, height });
    return ext === "png" ? await cropped.png().toBuffer() : await cropped.webp({ lossless: true }).toBuffer();
  } catch {
    return input;
  }
}

const TRIMMED_KEYS = new Set(["logo-mark", "logo-full"]);

export type SiteAssetUploadState = { error?: string; success?: boolean };

export async function uploadSiteAsset(key: string, _prev: SiteAssetUploadState, formData: FormData): Promise<SiteAssetUploadState> {
  const slot = siteAssetRegistryByKey[key];
  if (!slot) return { error: "Unknown asset." };

  const allowed = new Map<string, string>();
  for (const type of slot.accept.split(",")) allowed.set(type.trim(), type.trim().split("/")[1]);

  const result = await resolveUpload(formData, "file", allowed);
  if (!result) return { error: "Choose an image to upload." };
  if ("error" in result) return { error: result.error };

  let { url } = result.upload;
  const { ext, type } = result.upload;

  if (TRIMMED_KEYS.has(key)) {
    const original = await readUpload(url);
    const trimmed = await trimTransparentMargins(original, ext);
    if (trimmed !== original) {
      const trimmedUrl = await storeBuffer(trimmed, ext, type);
      await deleteUpload(url);
      url = trimmedUrl;
    }
  }

  const existing = await prisma.siteAsset.findUnique({ where: { key } });
  await prisma.siteAsset.upsert({ where: { key }, create: { key, url }, update: { url } });
  if (existing) await deleteUpload(existing.url);

  revalidatePath("/admin/assets");
  publishContent();
  return { success: true };
}

export async function resetSiteAsset(key: string) {
  const existing = await prisma.siteAsset.findUnique({ where: { key } });
  if (!existing) return;
  await prisma.siteAsset.delete({ where: { key } });
  await deleteUpload(existing.url);
  revalidatePath("/admin/assets");
  publishContent();
}
