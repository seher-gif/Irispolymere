import Image from "next/image";
import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import type { Locale } from "@/lib/i18n/config";
import { corporateHeroImages } from "@/lib/data/corporate-images";
import { IndustrialVisual } from "../IndustrialVisual";
import { Container, Eyebrow } from "../ui";

export function AboutSection({ t, locale }: { t: TFunc; locale: Locale }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md shadow-lg">
          {corporateHeroImages.about ? (
            <Image src={corporateHeroImages.about[locale]} alt={t("home.about.title")} width={1200} height={560} className="h-full w-full object-cover" />
          ) : (
            <IndustrialVisual accent="#105191" variant="panel" className="h-full w-full" label="Replace with client-provided corporate / facility photograph" />
          )}
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
