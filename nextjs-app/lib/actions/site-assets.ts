"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir, copyFile, access } from "fs/promises";
import path from "path";
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

  const buffer = Buffer.from(await file.arrayBuffer());

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
