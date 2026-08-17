import type { Metadata } from "next";
import { locales, type Locale } from "./i18n/config";

const SITE_URL = "https://www.irispolymere.com";
const SITE_NAME = "Iris Polymere";

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
export function buildMetadata({
  locale,
  segments,
  title,
  description,
}: {
  locale: Locale;
  segments: string[];
  title: string;
  description: string;
}): Metadata {
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
      images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { SITE_URL, SITE_NAME };
