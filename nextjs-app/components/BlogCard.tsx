import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { TFunc } from "@/lib/i18n/t";
import type { BlogPost } from "@/lib/data/blog";
import { IndustrialVisual } from "./IndustrialVisual";
import { CardLink } from "./ui";

export function BlogCard({ t, locale, post }: { t: TFunc; locale: Locale; post: BlogPost }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-brand">
      <div className="aspect-[16/10] overflow-hidden">
        <IndustrialVisual accent="#105191" variant="card" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        {post.categoryName && (
          <span className="w-fit rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
            {post.categoryName[locale]}
          </span>
        )}
        <h3 className="text-base font-bold leading-snug text-ink">{post.title[locale]}</h3>
        <p className="flex-1 text-sm text-muted">{post.excerpt[locale]}</p>
        <CardLink t={t} labelKey="blog.readArticle" />
      </div>
    </Link>
  );
}
