export type ProductCategory = "pvc" | "hffr" | "masterbatch";

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
  cautionKey?: string;
  variantGroup?: string;
  variantLabel?: string;
  variantSiblingSlug?: string;
  variantSiblingLabel?: string;
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
    slug: "hffr-hm2", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.hm2.title", descKey: "hffr.hm2.desc", accent: "#105191", appCount: 4, benCount: 5,
  },
  {
    slug: "hffr-hm4", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.hm4.title", descKey: "hffr.hm4.desc", accent: "#1a63ab", appCount: 3, benCount: 5,
  },
  {
    slug: "hffr-hm5", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.hm5.title", descKey: "hffr.hm5.desc", accent: "#0b3a68", appCount: 3, benCount: 5,
  },
  {
    slug: "hffr-bedding", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.bedding.title", descKey: "hffr.bedding.desc", accent: "#105191", appCount: 3, benCount: 5,
  },
  {
    slug: "hffr-filler", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.filler.title", descKey: "hffr.filler.desc", accent: "#1a63ab", appCount: 3, benCount: 5,
  },
  {
    slug: "hffr-cpr", category: "hffr", categoryHref: "products/hffr", categoryTitleKey: "mega.hffr.title",
    titleKey: "hffr.cpr.title", descKey: "hffr.cpr.desc", cautionKey: "hffr.cpr.caution",
    accent: "#0b3a68", appCount: 3, benCount: 4,
  },
  {
    slug: "masterbatch-color", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.color.title", descKey: "mb.color.desc", accent: "#105191", appCount: 5, benCount: 5,
  },
  {
    slug: "masterbatch-white-50", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.white.50.title", descKey: "mb.white.50.desc",
    variantGroup: "white", variantLabel: "50% TiO₂", variantSiblingSlug: "masterbatch-white-70", variantSiblingLabel: "70% TiO₂",
    accent: "#1a63ab", appCount: 4, benCount: 5,
  },
  {
    slug: "masterbatch-white-70", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.white.70.title", descKey: "mb.white.70.desc",
    variantGroup: "white", variantLabel: "70% TiO₂", variantSiblingSlug: "masterbatch-white-50", variantSiblingLabel: "50% TiO₂",
    accent: "#0b3a68", appCount: 4, benCount: 5,
  },
  {
    slug: "masterbatch-black-uv", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.black.uv.title", descKey: "mb.black.uv.desc",
    variantGroup: "black", variantLabel: "High UV Resistance", variantSiblingSlug: "masterbatch-black-gloss", variantSiblingLabel: "High Gloss",
    accent: "#105191", appCount: 4, benCount: 5,
  },
  {
    slug: "masterbatch-black-gloss", category: "masterbatch", categoryHref: "products/masterbatch", categoryTitleKey: "mega.masterbatch.title",
    titleKey: "mb.black.gloss.title", descKey: "mb.black.gloss.desc",
    variantGroup: "black", variantLabel: "High Gloss", variantSiblingSlug: "masterbatch-black-uv", variantSiblingLabel: "High UV Resistance",
    accent: "#1a63ab", appCount: 4, benCount: 5,
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
  hffr: products.filter((p) => p.category === "hffr"),
  masterbatch: products.filter((p) => p.category === "masterbatch"),
};

export function appKeys(p: Product) {
  return Array.from({ length: p.appCount }, (_, i) => `${p.slug}.app.${i + 1}`);
}
export function benKeys(p: Product) {
  return Array.from({ length: p.benCount }, (_, i) => `${p.slug}.ben.${i + 1}`);
}
