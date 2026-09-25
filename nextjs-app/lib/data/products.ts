export type ProductCategory = "pvc" | "masterbatch";

export type Product = {
  slug: string;
  category: ProductCategory;
  categoryHref: string;
  categoryTitleKey: string;
  titleKey: string;
  descKey: string;
  subtitleKey?: string;
  formulationKey?: string;
  noteKey?: string;
  accent: string;
  appCount: number;
  benCount: number;
};

export const products: Product[] = [
  {
    slug: "pvc-rigid", category: "pvc", categoryHref: "products/pvc", categoryTitleKey: "mega.pvc.title",
    titleKey: "pvc.rigid.title", descKey: "pvc.rigid.desc", accent: "#105191", appCount: 5, benCount: 5,
  },
  {
    slug: "pvc-flexible", category: "pvc", categoryHref: "products/pvc", categoryTitleKey: "mega.pvc.title",
    titleKey: "pvc.flexible.title", descKey: "pvc.flexible.desc", subtitleKey: "pvc.flexible.subtitle",
    accent: "#1a63ab", appCount: 6, benCount: 5,
  },
  {
    slug: "pvc-cable", category: "pvc", categoryHref: "products/pvc", categoryTitleKey: "mega.pvc.title",
    titleKey: "pvc.cable.title", descKey: "pvc.cable.desc", accent: "#0b3a68", appCount: 5, benCount: 5,
  },
  {
    slug: "masterbatch-filler", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.filler.title", descKey: "mb.filler.desc", subtitleKey: "mb.filler.subtitle",
    formulationKey: "mb.filler.formulation", noteKey: "mb.filler.note",
    accent: "#0b3a68", appCount: 4, benCount: 5,
  },
];

export const productsBySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
export const productsByCategory: Record<ProductCategory, Product[]> = {
  pvc: products.filter((p) => p.category === "pvc"),
  masterbatch: products.filter((p) => p.category === "masterbatch"),
};

export function appKeys(p: Product) {
  return Array.from({ length: p.appCount }, (_, i) => `${p.slug}.app.${i + 1}`);
}
export function benKeys(p: Product) {
  return Array.from({ length: p.benCount }, (_, i) => `${p.slug}.ben.${i + 1}`);
}
