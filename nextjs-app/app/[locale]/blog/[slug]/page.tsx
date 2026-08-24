import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { blogPosts, blogPostsBySlug } from "@/lib/data/blog";
import { buildMetadata } from "@/lib/seo";
import { IndustrialVisual } from "@/components/IndustrialVisual";
import { Container, PageHero, CTABand, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPostsBySlug[slug];
  if (!post || !isLocale(locale)) return {};
  return buildMetadata({
    locale: locale as Locale,
    segments: ["blog", slug],
    title: post.metaTitle[locale as Locale],
    description: post.metaDescription[locale as Locale],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const post = blogPostsBySlug[slug];
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const t = tFrom(dict);
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <section className="bg-brand-darker px-6 py-14 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <Link href={`/${locale}`} className="font-semibold hover:text-white">{t("breadcrumb.home")}</Link>
            <span className="opacity-50">/</span>
            <Link href={`/${locale}/blog`} className="font-semibold hover:text-white">{t("nav.blog")}</Link>
            <span className="opacity-50">/</span>
            <span className="font-semibold text-white">{post.title[locale]}</span>
          </nav>
          {post.categoryName && (
            <span className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
              <span className="h-[2px] w-6 bg-white/70" />
              {post.categoryName[locale]}
            </span>
          )}
          <h1 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{post.title[locale]}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{post.excerpt[locale]}</p>
          <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{publishedDate}</span>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div
              className="prose prose-sm max-w-none text-muted [&_p]:mb-4 [&_p]:leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_a]:text-brand [&_a]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ps-5"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml[locale] }}
            />
            <Link href={`/${locale}/blog`} className="mt-4 inline-block text-sm font-bold text-brand hover:text-brand-hover">
              ← {t("blog.backToBlog")}
            </Link>
          </div>
          <div className="overflow-hidden shadow-sm">
            <IndustrialVisual accent="#105191" variant="panel" className="h-full w-full" />
          </div>
        </Container>
      </section>

      {otherPosts.length > 0 && (
        <section className="bg-surface-alt py-16 sm:py-20">
          <Container>
            <SectionHead title={t("blog.relatedArticles")} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="border border-line bg-white p-5 transition-colors hover:border-brand">
                  <strong className="block text-sm text-ink">{p.title[locale]}</strong>
                  <span className="mt-1 block text-xs font-bold text-brand">{t("blog.readArticle")}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand t={t} locale={locale} />
    </>
  );
}
