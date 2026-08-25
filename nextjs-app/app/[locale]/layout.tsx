import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, localeMeta, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

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

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
        <I18nProvider locale={locale} dict={dict}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuickContact />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
