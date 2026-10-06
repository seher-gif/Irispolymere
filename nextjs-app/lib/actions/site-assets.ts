"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir, copyFile, access } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { prisma } from "@/lib/db";
import { siteAssetRegistryByKey } from "@/lib/data/site-asset-registry";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 20 * 1024 * 1024; // 20MB

const ALLOWED = new Map<string, string>([
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

// Next.js reads these two files directly from the filesystem at build time
// (its file-based icon convention) — there's no runtime data path for them,
// so the upload has to land here instead of under /public/uploads.
const BUILD_TIME_TARGETS: Record<string, string> = {
  favicon: path.join(process.cwd(), "app", "icon.png"),
  "apple-icon": path.join(process.cwd(), "app", "apple-icon.png"),
};

// Backup path for the pristine bundled file, made once before the first
// overwrite, so "Reset to default" has something real to restore.
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

function backupPath(target: string) {
  return target.replace(/\.png$/, ".default.png");
}

async function fileExists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

export type SiteAssetUploadState = { error?: string; success?: boolean };

export async function uploadSiteAsset(key: string, _prev: SiteAssetUploadState, formData: FormData): Promise<SiteAssetUploadState> {
  const slot = siteAssetRegistryByKey[key];
  if (!slot) return { error: "Unknown asset." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "File is too large (20MB max)." };
  }
  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return { error: "Unsupported file type. Allowed: PNG, WEBP." };
  }
  if (slot.buildTime && ext !== "png") {
    return { error: "This asset must be a PNG." };
  }

  let buffer: Buffer = Buffer.from(await file.arrayBuffer());
  if (TRIMMED_KEYS.has(key)) buffer = await trimTransparentMargins(buffer, ext);

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  const url = `/uploads/${filename}`;

  if (slot.buildTime) {
    const target = BUILD_TIME_TARGETS[key];
    const backup = backupPath(target);
    if (!(await fileExists(backup))) {
      await copyFile(target, backup);
    }
    await writeFile(target, buffer);
  }

  await prisma.siteAsset.upsert({
    where: { key },
    create: { key, url },
    update: { url },
  });

  revalidatePath("/admin/assets");
  return { success: true };
}

export async function resetSiteAsset(key: string) {
  const existing = await prisma.siteAsset.findUnique({ where: { key } });
  if (!existing) return;
  await prisma.siteAsset.delete({ where: { key } });
  if (existing.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", existing.url));
    } catch {
      // file already gone — ignore
    }
  }

  const target = BUILD_TIME_TARGETS[key];
  if (target) {
    const backup = backupPath(target);
    if (await fileExists(backup)) {
      await copyFile(backup, target);
    }
  }

  revalidatePath("/admin/assets");
}
