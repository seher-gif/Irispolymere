import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tFrom } from "@/lib/i18n/t";
import { notFound } from "next/navigation";
import { contactInfo, telHref } from "@/lib/contact-info";
import { PinIcon, PhoneIcon, MailIcon, MapIcon } from "@/components/Icons";
import { ContactForm } from "@/components/ContactForm";
import { Container, PageHero } from "@/components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const t = tFrom(dict);
  return { title: `${t("contact.hero.title")} — Iris Polymere`, description: t("contact.hero.lead") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const t = tFrom(dict);

  return (
    <>
      <PageHero t={t} locale={locale} eyebrowKey="contact.hero.eyebrow" titleKey="contact.hero.title" leadKey="contact.hero.lead" crumbs={[{ labelKey: "nav.contact" }]} />

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-ink">{t("contact.info.title")}</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex gap-3.5 rounded-md border border-line bg-white p-5">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <strong className="block text-sm text-ink">{t("contact.info.address.label")}</strong>
                  <span className="text-sm text-muted">{t("contact.info.address.value")}</span>
                </div>
              </div>
              <div className="flex gap-3.5 rounded-md border border-line bg-white p-5">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <strong className="block text-sm text-ink">{t("contact.info.phone.label")}</strong>
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={telHref(phone)} className="block text-sm text-muted hover:text-brand">{phone}</a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3.5 rounded-md border border-line bg-white p-5">
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <strong className="block text-sm text-ink">{t("contact.info.email.label")}</strong>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-muted hover:text-brand">{contactInfo.email}</a>
                  <span className="mt-1 block text-sm text-muted">{contactInfo.website}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md border border-line bg-white p-5">
                <Image src="/brand/qr-code.png" alt="Iris Polymere WhatsApp / contact QR code" width={72} height={72} className="rounded-sm border border-line" />
                <div>
                  <strong className="block text-sm text-ink">{t("contact.info.qr.label")}</strong>
                  <span className="text-xs text-muted">{contactInfo.website}</span>
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-xl font-bold text-ink">{t("contact.map.title")}</h2>
            <div className="mt-6 aspect-video overflow-hidden rounded-md border border-line bg-brand-darker">
              {/* Google Maps iframe placeholder: embed here once the exact factory address is confirmed by the client, e.g.
                  <iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy" className="h-full w-full border-0" /> */}
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-white/70">
                <MapIcon className="h-10 w-10" />
                <p className="text-sm">{t("contact.map.placeholder")}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-8">
            <h2 className="text-xl font-bold text-ink">{t("contact.form.title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("contact.form.lead")}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
