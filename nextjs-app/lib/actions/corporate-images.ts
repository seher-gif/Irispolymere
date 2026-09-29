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

async function saveFile(file: File) {
  const ext = ALLOWED.get(file.type);
  if (!ext) return null;
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export type CorporateHeroUploadState = { error?: string; success?: boolean };

export async function uploadCorporateHeroImage(
  slug: string,
  _prev: CorporateHeroUploadState,
  formData: FormData
): Promise<CorporateHeroUploadState> {
  const fileEn = formData.get("fileEn");
  const existing = await prisma.corporateHeroImage.findUnique({ where: { slug } });

  let urlEn = existing?.urlEn ?? null;
  if (fileEn instanceof File && fileEn.size > 0) {
    if (fileEn.size > MAX_SIZE) return { error: "File is too large (20MB max)." };
    const saved = await saveFile(fileEn);
    if (!saved) return { error: "Unsupported file type. Allowed: PNG, JPG, WEBP." };
    urlEn = saved;
  }
  if (!urlEn) return { error: "Choose an English image to upload — it's required." };

  const fileFr = formData.get("fileFr");
  let urlFr = existing?.urlFr ?? null;
  if (fileFr instanceof File && fileFr.size > 0) {
    if (fileFr.size > MAX_SIZE) return { error: "File is too large (20MB max)." };
    const saved = await saveFile(fileFr);
    if (!saved) return { error: "Unsupported file type for the French image." };
    urlFr = saved;
  }

  const fileAr = formData.get("fileAr");
  let urlAr = existing?.urlAr ?? null;
  if (fileAr instanceof File && fileAr.size > 0) {
    if (fileAr.size > MAX_SIZE) return { error: "File is too large (20MB max)." };
    const saved = await saveFile(fileAr);
    if (!saved) return { error: "Unsupported file type for the Arabic image." };
    urlAr = saved;
  }

  await prisma.corporateHeroImage.upsert({
    where: { slug },
    create: { slug, urlEn, urlFr, urlAr },
    update: { urlEn, urlFr, urlAr },
  });

  revalidatePath(`/admin/pages/corporate/${slug}`);
  return { success: true };
}

export async function resetCorporateHeroImage(slug: string) {
  const existing = await prisma.corporateHeroImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.corporateHeroImage.delete({ where: { slug } });
  for (const url of [existing.urlEn, existing.urlFr, existing.urlAr]) {
    if (url && url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", url));
      } catch {}
    }
  }
  revalidatePath(`/admin/pages/corporate/${slug}`);
}
