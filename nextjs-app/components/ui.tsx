import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import type { Locale } from "@/lib/i18n/config";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { ArrowRightIcon } from "./Icons";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1320px] px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">
      <span className="h-[2px] w-6 bg-brand" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className={center ? "flex justify-center" : ""}><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 text-muted">{lead}</p>}
    </div>
  );
}

export function Breadcrumb({ t, locale, items }: { t: TFunc; locale: string; items: { labelKey: string; href?: string }[] }) {
  const jsonLd = buildBreadcrumbJsonLd(
    locale as Locale,
    items.map((item) => ({ name: t(item.labelKey), url: item.href ? `${SITE_URL}${item.href}` : undefined }))
  );
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
      <JsonLd data={jsonLd} />
      <Link href={`/${locale}`} className="font-semibold hover:text-white">{t("breadcrumb.home")}</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="opacity-50">/</span>
          {item.href ? (
            <Link href={item.href} className="font-semibold hover:text-white">{t(item.labelKey)}</Link>
          ) : (
            <span className="font-semibold text-white">{t(item.labelKey)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  t,
  locale,
  eyebrowKey,
  titleKey,
  leadKey,
  crumbs,
}: {
  t: TFunc;
  locale: string;
  eyebrowKey: string;
  titleKey: string;
  leadKey: string;
  crumbs: { labelKey: string; href?: string }[];
}) {
  return (
    <section className="bg-brand-darker px-6 py-14 text-white">
      <Container>
        <Breadcrumb t={t} locale={locale} items={crumbs} />
        <span className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
          <span className="h-[2px] w-6 bg-white/70" />
          {t(eyebrowKey)}
        </span>
        <h1 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{t(titleKey)}</h1>
        <p className="mt-4 max-w-2xl text-white/80">{t(leadKey)}</p>
      </Container>
    </section>
  );
}

export function CTABand({ t, locale }: { t: TFunc; locale: string }) {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-start gap-6 bg-brand p-10 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">{t("home.cta.title")}</h2>
            <p className="mt-2 max-w-lg text-white/85">{t("home.cta.lead")}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link href={`/${locale}/contact`} className="rounded-sm bg-white px-5 py-3 text-sm font-bold text-brand hover:bg-white/90">
              {t("btn.requestQuote")}
            </Link>
            <Link href={`/${locale}/contact`} className="rounded-sm border border-white/50 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-brand">
              {t("btn.contactUs")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CardLink({ t, labelKey = "btn.viewProducts" }: { t: TFunc; labelKey?: string }) {
  return (
    <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand">
      {t(labelKey)}
      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
    </span>
  );
}
