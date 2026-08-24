"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function markMessageRead(id: string, read: boolean) {
  await prisma.contactSubmission.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
