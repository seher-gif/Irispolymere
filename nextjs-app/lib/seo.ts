import type { Metadata } from "next";
import { locales, type Locale } from "./i18n/config";
import { pageMetaOverrides } from "./data/page-meta";
import { contactInfo } from "./contact-info";

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

/**
 * BreadcrumbList JSON-LD for a page. `items` excludes the homepage — it's
 * prepended automatically. Omit `url` on the last (current-page) item; per
 * Google's own examples, the final crumb doesn't need an `item` URL.
 */
export function buildBreadcrumbJsonLd(locale: Locale, items: { name: string; url?: string }[]) {
  const trail = [{ name: "Home", url: `${SITE_URL}/${locale}` }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function buildBlogPostingJsonLd({
  locale,
  slug,
  title,
  description,
  datePublished,
  imageUrl,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    image: imageUrl ? `${SITE_URL}${imageUrl}` : `${SITE_URL}/brand/og-image.png`,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-full.png` } },
  };
}

/** Site-wide Organization JSON-LD — only real, on-page contact data; no invented social profiles. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-full.png`,
    email: contactInfo.email,
    telephone: contactInfo.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue Dahmani Rabah, Groupe Propriete 40, Ilot 04",
      addressLocality: "Soumaa",
      addressRegion: "Blida",
      postalCode: "09470",
      addressCountry: "DZ",
    },
    contactPoint: contactInfo.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      email: contactInfo.email,
      contactType: "customer service",
    })),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** Generic WebPage-family JSON-LD (ContactPage, AboutPage, CollectionPage, or plain WebPage). */
export function buildWebPageJsonLd({
  locale,
  segments,
  type = "WebPage",
  name,
  description,
}: {
  locale: Locale;
  segments: string[];
  type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
  name: string;
  description: string;
}) {
  const path = segments.length ? `/${segments.join("/")}` : "";
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

/** ItemList JSON-LD for a listing page (blog index, product category page). */
export function buildItemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function buildProductJsonLd({
  locale,
  slug,
  name,
  description,
  category,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    category,
    url: `${SITE_URL}/${locale}/products/${slug}`,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}

/**
 * Resolves a static page's title/description, preferring the admin-set
 * override (from /admin/pages, keyed by lib/data/page-registry.ts entries)
 * over the dictionary-driven default for that locale.
 */
export function resolvePageMeta(key: string, locale: Locale, defaultTitle: string, defaultDescription: string) {
  const cap = locale.charAt(0).toUpperCase() + locale.slice(1);
  const override = pageMetaOverrides[key];
  const title = (override?.[`metaTitle${cap}` as keyof typeof override] as string | null) || defaultTitle;
  const description = (override?.[`metaDescription${cap}` as keyof typeof override] as string | null) || defaultDescription;
  return { title, description };
}

export { SITE_URL, SITE_NAME };
