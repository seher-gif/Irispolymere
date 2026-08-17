import Link from "next/link";
import type { TFunc } from "@/lib/i18n/t";
import { CableIcon, ProfileIcon, PlasticsIcon, PackagingIcon, InjectionIcon, ExtrusionIcon } from "../Icons";
import { Container, SectionHead } from "../ui";

export function ApplicationsSection({ t, locale }: { t: TFunc; locale: string }) {
  const items = [
    { Icon: CableIcon, key: "home.applications.cable", href: `/${locale}/products/pvc-cable` },
    { Icon: ProfileIcon, key: "home.applications.profiles", href: `/${locale}/products/pvc-rigid` },
    { Icon: PlasticsIcon, key: "home.applications.plastics", href: `/${locale}/products/masterbatch` },
    { Icon: PackagingIcon, key: "home.applications.packaging", href: `/${locale}/products/masterbatch-white-50` },
    { Icon: InjectionIcon, key: "home.applications.injection", href: `/${locale}/products/masterbatch-color` },
    { Icon: ExtrusionIcon, key: "home.applications.extrusion", href: `/${locale}/products/pvc` },
  ];
  return (
    <section className="bg-surface-alt py-16 sm:py-20">
      <Container>
        <SectionHead eyebrow={t("home.applications.eyebrow")} title={t("home.applications.title")} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map(({ Icon, key, href }) => (
            <Link key={key} href={href} className="flex items-center gap-4 border border-line bg-white p-5 transition-colors hover:border-brand hover:bg-brand-tint">
              <Icon className="h-9 w-9 shrink-0 text-brand" />
              <strong className="text-sm text-ink">{t(key)}</strong>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
