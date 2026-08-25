import { corporatePages } from "./corporate";
import { products } from "./products";

export type PageRegistryEntry = {
  key: string; // matches PageMeta.key in the DB — also the /admin/pages/... URL
  segments: string[]; // root-relative path segments, used for buildMetadata's canonical URL
  labelKey: string; // dictionary key resolved to a human-readable label in the admin UI
  defaultTitleKey: string; // dictionary key for the fallback <title> when no override is set
  defaultDescriptionKey: string; // dictionary key for the fallback description
  group: "Site" | "Corporate" | "Products";
};

const CATEGORY_META: Record<string, { titleKey: string; heroKey: string }> = {
  pvc: { titleKey: "mega.pvc.title", heroKey: "pvc.hero" },
  hffr: { titleKey: "mega.hffr.title", heroKey: "hffr.hero" },
  masterbatch: { titleKey: "mega.masterbatch.title", heroKey: "mb.hero" },
};

export const pageRegistry: PageRegistryEntry[] = [
  { key: "home", segments: [], labelKey: "nav.home", defaultTitleKey: "home.meta.title", defaultDescriptionKey: "home.meta.description", group: "Site" },
  { key: "contact", segments: ["contact"], labelKey: "nav.contact", defaultTitleKey: "contact.hero.title", defaultDescriptionKey: "contact.hero.lead", group: "Site" },
  { key: "blog", segments: ["blog"], labelKey: "nav.blog", defaultTitleKey: "blog.hero.title", defaultDescriptionKey: "blog.hero.lead", group: "Site" },
  { key: "certificates", segments: ["certificates"], labelKey: "nav.certificates", defaultTitleKey: "certs.hero.title", defaultDescriptionKey: "certs.hero.lead", group: "Site" },

  ...corporatePages.map((p) => ({
    key: `corporate/${p.slug}`,
    segments: ["corporate", p.slug],
    labelKey: p.navKey,
    defaultTitleKey: p.heroTitleKey,
    defaultDescriptionKey: p.metaDescriptionKey,
    group: "Corporate" as const,
  })),

  ...Object.entries(CATEGORY_META).map(([slug, meta]) => ({
    key: `products/${slug}`,
    segments: ["products", slug],
    labelKey: meta.titleKey,
    defaultTitleKey: `${meta.heroKey}.title`,
    defaultDescriptionKey: `${meta.heroKey}.lead`,
    group: "Products" as const,
  })),

  ...products.map((p) => ({
    key: `products/${p.slug}`,
    segments: ["products", p.slug],
    labelKey: p.titleKey,
    defaultTitleKey: p.titleKey,
    defaultDescriptionKey: p.descKey,
    group: "Products" as const,
  })),
];

export const pageRegistryByKey = Object.fromEntries(pageRegistry.map((p) => [p.key, p]));
