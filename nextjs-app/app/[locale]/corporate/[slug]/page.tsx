import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { corporatePages, corporatePagesBySlug } from "@/lib/data/corporate";
import { getCorporateHeroImages, getPageHeroImages } from "@/lib/content";
import { buildWebPageJsonLd } from "@/lib/seo";
import { buildMetadata, resolvePageMeta } from "@/lib/seo-meta";
import { IndustrialVisual } from "@/components/IndustrialVisual";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, CTABand } from "@/components/ui";
import Image from "next/image";

export function generateStaticParams() {
  return locales.flatMap((locale) => corporatePages.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = corporatePagesBySlug[slug];
  if (!page || !isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  const { title, description } = await resolvePageMeta(
    `corporate/${slug}`,
    locale as Locale,
    `${t(page.heroTitleKey)} — Iris Polymere`,
    t(page.metaDescriptionKey)
  );
  return buildMetadata({ locale: locale as Locale, segments: ["corporate", slug], title, description });
}

export default async function CorporatePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const page = corporatePagesBySlug[slug];
  if (!page) notFound();

  const [corporateHeroImages, pageHeroImages] = await Promise.all([getCorporateHeroImages(), getPageHeroImages()]);
  const dict = await getDictionary(locale);
  const t = tFrom(dict);
  const crumbs = [{ labelKey: "nav.corporate" }, { labelKey: page.navKey }];
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    segments: ["corporate", slug],
    type: slug === "about" ? "AboutPage" : "WebPage",
    name: t(page.heroTitleKey),
    description: t(page.metaDescriptionKey),
  });

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <PageHero t={t} locale={locale} eyebrowKey="nav.corporate" titleKey={page.heroTitleKey} leadKey={page.heroLeadKey} crumbs={crumbs} backgroundImage={pageHeroImages[slug]} />

      {slug === "about" ? (
        <section className="py-16 sm:py-20">
          <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="order-2 space-y-5 text-lg leading-relaxed text-ink-soft lg:order-1">
              {page.paragraphKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-md shadow-lg lg:order-2">
              {corporateHeroImages.about ? (
                <Image src={corporateHeroImages.about[locale].src} alt={t(page.heroTitleKey)} width={corporateHeroImages.about[locale].width} height={corporateHeroImages.about[locale].height} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
              ) : (
                <IndustrialVisual accent="#105191" variant="panel" className="h-full w-full" label="Replace with client-provided corporate / facility photograph" />
              )}
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-soft">
              {page.paragraphKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand t={t} locale={locale} />
    </>
  );
}
