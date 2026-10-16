"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { IMAGE_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

// "home-about" is the homepage About section's photo; every other slug is a corporate page.
function adminPath(slug: string) {
  return slug === "home-about" ? "/admin/pages/home" : `/admin/pages/corporate/${slug}`;
}

export type CorporateHeroUploadState = { error?: string; success?: boolean };

export async function uploadCorporateHeroImage(
  slug: string,
  _prev: CorporateHeroUploadState,
  formData: FormData
): Promise<CorporateHeroUploadState> {
  const existing = await prisma.corporateHeroImage.findUnique({ where: { slug } });

  const en = await resolveUpload(formData, "fileEn", IMAGE_TYPES);
  if (en && "error" in en) return { error: en.error };
  const fr = await resolveUpload(formData, "fileFr", IMAGE_TYPES);
  if (fr && "error" in fr) {
    if (en) await deleteUpload(en.upload.url);
    return { error: fr.error };
  }
  const ar = await resolveUpload(formData, "fileAr", IMAGE_TYPES);
  if (ar && "error" in ar) {
    if (en) await deleteUpload(en.upload.url);
    if (fr) await deleteUpload(fr.upload.url);
    return { error: ar.error };
  }

  const urlEn = en?.upload.url ?? existing?.urlEn ?? null;
  if (!urlEn) return { error: "Choose an English image to upload — it's required." };
  const urlFr = fr?.upload.url ?? existing?.urlFr ?? null;
  const urlAr = ar?.upload.url ?? existing?.urlAr ?? null;

  await prisma.corporateHeroImage.upsert({
    where: { slug },
    create: { slug, urlEn, urlFr, urlAr },
    update: { urlEn, urlFr, urlAr },
  });

  // Replaced files are no longer referenced.
  if (existing) {
    if (en) await deleteUpload(existing.urlEn);
    if (fr) await deleteUpload(existing.urlFr);
    if (ar) await deleteUpload(existing.urlAr);
  }

  revalidatePath(adminPath(slug));
  publishContent();
  return { success: true };
}

export async function resetCorporateHeroImage(slug: string) {
  const existing = await prisma.corporateHeroImage.findUnique({ where: { slug } });
  if (!existing) return;
  await prisma.corporateHeroImage.delete({ where: { slug } });
  for (const url of [existing.urlEn, existing.urlFr, existing.urlAr]) await deleteUpload(url);
  revalidatePath(adminPath(slug));
  publishContent();
}
