import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";
import { buildMetadata, resolvePageMeta, buildWebPageJsonLd, buildItemListJsonLd, SITE_URL } from "@/lib/seo";
import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero, CTABand } from "@/components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  const { title, description } = resolvePageMeta("blog", locale as Locale, `${t("blog.hero.title")} — Iris Polymere`, t("blog.hero.lead"));
  return buildMetadata({ locale, segments: ["blog"], title, description });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);
  const collectionPageJsonLd = buildWebPageJsonLd({
    locale,
    segments: ["blog"],
    type: "CollectionPage",
    name: t("blog.hero.title"),
    description: t("blog.hero.lead"),
  });
  const itemListJsonLd = buildItemListJsonLd(
    blogPosts.map((post) => ({ name: post.title[locale], url: `${SITE_URL}/${locale}/blog/${post.slug}` }))
  );

  return (
    <>
      <JsonLd data={collectionPageJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <PageHero t={t} locale={locale} eyebrowKey="blog.hero.eyebrow" titleKey="blog.hero.title" leadKey="blog.hero.lead" crumbs={[{ labelKey: "nav.blog" }]} />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} t={t} locale={locale} post={post} />
            ))}
          </div>
        </Container>
      </section>
      <CTABand t={t} locale={locale} />
    </>
  );
}
