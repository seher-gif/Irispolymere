"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { pageRegistryByKey } from "@/lib/data/page-registry";

export type PageMetaFormState = { error?: string; success?: boolean };

const META_TITLE_MAX = 70;
const META_DESCRIPTION_MAX = 165;

function metaField(formData: FormData, key: string, max: number) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value.slice(0, max) : null;
}

export async function updatePageMeta(key: string, _prev: PageMetaFormState, formData: FormData): Promise<PageMetaFormState> {
  if (!pageRegistryByKey[key]) {
    return { error: "Unknown page." };
  }

  await prisma.pageMeta.upsert({
    where: { key },
    create: {
      key,
      metaTitleEn: metaField(formData, "metaTitleEn", META_TITLE_MAX),
      metaTitleFr: metaField(formData, "metaTitleFr", META_TITLE_MAX),
      metaTitleAr: metaField(formData, "metaTitleAr", META_TITLE_MAX),
      metaDescriptionEn: metaField(formData, "metaDescriptionEn", META_DESCRIPTION_MAX),
      metaDescriptionFr: metaField(formData, "metaDescriptionFr", META_DESCRIPTION_MAX),
      metaDescriptionAr: metaField(formData, "metaDescriptionAr", META_DESCRIPTION_MAX),
    },
    update: {
      metaTitleEn: metaField(formData, "metaTitleEn", META_TITLE_MAX),
      metaTitleFr: metaField(formData, "metaTitleFr", META_TITLE_MAX),
      metaTitleAr: metaField(formData, "metaTitleAr", META_TITLE_MAX),
      metaDescriptionEn: metaField(formData, "metaDescriptionEn", META_DESCRIPTION_MAX),
      metaDescriptionFr: metaField(formData, "metaDescriptionFr", META_DESCRIPTION_MAX),
      metaDescriptionAr: metaField(formData, "metaDescriptionAr", META_DESCRIPTION_MAX),
    },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${key}`);
  return { success: true };
}
