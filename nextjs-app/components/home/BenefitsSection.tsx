import type { TFunc } from "@/lib/i18n/t";
import { CostIcon, ProcessIcon, EcoIcon } from "../Icons";
import { Container, SectionHead } from "../ui";

const BENEFITS = [
  { Icon: CostIcon, titleKey: "home.benefits.cost.title", descKey: "home.benefits.cost.desc" },
  { Icon: ProcessIcon, titleKey: "home.benefits.process.title", descKey: "home.benefits.process.desc" },
  { Icon: EcoIcon, titleKey: "home.benefits.eco.title", descKey: "home.benefits.eco.desc" },
];

export function BenefitsSection({ t }: { t: TFunc }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHead center eyebrow={t("home.benefits.eyebrow")} title={t("home.benefits.title")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BENEFITS.map(({ Icon, titleKey, descKey }) => (
            <div key={titleKey} className="border border-line bg-white p-7 transition-colors hover:border-brand">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint text-brand">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-ink">{t(titleKey)}</h3>
              <p className="mt-1.5 text-sm text-muted">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
