import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, localeMeta, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { getSiteAssetOverrides } from "@/lib/content";
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
  const assets = await getSiteAssetOverrides();

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
        <I18nProvider locale={locale} dict={dict}>
          <Header logoSrc={assets["logo-mark"] ?? "/brand/logo-mark.webp"} />
          <main className="flex-1">{children}</main>
          <Footer logoSrc={assets["logo-full"] ?? "/brand/logo-full-white.webp"} />
          <QuickContact />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
