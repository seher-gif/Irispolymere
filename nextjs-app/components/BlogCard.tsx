import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import type { BlogPost } from "@/lib/data/blog";
import { IndustrialVisual } from "./IndustrialVisual";
import { CardLink } from "./ui";

export function BlogCard({ t, locale, post }: { t: TFunc; locale: string; post: BlogPost }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[16/10] overflow-hidden">
        <IndustrialVisual accent={post.accent} variant="card" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="w-fit rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
          {t(`${post.key}.category`)}
        </span>
        <h3 className="text-base font-bold leading-snug text-ink">{t(`${post.key}.title`)}</h3>
        <p className="flex-1 text-sm text-muted">{t(`${post.key}.excerpt`)}</p>
        <CardLink t={t} labelKey="blog.readArticle" />
      </div>
    </Link>
  );
}
