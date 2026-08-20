import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { TFunc } from "@/lib/i18n/t";
import { blogPosts } from "@/lib/data/blog";
import { BlogCard } from "../BlogCard";
import { Container, SectionHead } from "../ui";

export function BlogSection({ t, locale }: { t: TFunc; locale: Locale }) {
  return (
    <section className="bg-surface-alt py-16 sm:py-20">
      <Container>
        <SectionHead center eyebrow={t("blog.hero.eyebrow")} title={t("home.blog.title")} lead={t("home.blog.text")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} t={t} locale={locale} post={post} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={`/${locale}/blog`} className="inline-block rounded-sm bg-brand px-7 py-3 text-sm font-bold text-white hover:bg-brand-hover">
            {t("blog.allBlogs")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
