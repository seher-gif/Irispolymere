import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { blogPosts, blogPostsBySlug } from "@/lib/data/blog";
import { blogBody } from "@/lib/data/blog-content";
import { productsBySlug } from "@/lib/data/products";
import { IndustrialVisual } from "@/components/IndustrialVisual";
import { Container, PageHero, CTABand, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPostsBySlug[slug];
  if (!post || !isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  return { title: `${t(`${post.key}.title`)} — Iris Polymere Blog`, description: t(`${post.key}.excerpt`) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const post = blogPostsBySlug[slug];
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const t = tFrom(dict);
  const body = blogBody[slug] ?? [];
  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="bg-brand-darker px-6 py-14 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <Link href={`/${locale}`} className="font-semibold hover:text-white">{t("breadcrumb.home")}</Link>
            <span className="opacity-50">/</span>
            <Link href={`/${locale}/blog`} className="font-semibold hover:text-white">{t("nav.blog")}</Link>
            <span className="opacity-50">/</span>
            <span className="font-semibold text-white">{t(`${post.key}.title`)}</span>
          </nav>
          <span className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
            <span className="h-[2px] w-6 bg-white/70" />
            {t(`${post.key}.category`)}
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{t(`${post.key}.title`)}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{t(`${post.key}.excerpt`)}</p>
          <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{post.date}</span>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {body.map((para, i) => (
              <p key={i} className="mb-4 text-muted leading-relaxed">{para}</p>
            ))}
            <Link href={`/${locale}/blog`} className="mt-4 inline-block text-sm font-bold text-brand hover:text-brand-hover">
              ← {t("blog.backToBlog")}
            </Link>
          </div>
          <div className="overflow-hidden rounded-md shadow-lg">
            <IndustrialVisual accent={post.accent} variant="panel" className="h-full w-full" />
          </div>
        </Container>
      </section>

      <section className="bg-surface-alt py-16 sm:py-20">
        <Container>
          <SectionHead title={t("label.relatedProducts")} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {post.relatedSlugs.map((rs) => {
              const product = productsBySlug[rs];
              if (!product) return null;
              return (
                <Link key={rs} href={`/${locale}/products/${rs}`} className="rounded-md border border-line bg-white p-5 transition-colors hover:border-brand">
                  <strong className="block text-sm text-ink">{t(product.titleKey)}</strong>
                  <span className="mt-1 block text-xs text-muted">{t("btn.viewProduct")}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {otherPosts.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHead title={t("blog.relatedArticles")} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="rounded-md border border-line bg-white p-5 transition-colors hover:border-brand">
                  <strong className="block text-sm text-ink">{t(`${p.key}.title`)}</strong>
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
