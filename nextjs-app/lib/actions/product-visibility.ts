"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { publishContent } from "@/lib/publish";
import { HIDDEN_PAGES_KEY } from "@/lib/data/visibility";
import { products } from "@/lib/data/products";

const KNOWN = new Set<string>([...products.map((p) => p.slug), ...products.map((p) => p.category)]);

export async function setProductPageVisible(slug: string, visible: boolean) {
  if (!KNOWN.has(slug) && !(await prisma.customCategory.findUnique({ where: { slug } }))) return;
  const row = await prisma.siteSetting.findUnique({ where: { key: HIDDEN_PAGES_KEY } });
  let hidden: string[] = [];
  try {
    hidden = row ? JSON.parse(row.value) : [];
  } catch {}
  const next = new Set(hidden);
  if (visible) next.delete(slug);
  else next.add(slug);
  const value = JSON.stringify([...next]);
  await prisma.siteSetting.upsert({
    where: { key: HIDDEN_PAGES_KEY },
    create: { key: HIDDEN_PAGES_KEY, value },
    update: { value },
  });
  revalidatePath("/admin/product-pages");
  publishContent();
}
