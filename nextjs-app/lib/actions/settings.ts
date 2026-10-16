"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";

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

export type ChangePasswordState = { error?: string; success?: boolean };

export async function changePassword(_prev: ChangePasswordState, formData: FormData): Promise<ChangePasswordState> {
  const session = await getSession();
  if (!session) return { error: "Your session has expired — sign in again." };

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 10) return { error: "Use at least 10 characters for the new password." };
  if (next !== confirm) return { error: "The new passwords don't match." };

  const user = await prisma.adminUser.findUnique({ where: { id: session.userId } });
  if (!user || !(await verifyPassword(current, user.passwordHash))) {
    return { error: "The current password is incorrect." };
  }

  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(next) } });
  return { success: true };
}
