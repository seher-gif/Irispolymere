import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { buildMetadata, resolvePageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { HeroSlider } from "@/components/HeroSlider";
import { banners } from "@/lib/data/banners";
import { AboutSection } from "@/components/home/AboutSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { WhySection } from "@/components/home/WhySection";
import { BlogSection } from "@/components/home/BlogSection";
import { CertificatesPreview } from "@/components/home/CertificatesPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTABand } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  const { title, description } = resolvePageMeta("home", locale as Locale, t("home.meta.title"), t("home.meta.description"));
  return buildMetadata({ locale, segments: [], title, description });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);

  return (
    <>
      <HeroSlider banners={banners} />
      <AboutSection t={t} locale={locale} />
      <ProductsSection t={t} locale={locale} />
      <BenefitsSection t={t} />
      <ApplicationsSection t={t} locale={locale} />
      <WhySection t={t} />
      <BlogSection t={t} locale={locale} />
      <CertificatesPreview t={t} locale={locale} />
      <NewsletterSection />
      <CTABand t={t} locale={locale} />
    </>
  );
}
