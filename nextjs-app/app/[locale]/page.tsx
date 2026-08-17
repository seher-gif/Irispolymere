import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { notFound } from "next/navigation";
import { HeroSlider } from "@/components/HeroSlider";
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
  return {
    title: "Iris Polymere — Advanced Compound Solutions for Reliable Production",
    description:
      "Iris Polymere develops high-performance PVC, HFFR, masterbatch, and filler compound solutions for cable, plastics, and industrial manufacturing applications across Algeria, North Africa and the Middle East.",
    alternates: { canonical: `https://www.irispolymere.com/${locale}` },
    openGraph: {
      title: "Iris Polymere — Advanced Compound Solutions for Reliable Production",
      description: "PVC, HFFR, masterbatch and filler compound solutions for cable, plastics and industrial manufacturing.",
      images: ["/brand/og-placeholder.png"],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);

  return (
    <>
      <HeroSlider />
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
