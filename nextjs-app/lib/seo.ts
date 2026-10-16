import { locales, type Locale } from "./i18n/config";
import { contactInfo } from "./contact-info";

const SITE_URL = "https://www.irispolymere.com";
const SITE_NAME = "Iris Polymere";


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

export { SITE_URL, SITE_NAME };
