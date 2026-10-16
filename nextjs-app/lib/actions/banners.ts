"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { IMAGE_TYPES, deleteUpload, resolveUpload } from "@/lib/storage";
import { publishContent } from "@/lib/publish";

const MAX_BANNERS = 5;

export type BannerUploadState = { error?: string; success?: boolean };

export async function uploadBanner(_prev: BannerUploadState, formData: FormData): Promise<BannerUploadState> {
  const count = await prisma.banner.count();
  if (count >= MAX_BANNERS) {
    return { error: `You can have at most ${MAX_BANNERS} banners. Delete one first.` };
  }

  const en = await resolveUpload(formData, "fileEn", IMAGE_TYPES);
  if (!en) return { error: "Choose an English image to upload — it's required." };
  if ("error" in en) return { error: en.error };

  const fr = await resolveUpload(formData, "fileFr", IMAGE_TYPES);
  if (fr && "error" in fr) {
    await deleteUpload(en.upload.url);
    return { error: fr.error };
  }
  const ar = await resolveUpload(formData, "fileAr", IMAGE_TYPES);
  if (ar && "error" in ar) {
    await deleteUpload(en.upload.url);
    if (fr) await deleteUpload(fr.upload.url);
    return { error: ar.error };
  }

  const altTextEn = String(formData.get("altTextEn") ?? "").trim() || null;
  const altTextFr = String(formData.get("altTextFr") ?? "").trim() || null;
  const altTextAr = String(formData.get("altTextAr") ?? "").trim() || null;
  const maxOrder = await prisma.banner.aggregate({ _max: { order: true } });

  await prisma.banner.create({
    data: {
      urlEn: en.upload.url,
      urlFr: fr?.upload.url ?? null,
      urlAr: ar?.upload.url ?? null,
      altTextEn,
      altTextFr,
      altTextAr,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });

  revalidatePath("/admin/banners");
  publishContent();
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
  for (const url of [banner.urlEn, banner.urlFr, banner.urlAr]) await deleteUpload(url);
  revalidatePath("/admin/banners");
  publishContent();
}
