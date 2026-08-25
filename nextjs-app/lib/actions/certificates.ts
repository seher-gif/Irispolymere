"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateCertificate(id: string, formData: FormData) {
  const data = {
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleFr: String(formData.get("titleFr") ?? "").trim(),
    titleAr: String(formData.get("titleAr") ?? "").trim(),
    descEn: String(formData.get("descEn") ?? "").trim(),
    descFr: String(formData.get("descFr") ?? "").trim(),
    descAr: String(formData.get("descAr") ?? "").trim(),
    pdfUrl: String(formData.get("pdfUrl") ?? "").trim() || null,
  };
  await prisma.certificate.update({ where: { id }, data });
  revalidatePath("/admin/certificates");
}

export type CreateCertificateState = { error?: string };

function slugifyKey(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function createCertificate(_prev: CreateCertificateState, formData: FormData): Promise<CreateCertificateState> {
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  if (!titleEn) return { error: "English title is required." };

  const key = slugifyKey(String(formData.get("key") ?? "") || titleEn);
  if (!key) return { error: "Could not derive a certificate key from that title." };

  const existing = await prisma.certificate.findUnique({ where: { key } });
  if (existing) return { error: `A certificate with key "${key}" already exists.` };

  await prisma.certificate.create({
    data: {
      key,
      titleEn,
      titleFr: String(formData.get("titleFr") ?? "").trim() || titleEn,
      titleAr: String(formData.get("titleAr") ?? "").trim() || titleEn,
      descEn: String(formData.get("descEn") ?? "").trim(),
      descFr: String(formData.get("descFr") ?? "").trim(),
      descAr: String(formData.get("descAr") ?? "").trim(),
    },
  });
  revalidatePath("/admin/certificates");
  return {};
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/admin/certificates");
}
