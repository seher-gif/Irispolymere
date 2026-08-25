"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./providers/i18n-provider";

export function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("iris-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function decide(value: "accepted" | "rejected") {
    localStorage.setItem("iris-cookie-consent", value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-white px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="mb-3 sm:mb-0">
        <p className="text-sm font-bold text-ink">{t("cookie.title")}</p>
        <p className="mt-1 max-w-xl text-xs text-muted">{t("cookie.text")}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button onClick={() => decide("rejected")} className="rounded-sm border border-line px-4 py-2 text-xs font-bold text-ink-soft">
          {t("cookie.reject")}
        </button>
        <button onClick={() => decide("accepted")} className="rounded-sm bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover">
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
