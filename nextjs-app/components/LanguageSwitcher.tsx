"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/switch-locale-path";
import { useI18n } from "./providers/i18n-provider";

export function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (variant === "mobile") {
    return (
      <div className="flex gap-2">
        {locales.map((code) => (
          <Link
            key={code}
            href={switchLocalePath(pathname, code)}
            className={`flex-1 rounded-sm border px-3 py-2 text-center text-xs font-bold uppercase tracking-wide ${
              code === locale
                ? "border-brand text-brand"
                : "border-line text-ink-soft"
            }`}
          >
            {code}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft hover:text-brand transition-colors"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z" />
        </svg>
        {locale.toUpperCase()}
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 w-40 rounded-sm border border-line bg-white py-1 shadow-lg"
        >
          {locales.map((code) => (
            <Link
              key={code}
              href={switchLocalePath(pathname, code)}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm font-semibold hover:bg-surface-alt ${
                code === locale ? "text-brand" : "text-ink"
              }`}
            >
              {localeMeta[code as Locale].native}
              <span className="ms-1.5 text-xs font-normal text-muted">{code.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
