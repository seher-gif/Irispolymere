import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { notFound } from "next/navigation";
import { CertShieldIcon, EcoIcon } from "@/components/Icons";
import { CertModalTrigger } from "@/components/CertModal";
import { Container, PageHero, CTABand } from "@/components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  return { title: `${t("certs.hero.title")} — Iris Polymere`, description: t("certs.hero.lead") };
}

const CERTS = [
  { key: "iso", Icon: CertShieldIcon },
  { key: "eco", Icon: EcoIcon },
  { key: "reach", Icon: CertShieldIcon },
  { key: "rohs", Icon: CertShieldIcon },
];

export default async function CertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);

  return (
    <>
      <PageHero t={t} locale={locale} eyebrowKey="certs.hero.eyebrow" titleKey="certs.hero.title" leadKey="certs.hero.lead" crumbs={[{ labelKey: "nav.certificates" }]} />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map(({ key, Icon }) => (
              <div key={key} className="flex flex-col items-center gap-3 rounded-md border border-line bg-white p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-tint-2 text-brand">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-ink">{t(`certs.${key}.title`)}</h3>
                <p className="text-sm text-muted">{t(`certs.${key}.desc`)}</p>
                <span className="rounded-full bg-surface-alt px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-muted">{t("certs.download")}</span>
                <CertModalTrigger certKey={key} label={t(`certs.${key}.title`)} />
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-md border border-dashed border-line bg-surface-alt p-5 text-sm text-muted">
            {t("certs.note")}
          </div>
        </Container>
      </section>
      <CTABand t={t} locale={locale} />
    </>
  );
}
