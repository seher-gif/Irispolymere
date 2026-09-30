import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { pageRegistryByKey } from "@/lib/data/page-registry";
import { updatePageMeta } from "@/lib/actions/pages";
import { PageMetaForm } from "@/components/admin/PageMetaForm";
import { CorporateHeroImageCard } from "@/components/admin/CorporateHeroImageCard";

export default async function AdminPageMetaEdit({ params }: { params: Promise<{ key: string[] }> }) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");
  const entry = pageRegistryByKey[key];
  if (!entry) notFound();

  const corporateSlug = key.startsWith("corporate/") ? key.slice("corporate/".length) : null;

  const [dictEn, dictFr, dictAr, existing, heroImage] = await Promise.all([
    getDictionary("en"),
    getDictionary("fr"),
    getDictionary("ar"),
    prisma.pageMeta.findUnique({ where: { key } }),
    corporateSlug ? prisma.corporateHeroImage.findUnique({ where: { slug: corporateSlug } }) : Promise.resolve(null),
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
          <CorporateHeroImageCard slug={corporateSlug} current={heroImage} />
        </div>
      )}

      <div className="mt-6 max-w-2xl">
        <PageMetaForm action={updatePageMeta.bind(null, key)} data={existing} defaults={defaults} />
      </div>
    </div>
  );
}
