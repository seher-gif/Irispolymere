import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { corporatePages, corporatePagesBySlug } from "@/lib/data/corporate";
import { IndustrialVisual } from "@/components/IndustrialVisual";
import { CheckIcon, CostIcon, FlaskIcon, GaugeIcon, LayersIcon, GlobeIcon } from "@/components/Icons";
import { Container, PageHero, CTABand } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((locale) => corporatePages.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = corporatePagesBySlug[slug];
  if (!page || !isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  const title = `${t(page.heroTitleKey)} — Iris Polymere`;
  return {
    title,
    description: t(page.heroLeadKey),
    alternates: { canonical: `https://www.irispolymere.com/${locale}/corporate/${slug}` },
  };
}

export default async function CorporatePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const page = corporatePagesBySlug[slug];
  if (!page) notFound();

  const dict = await getDictionary(locale);
  const t = tFrom(dict);
  const crumbs = [{ labelKey: "nav.corporate" }, { labelKey: page.navKey }];

  return (
    <>
      <PageHero t={t} locale={locale} eyebrowKey="nav.corporate" titleKey={page.heroTitleKey} leadKey={page.heroLeadKey} crumbs={crumbs} />

      {slug === "about" && (
        <section className="py-16 sm:py-20">
          <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-extrabold text-ink">{t("about.focus.title")}</h2>
              <p className="mt-4 text-muted">{t("about.focus.p1")}</p>
              <p className="mt-4 text-muted">{t("about.focus.p2")}</p>
            </div>
            <div className="order-1 overflow-hidden rounded-md shadow-lg lg:order-2">
              <IndustrialVisual accent="#105191" variant="panel" className="h-full w-full" label="Replace with client-provided corporate / facility photograph" />
            </div>
          </Container>
        </section>
      )}

      {slug === "vision-mission" && (
        <section className="py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-md border border-line bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint text-brand">
                <GlobeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">{t("vision.vision.title")}</h3>
              <p className="mt-2 text-muted">{t("vision.vision.text")}</p>
            </div>
            <div className="rounded-md border border-line bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint text-brand">
                <GaugeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">{t("vision.mission.title")}</h3>
              <p className="mt-2 text-muted">{t("vision.mission.text")}</p>
            </div>
          </Container>
        </section>
      )}

      {slug === "quality" && (
        <section className="py-16 sm:py-20">
          <Container>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {Array.from({ length: 6 }, (_, i) => `quality.point${i + 1}`).map((key) => (
                <li key={key} className="flex items-start gap-3 rounded-md border border-line bg-white p-4 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {slug === "sustainability" && (
        <section className="py-16 sm:py-20">
          <Container>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {Array.from({ length: 6 }, (_, i) => `sustain.point${i + 1}`).map((key) => (
                <li key={key} className="flex items-start gap-3 rounded-md border border-line bg-white p-4 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {t(key)}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-md border border-dashed border-brand-muted bg-brand-tint p-5 text-sm text-ink-soft">
              {t("sustain.note")}
            </div>
          </Container>
        </section>
      )}

      {slug === "production" && (
        <section className="py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: FlaskIcon, t: "production.point1.title", d: "production.point1.text" },
              { Icon: GaugeIcon, t: "production.point2.title", d: "production.point2.text" },
              { Icon: LayersIcon, t: "production.point3.title", d: "production.point3.text" },
              { Icon: CostIcon, t: "production.point4.title", d: "production.point4.text" },
              { Icon: CheckIcon, t: "production.point5.title", d: "production.point5.text" },
              { Icon: GlobeIcon, t: "production.point6.title", d: "production.point6.text" },
            ].map(({ Icon, t: tk, d }) => (
              <div key={tk} className="rounded-md border border-line bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-ink">{t(tk)}</h3>
                <p className="mt-1.5 text-sm text-muted">{t(d)}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      <CTABand t={t} locale={locale} />
    </>
  );
}
