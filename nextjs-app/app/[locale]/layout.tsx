import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, localeMeta, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { getSiteAssetOverrides, getHiddenProductPages, getCustomCategories } from "@/lib/content";
import { tFrom } from "@/lib/i18n/t";
import { productLinks } from "@/lib/nav-data";
import { filterProductLinks } from "@/lib/data/visibility";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

// Public pages are static but re-generated at most this often; admin saves also purge them
// immediately (see lib/publish.ts).
export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const dir = localeMeta[locale].dir;
  const [assets, hidden, customCategories] = await Promise.all([getSiteAssetOverrides(), getHiddenProductPages(), getCustomCategories()]);
  const t = tFrom(dict);
  const visibleProductLinks = [
    ...filterProductLinks(productLinks, hidden).map((l) => ({ href: l.href, label: t(l.key) })),
    ...customCategories.filter((c) => !hidden.includes(c.slug)).map((c) => ({ href: `products/${c.slug}`, label: c.title[locale] })),
  ];

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
        <I18nProvider locale={locale} dict={dict}>
          <Header logoSrc={assets["logo-mark"] ?? "/brand/logo-mark.webp"} productLinks={visibleProductLinks} />
          <main className="flex-1">{children}</main>
          <Footer logoSrc={assets["logo-full"] ?? "/brand/logo-full-white.webp"} productLinks={visibleProductLinks} />
          <QuickContact />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
