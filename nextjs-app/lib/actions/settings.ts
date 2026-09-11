"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const CONTACT_NOTIFICATION_EMAIL_KEY = "contactNotificationEmail";

export async function getContactNotificationEmail(): Promise<string | null> {
  const row = await prisma.siteSetting.findUnique({ where: { key: CONTACT_NOTIFICATION_EMAIL_KEY } });
  return row?.value ?? null;
}

export type UpdateNotificationEmailState = { error?: string; success?: boolean };

export async function updateNotificationEmail(
  _prev: UpdateNotificationEmailState,
  formData: FormData
): Promise<UpdateNotificationEmailState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Enter an email address." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }

  await prisma.siteSetting.upsert({
    where: { key: CONTACT_NOTIFICATION_EMAIL_KEY },
    create: { key: CONTACT_NOTIFICATION_EMAIL_KEY, value: email },
    update: { value: email },
  });

  revalidatePath("/admin/settings");
  return { success: true };
}
