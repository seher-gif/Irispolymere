import { Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, localeMeta, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { contactInfo } from "@/lib/contact-info";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { CookieBanner } from "@/components/CookieBanner";
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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-full.png`,
    email: contactInfo.email,
    telephone: contactInfo.phones[0],
    sameAs: [] as string[],
  };

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
