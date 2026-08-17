import Link from "next/link";
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
}: {
  t: TFunc;
  href: string;
  titleKey: string;
  descKey: string;
  accent: string;
  labelKey?: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-brand">
      <div className="aspect-[16/10] overflow-hidden">
        <IndustrialVisual accent={accent} variant="card" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-bold text-ink">{t(titleKey)}</h3>
        <p className="flex-1 text-sm text-muted">{t(descKey)}</p>
        <CardLink t={t} labelKey={labelKey} />
      </div>
    </Link>
  );
}
