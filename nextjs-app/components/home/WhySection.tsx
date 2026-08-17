import type { TFunc } from "@/lib/i18n/t";
import { CheckIcon } from "../Icons";
import { Container, Eyebrow } from "../ui";

export function WhySection({ t }: { t: TFunc }) {
  const points = Array.from({ length: 7 }, (_, i) => `home.why.point${i + 1}`);
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>{t("home.why.eyebrow")}</Eyebrow>
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{t("home.why.title")}</h2>
          <p className="mt-4 text-muted">{t("home.why.lead")}</p>
        </div>
        <ul className="grid gap-3.5">
          {points.map((key) => (
            <li key={key} className="flex items-start gap-3 text-sm text-ink">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              {t(key)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
