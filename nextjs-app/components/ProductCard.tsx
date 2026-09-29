import Link from "next/link";
import Image from "next/image";
import type { TFunc } from "@/lib/i18n/t";
import { IndustrialVisual } from "./IndustrialVisual";
import { CardLink } from "./ui";

export function ProductCard({
  t,
  href,
  titleKey,
  descKey,
  accent,
  labelKey,
  imageUrl,
}: {
  t: TFunc;
  href: string;
  titleKey: string;
  descKey: string;
  accent: string;
  labelKey?: string;
  imageUrl?: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-brand">
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={t(titleKey)} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <IndustrialVisual accent={accent} variant="card" className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-bold text-ink">{t(titleKey)}</h3>
        <p className="flex-1 text-sm text-muted">{t(descKey)}</p>
        <CardLink t={t} labelKey={labelKey} />
      </div>
    </Link>
  );
}
