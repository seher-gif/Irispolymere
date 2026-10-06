import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { pageRegistryByKey } from "@/lib/data/page-registry";
import { updatePageMeta } from "@/lib/actions/pages";
import { PageMetaForm } from "@/components/admin/PageMetaForm";
import { CorporateHeroImageCard } from "@/components/admin/CorporateHeroImageCard";
import { PageHeroImageCard } from "@/components/admin/PageHeroImageCard";

export default async function AdminPageMetaEdit({ params }: { params: Promise<{ key: string[] }> }) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");
  const entry = pageRegistryByKey[key];
  if (!entry) notFound();

  const corporateSlug = key.startsWith("corporate/") ? key.slice("corporate/".length) : null;
  // About Us keeps a side photo in its body; the homepage About section has an optional photo too.
  const sideImageSlug = key === "corporate/about" ? "about" : key === "home" ? "home-about" : null;

  const [dictEn, dictFr, dictAr, existing, heroBackground, sideImage] = await Promise.all([
    getDictionary("en"),
    getDictionary("fr"),
    getDictionary("ar"),
    prisma.pageMeta.findUnique({ where: { key } }),
    corporateSlug ? prisma.pageHeroImage.findUnique({ where: { slug: corporateSlug } }) : Promise.resolve(null),
    sideImageSlug ? prisma.corporateHeroImage.findUnique({ where: { slug: sideImageSlug } }) : Promise.resolve(null),
  ]);
  const tEn = tFrom(dictEn);
  const tFr = tFrom(dictFr);
  const tAr = tFrom(dictAr);

  const defaults = {
    en: { title: tEn(entry.defaultTitleKey), description: tEn(entry.defaultDescriptionKey) },
    fr: { title: tFr(entry.defaultTitleKey), description: tFr(entry.defaultDescriptionKey) },
    ar: { title: tAr(entry.defaultTitleKey), description: tAr(entry.defaultDescriptionKey) },
  };

  return (
    <div>
      <Link href="/admin/pages" className="text-xs font-bold text-brand hover:text-brand-hover">← Back to Pages</Link>
      <h1 className="mt-2 text-2xl font-extrabold text-ink">{tEn(entry.labelKey)}</h1>
      <p className="mt-1 text-sm text-muted">/{entry.segments.join("/")}</p>

      {corporateSlug && (
        <div className="mt-6 max-w-2xl">
          <PageHeroImageCard slug={corporateSlug} currentUrl={heroBackground?.url ?? null} />
        </div>
      )}

      {sideImageSlug && (
        <div className="mt-6 max-w-2xl">
          <CorporateHeroImageCard
            slug={sideImageSlug}
            current={sideImage}
            title={sideImageSlug === "home-about" ? "About Section Photo (homepage)" : "About Section Photo"}
            description={
              sideImageSlug === "home-about"
                ? "Optional photo shown beside the About text on the homepage. Upload at original size (recommended 2400×1050px) — it is shown whole and fits every screen, no resizing needed. Leave empty and the text is simply centered. Each language's photo can carry its own text — English is required, French/Arabic fall back to it."
                : "Photo beside the text in this page's body section. Upload at original size (recommended 2400×1050px) — it is shown whole and fits every screen, no resizing needed. Each language's photo can carry its own text — English is required, French/Arabic fall back to it."
            }
          />
        </div>
      )}

      <div className="mt-6 max-w-2xl">
        <PageMetaForm action={updatePageMeta.bind(null, key)} data={existing} defaults={defaults} />
      </div>
    </div>
  );
}
