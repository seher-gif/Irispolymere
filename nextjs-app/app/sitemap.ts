import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";
import { corporatePages } from "@/lib/data/corporate";
import { products } from "@/lib/data/products";
import { blogPosts } from "@/lib/data/blog";

const CATEGORY_SLUGS = ["pvc", "hffr", "masterbatch"];

export default function sitemap(): MetadataRoute.Sitemap {
  const segmentSets: string[][] = [
    [],
    ["certificates"],
    ["contact"],
    ["blog"],
    ...corporatePages.map((p) => ["corporate", p.slug]),
    ...CATEGORY_SLUGS.map((s) => ["products", s]),
    ...products.map((p) => ["products", p.slug]),
    ...blogPosts.map((p) => ["blog", p.slug]),
  ];

  // One <url> entry per locale per path (not just /en) so FR/AR pages are
  // directly discoverable via the sitemap, each carrying the full reciprocal
  // hreflang alternate set.
  return segmentSets.flatMap((segments) => {
    const path = segments.length ? `/${segments.join("/")}` : "";
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = `${SITE_URL}/${l}${path}`;

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: segments.length === 0 ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
