import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import { CertShieldIcon } from "../Icons";
import { Container, SectionHead } from "../ui";

const CERTS = ["iso", "eco", "reach", "rohs"];

export function CertificatesPreview({ t, locale }: { t: TFunc; locale: string }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHead center eyebrow={t("home.certs.eyebrow")} title={t("home.certs.title")} lead={t("home.certs.lead")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c) => (
            <Link
              key={c}
              href={`/${locale}/certificates`}
              className="flex flex-col items-center gap-3 border border-line bg-white p-8 text-center transition-colors hover:border-brand"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-tint-2 text-brand">
                <CertShieldIcon className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-ink">{t(`home.certs.${c}.title`)}</h3>
              <p className="text-sm text-muted">{t(`home.certs.${c}.desc`)}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
