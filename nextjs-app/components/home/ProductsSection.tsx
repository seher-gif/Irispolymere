import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import { productLinks } from "@/lib/nav-data";
import { ProductCard } from "../ProductCard";
import { Container, SectionHead } from "../ui";

const ACCENTS: Record<string, string> = {
  "products/pvc": "#105191",
  "products/hffr": "#1a63ab",
  "products/masterbatch": "#0b3a68",
};

export function ProductsSection({ t, locale }: { t: TFunc; locale: string }) {
  return (
    <section className="bg-surface-alt py-16 sm:py-20">
      <Container>
        <SectionHead center title={t("home.products.title")} eyebrow={t("home.categories.eyebrow")} lead={t("home.categories.lead")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productLinks.map((p) => (
            <ProductCard
              key={p.href}
              t={t}
              href={`/${locale}/${p.href}`}
              titleKey={p.key}
              descKey={p.descKey}
              accent={ACCENTS[p.href]}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={`/${locale}/products/pvc`} className="inline-block rounded-sm bg-brand px-7 py-3 text-sm font-bold text-white hover:bg-brand-hover">
            {t("nav.allProducts")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
