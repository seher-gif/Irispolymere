import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import { IndustrialVisual } from "../IndustrialVisual";
import { Container, Eyebrow } from "../ui";

export function AboutSection({ t, locale }: { t: TFunc; locale: string }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md shadow-lg">
          <IndustrialVisual accent="#105191" variant="panel" className="h-full w-full" label="Replace with client-provided corporate / facility photograph" />
        </div>
        <div>
          <Eyebrow>{t("home.about.eyebrow")}</Eyebrow>
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{t("home.about.title")}</h2>
          <p className="mt-4 text-muted">{t("about.body")}</p>
          <Link href={`/${locale}/corporate/about`} className="mt-6 inline-block rounded-sm bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">
            {t("home.about.cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
