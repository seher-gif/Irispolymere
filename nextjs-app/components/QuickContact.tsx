"use client";

import { useState } from "react";
import { useI18n } from "./providers/i18n-provider";
import { WhatsAppIcon } from "./Icons";
import { whatsappHref } from "@/lib/contact-info";

export function QuickContact() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <div className="fixed end-6 z-40 flex flex-col items-end gap-3 bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-brand-hover"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="M4 6.5l8 6 8-6" />
          </svg>
          {t("quickContact.button")}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button aria-label="Close" onClick={() => { setOpen(false); setSent(false); }} className="absolute inset-0 bg-ink/50" />
          <div className="relative w-full max-w-md rounded-md bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="text-base font-bold text-ink">{t("quickContact.title")}</h3>
              <button onClick={() => { setOpen(false); setSent(false); }} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full border border-line">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sent ? (
              <div className="flex items-center gap-3 p-6">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-green-600">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <p className="text-sm font-semibold text-ink">{t("contact.form.success.title")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6">
                <input required placeholder={t("quickContact.name")} className="rounded-sm border border-line px-4 py-2.5 text-base outline-none focus:border-brand" />
                <input required placeholder={t("quickContact.phone")} className="rounded-sm border border-line px-4 py-2.5 text-base outline-none focus:border-brand" />
                <input required type="email" placeholder={t("quickContact.email")} className="rounded-sm border border-line px-4 py-2.5 text-base outline-none focus:border-brand" />
                <textarea required rows={4} placeholder={t("quickContact.message")} className="rounded-sm border border-line px-4 py-2.5 text-base outline-none focus:border-brand" />
                <button type="submit" className="mt-1 rounded-sm bg-brand py-2.5 text-sm font-bold text-white hover:bg-brand-hover">
                  {t("quickContact.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
