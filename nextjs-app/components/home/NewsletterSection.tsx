"use client";

import { useState } from "react";
import { useI18n } from "../providers/i18n-provider";
import { Container } from "../ui";

export function NewsletterSection() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <section className="bg-surface-alt py-14">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-md border border-line bg-white p-8 sm:flex-row">
          <div className="text-center sm:text-start">
            <h2 className="text-lg font-bold text-ink">{t("newsletter.title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("newsletter.text")}</p>
          </div>
          {sent ? (
            <p className="text-sm font-bold text-brand">{t("contact.form.success.title")}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
              <input
                required
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="w-full rounded-sm border border-line px-4 py-3 text-sm outline-none focus:border-brand"
              />
              <button type="submit" className="shrink-0 rounded-sm bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-hover">
                {t("newsletter.button")}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
