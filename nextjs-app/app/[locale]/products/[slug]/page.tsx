import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { products, productsByCategory, productsBySlug, appKeys, benKeys, type ProductCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/ProductCard";
import { IndustrialVisual } from "@/components/IndustrialVisual";
import { CheckIcon, CableIcon, ProfileIcon, InjectionIcon, ExtrusionIcon } from "@/components/Icons";
import { Container, PageHero, CTABand, SectionHead } from "@/components/ui";
import Image from "next/image";

const CATEGORY_SLUGS = ["pvc", "hffr", "masterbatch"] as const;

const CATEGORY_META: Record<(typeof CATEGORY_SLUGS)[number], { heroKey: string; introKey: string }> = {
  pvc: { heroKey: "pvc.hero", introKey: "pvc.intro" },
  hffr: { heroKey: "hffr.hero", introKey: "hffr.intro" },
  masterbatch: { heroKey: "mb.hero", introKey: "mb.intro" },
};

export function generateStaticParams() {
  const slugs = [...CATEGORY_SLUGS, ...products.map((p) => p.slug)];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);

  if ((CATEGORY_SLUGS as readonly string[]).includes(slug)) {
    const meta = CATEGORY_META[slug as keyof typeof CATEGORY_META];
    return { title: `${t(`${meta.heroKey}.title`)} — Iris Polymere`, description: t(`${meta.heroKey}.lead`) };
  }
  const product = productsBySlug[slug];
  if (!product) return {};
  return { title: `${t(product.titleKey)} — Iris Polymere`, description: t(product.descKey) };
}

export default async function ProductRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);

  if ((CATEGORY_SLUGS as readonly string[]).includes(slug)) {
    return <CategoryPage locale={locale} t={t} category={slug as ProductCategory} />;
  }

  const product = productsBySlug[slug];
  if (!product) notFound();
  return <DetailPage locale={locale} t={t} product={product} />;
}

function CategoryPage({ locale, t, category }: { locale: Locale; t: ReturnType<typeof tFrom>; category: ProductCategory }) {
  const meta = CATEGORY_META[category];
  const items = productsByCategory[category];
  const isMasterbatch = category === "masterbatch";

  return (
    <>
      <PageHero t={t} locale={locale} eyebrowKey={`${meta.heroKey}.eyebrow`} titleKey={`${meta.heroKey}.title`} leadKey={`${meta.heroKey}.lead`} crumbs={[{ labelKey: `mega.${category}.title` }]} />

      {isMasterbatch && (
        <section className="py-10">
          <Container>
            <div className="overflow-hidden rounded-md border border-line shadow-sm">
              <Image
                src="/assets/masterbatch-banner.webp"
                alt="Iris Polymere masterbatch product range — color, white, black and filler masterbatch"
                width={1393}
                height={679}
                className="h-auto w-full"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <Container>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted">{t(meta.introKey)}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} t={t} href={`/${locale}/products/${p.slug}`} titleKey={p.titleKey} descKey={p.descKey} accent={p.accent} labelKey="btn.viewProduct" />
            ))}
          </div>
        </Container>
      </section>

      {category === "pvc" && (
        <section className="bg-surface-alt py-16 sm:py-20">
          <Container>
            <SectionHead title={t("home.applications.title")} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { Icon: CableIcon, key: "home.applications.cable" },
                { Icon: ProfileIcon, key: "home.applications.profiles" },
                { Icon: ExtrusionIcon, key: "home.applications.extrusion" },
                { Icon: InjectionIcon, key: "home.applications.injection" },
              ].map(({ Icon, key }) => (
                <div key={key} className="flex items-center gap-3 rounded-md border border-line bg-white p-5">
                  <Icon className="h-8 w-8 shrink-0 text-brand" />
                  <strong className="text-sm text-ink">{t(key)}</strong>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand t={t} locale={locale} />
    </>
  );
}

function DetailPage({ locale, t, product }: { locale: Locale; t: ReturnType<typeof tFrom>; product: (typeof products)[number] }) {
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <PageHero
        t={t}
        locale={locale}
        eyebrowKey="label.category"
        titleKey={product.titleKey}
        leadKey={product.descKey}
        crumbs={[
          { labelKey: product.categoryTitleKey, href: `/${locale}/${product.categoryHref}` },
          { labelKey: product.titleKey },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            {product.subtitleKey && <p className="mb-4 text-lg font-semibold text-brand">{t(product.subtitleKey)}</p>}

            {product.variantGroup && (
              <div className="mb-6 flex gap-2">
                <span className="rounded-full border border-brand bg-brand-tint px-4 py-1.5 text-sm font-bold text-brand">{product.variantLabel}</span>
                <Link href={`/${locale}/products/${product.variantSiblingSlug}`} className="rounded-full border border-line px-4 py-1.5 text-sm font-bold text-ink-soft hover:border-brand hover:text-brand">
                  {product.variantSiblingLabel}
                </Link>
              </div>
            )}

            <h2 className="text-xl font-bold text-ink">{t("label.applications")}</h2>
            <ul className="mt-4 grid gap-2.5">
              {appKeys(product).map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {t(key)}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xl font-bold text-ink">{t("label.benefits")}</h2>
            <ul className="mt-4 grid gap-2.5">
              {benKeys(product).map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {t(key)}
                </li>
              ))}
            </ul>

            {product.formulationKey && (
              <div className="mt-6">
                <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white">{t(product.formulationKey)}</span>
              </div>
            )}
            {product.noteKey && <p className="mt-4 text-sm text-muted">{t(product.noteKey)}</p>}
            {product.cautionKey && (
              <div className="mt-6 rounded-md border border-dashed border-brand-muted bg-brand-tint p-5 text-sm text-ink-soft">
                <strong className="mb-1 block text-ink">{t("hffr.cpr.title")}</strong>
                {t(product.cautionKey)}
              </div>
            )}

            <div className="mt-8 rounded-md border border-dashed border-line bg-surface-alt p-5 text-sm text-muted">
              <strong className="mb-1 block text-ink">{t("label.technicalData")}</strong>
              {t("label.technicalDataText")}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="rounded-sm bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">
                {t("btn.requestQuote")}
              </Link>
              <Link href={`/${locale}/contact`} className="rounded-sm border border-line px-6 py-3 text-sm font-bold text-ink hover:border-brand hover:text-brand">
                {t("btn.requestTechInfo")}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-md shadow-lg">
            <IndustrialVisual accent={product.accent} variant="panel" className="h-full w-full" label={`Replace with client-provided ${product.slug} product visual`} />
          </div>
        </Container>
      </section>

      <section className="bg-surface-alt py-16 sm:py-20">
        <Container>
          <SectionHead title={t("label.relatedProducts")} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/${locale}/products/${r.slug}`} className="rounded-md border border-line bg-white p-5 transition-colors hover:border-brand">
                <strong className="block text-sm text-ink">{t(r.titleKey)}</strong>
                <span className="mt-1 block text-xs text-muted">{t("btn.viewProduct")}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand t={t} locale={locale} />
    </>
  );
}
