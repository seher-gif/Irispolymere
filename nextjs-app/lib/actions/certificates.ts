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
