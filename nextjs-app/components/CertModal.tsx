"use client";

import { useState } from "react";
import { useI18n } from "./providers/i18n-provider";
import { CertShieldIcon } from "./Icons";

export function CertModalTrigger({ label }: { label: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-sm border border-line px-5 py-2.5 text-sm font-bold text-ink-soft transition-colors hover:border-brand hover:text-brand"
      >
        {t("btn.viewCertificate")}
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50" />
          <div className="relative w-full max-w-md rounded-md bg-white p-8 text-center shadow-2xl">
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <CertShieldIcon className="mx-auto mb-4 h-12 w-12 text-brand" />
            <h3 className="text-lg font-bold text-ink">{t("certs.modal.title")}</h3>
            <p className="mt-1 text-sm text-muted">{label}</p>
            <p className="mt-4 text-sm text-muted">{t("certs.modal.text")}</p>
          </div>
        </div>
      )}
    </>
  );
}
