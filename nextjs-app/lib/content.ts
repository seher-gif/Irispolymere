import "server-only";
import { cache } from "react";
import path from "path";
import sharp from "sharp";
import { prisma } from "@/lib/db";
import type { ImageRef, LocalizedImage } from "@/lib/data/image-types";

/**
 * Public-site content, read from the admin database (Turso when hosted, the local
 * SQLite file otherwise). Pages call these at build/revalidation time; every admin save
 * calls publishContent() (lib/publish.ts) so changes show up straight away.
 */

export type LocalizedText = { en: string; fr: string; ar: string };

export type BlogPost = {
  slug: string;
  categoryName: LocalizedText | null;
  title: LocalizedText;
  excerpt: LocalizedText;
  bodyHtml: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  coverImage: LocalizedImage | null;
  publishedAt: string;
};

export type CertificateData = {
  key: string;
  title: LocalizedText;
  desc: LocalizedText;
  pdfUrl: string | null;
};

export type PageMetaOverride = {
  metaTitleEn: string | null;
  metaTitleFr: string | null;
  metaTitleAr: string | null;
  metaDescriptionEn: string | null;
  metaDescriptionFr: string | null;
  metaDescriptionAr: string | null;
};

export type Banner = { url: LocalizedImage; altText: { en: string | null; fr: string | null; ar: string | null } };

// ---- images ---------------------------------------------------------------

// Uploaded files carry their pixel size in the name ("<id>-2400x1050.jpg"), written by the
// admin upload; older local files are measured from disk.
const SIZE_IN_NAME = /-(\d{2,5})x(\d{2,5})\.[a-z0-9]+$/i;
const measured = new Map<string, { w: number; h: number }>();

async function imgRef(url: string): Promise<ImageRef> {
  const named = url.match(SIZE_IN_NAME);
  if (named) return { src: url, width: Number(named[1]), height: Number(named[2]) };

  if (url.startsWith("/")) {
    let d = measured.get(url);
    if (!d) {
      try {
        const m = await sharp(path.join(process.cwd(), "public", url)).metadata();
        const swap = (m.orientation ?? 1) >= 5;
        d = { w: (swap ? m.height : m.width)!, h: (swap ? m.width : m.height)! };
        measured.set(url, d);
      } catch {
        // fall through to the default below
      }
    }
    if (d) return { src: url, width: d.w, height: d.h };
  }
  return { src: url, width: 1600, height: 900 };
}

async function localizedImage(en: string, fr: string | null, ar: string | null): Promise<LocalizedImage> {
  return { en: await imgRef(en), fr: await imgRef(fr || en), ar: await imgRef(ar || en) };
}

// ---- text helpers ---------------------------------------------------------

function tri(en: string, fr: string | null, ar: string | null): LocalizedText {
  return { en, fr: fr || en, ar: ar || en };
}

const SITE_SUFFIX = " — Iris Polymere";
const META_TITLE_TARGET = 60;

// Only append the site name to an auto-generated fallback title when it still fits the
// ~60-char recommended <title> length; an admin-entered meta title is used verbatim.
function withBrandSuffix(title: string) {
  return title.length + SITE_SUFFIX.length <= META_TITLE_TARGET ? `${title}${SITE_SUFFIX}` : title;
}

// ---- loaders --------------------------------------------------------------

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });
  return Promise.all(
    posts.map(async (p) => ({
      slug: p.slug,
      categoryName: p.category ? tri(p.category.nameEn, p.category.nameFr, p.category.nameAr) : null,
      title: tri(p.titleEn, p.titleFr, p.titleAr),
      excerpt: tri(p.excerptEn, p.excerptFr, p.excerptAr),
      bodyHtml: tri(p.bodyEn, p.bodyFr, p.bodyAr),
      metaTitle: tri(
        p.metaTitleEn || withBrandSuffix(p.titleEn),
        p.metaTitleFr || withBrandSuffix(p.titleFr || p.titleEn),
        p.metaTitleAr || withBrandSuffix(p.titleAr || p.titleEn)
      ),
      metaDescription: tri(
        p.metaDescriptionEn || p.excerptEn,
        p.metaDescriptionFr || p.excerptFr,
        p.metaDescriptionAr || p.excerptAr
      ),
      coverImage: p.coverImageEn ? await localizedImage(p.coverImageEn, p.coverImageFr, p.coverImageAr) : null,
      publishedAt: (p.publishedAt ?? p.createdAt).toISOString(),
    }))
  );
});

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return (await getBlogPosts()).find((p) => p.slug === slug);
}

export const getCertificates = cache(async (): Promise<CertificateData[]> => {
  const rows = await prisma.certificate.findMany({ orderBy: { key: "asc" } });
  return rows.map((c) => ({
    key: c.key,
    title: tri(c.titleEn, c.titleFr, c.titleAr),
    desc: tri(c.descEn, c.descFr, c.descAr),
    pdfUrl: c.pdfUrl,
  }));
});

export const getPageMetaOverrides = cache(async (): Promise<Record<string, PageMetaOverride>> => {
  const rows = await prisma.pageMeta.findMany();
  return Object.fromEntries(
    rows.map((p) => [
      p.key,
      {
        metaTitleEn: p.metaTitleEn,
        metaTitleFr: p.metaTitleFr,
        metaTitleAr: p.metaTitleAr,
        metaDescriptionEn: p.metaDescriptionEn,
        metaDescriptionFr: p.metaDescriptionFr,
        metaDescriptionAr: p.metaDescriptionAr,
      },
    ])
  );
});

export const getBanners = cache(async (): Promise<Banner[]> => {
  const rows = await prisma.banner.findMany({ orderBy: { order: "asc" } });
  return Promise.all(
    rows.map(async (b) => ({
      url: await localizedImage(b.urlEn, b.urlFr, b.urlAr),
      altText: { en: b.altTextEn, fr: b.altTextFr || b.altTextEn, ar: b.altTextAr || b.altTextEn },
    }))
  );
});

export const getSiteAssetOverrides = cache(async (): Promise<Record<string, string>> => {
  const rows = await prisma.siteAsset.findMany();
  return Object.fromEntries(rows.map((a) => [a.key, a.url]));
});

export const getCorporateHeroImages = cache(async (): Promise<Record<string, LocalizedImage>> => {
  const rows = await prisma.corporateHeroImage.findMany();
  return Object.fromEntries(await Promise.all(rows.map(async (c) => [c.slug, await localizedImage(c.urlEn, c.urlFr, c.urlAr)] as const)));
});

export const getProductImages = cache(async (): Promise<Record<string, ImageRef>> => {
  const rows = await prisma.productImage.findMany();
  return Object.fromEntries(await Promise.all(rows.map(async (p) => [p.slug, await imgRef(p.url)] as const)));
});

export const getPageHeroImages = cache(async (): Promise<Record<string, ImageRef>> => {
  const rows = await prisma.pageHeroImage.findMany();
  return Object.fromEntries(await Promise.all(rows.map(async (p) => [p.slug, await imgRef(p.url)] as const)));
});
