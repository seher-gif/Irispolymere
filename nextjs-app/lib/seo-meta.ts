import "server-only";
import type { Metadata } from "next";
import { locales, type Locale } from "./i18n/config";
import { getPageMetaOverrides, getSiteAssetOverrides } from "./content";
import { SITE_NAME, SITE_URL } from "./seo";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_DZ",
};

/**
 * Builds full Metadata (canonical, hreflang alternates, OpenGraph, Twitter
 * card, robots) for a page given its locale and root-relative path segments
 * (e.g. ["products", "pvc-rigid"], or [] for the homepage).
 */
export async function buildMetadata({
  locale,
  segments,
  title,
  description,
}: {
  locale: Locale;
  segments: string[];
  title: string;
  description: string;
}): Promise<Metadata> {
  const OG_IMAGE = (await getSiteAssetOverrides())["og-image"] ?? "/brand/og-image.png";
  const path = segments.length ? `/${segments.join("/")}` : "";
  const canonical = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/en${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Resolves a static page's title/description, preferring the admin-set
 * override (from /admin/pages, keyed by lib/data/page-registry.ts entries)
 * over the dictionary-driven default for that locale.
 */
export async function resolvePageMeta(key: string, locale: Locale, defaultTitle: string, defaultDescription: string) {
  const cap = locale.charAt(0).toUpperCase() + locale.slice(1);
  const override = (await getPageMetaOverrides())[key];
  const title = (override?.[`metaTitle${cap}` as keyof typeof override] as string | null) || defaultTitle;
  const description = (override?.[`metaDescription${cap}` as keyof typeof override] as string | null) || defaultDescription;
  return { title, description };
}

