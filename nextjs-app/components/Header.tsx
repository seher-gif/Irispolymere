"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { corporateLinks, productLinks } from "@/lib/nav-data";
import { contactInfo, telHref, whatsappHref } from "@/lib/contact-info";
import { useI18n } from "./providers/i18n-provider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppIcon } from "./Icons";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const home = `/${locale}`;
  const isActive = (href: string) => pathname === `/${locale}/${href}` || pathname === `/${locale}/${href}/`;

  // Lock background scroll while the mobile menu overlay is open — without
  // this, iOS Safari lets touch-scroll pass through to the page behind a
  // `fixed` overlay, causing the classic scroll-under/jump glitch.
  useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_0_var(--color-line)]">
      {/* Topbar */}
      <div className="hidden md:block border-b border-line bg-surface-alt">
        <div className="mx-auto flex max-w-[1320px] items-center justify-end gap-6 px-6 py-2">
          <a href={telHref(contactInfo.phones[0])} className="flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-brand transition-colors">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4.5 4.5h3.7l1.6 4.4-2.1 1.7a12.5 12.5 0 006 6l1.7-2.1 4.4 1.6v3.7c0 1-1 1.7-2 1.5-11.4-1.7-17-9.4-18-16-.2-1 .6-2 1.7-2z" />
            </svg>
            {contactInfo.phones[0]}
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-[#25D366] transition-colors">
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-4">
        <Link href={home} className="flex shrink-0 items-center gap-2.5">
          <Image src="/brand/logo-mark.webp" alt="" width={40} height={38} className="h-9 w-auto" priority />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-ink">IRIS POLYMERE</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">Compound Solutions</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-8" aria-label="Primary">
          <Link href={home} className="text-sm font-bold text-brand hover:text-brand-hover transition-colors">
            {t("nav.home")}
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-bold text-ink hover:text-brand transition-colors">
              {t("nav.corporate")} <ChevronDown />
            </button>
            <div className="invisible absolute start-0 top-full z-50 w-72 translate-y-1 rounded-sm border border-line bg-white py-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {corporateLinks.map((item) => (
                <Link key={item.href} href={`${home}/${item.href}`} className="block px-5 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface-alt hover:text-brand">
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-bold text-ink hover:text-brand transition-colors">
              {t("nav.products")} <ChevronDown />
            </button>
            <div className="invisible absolute start-0 top-full z-50 w-80 translate-y-1 rounded-sm border border-line bg-white py-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {productLinks.map((item) => (
                <Link key={item.href} href={`${home}/${item.href}`} className="block px-5 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface-alt hover:text-brand">
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          <Link href={`${home}/certificates`} className="text-sm font-bold text-ink hover:text-brand transition-colors">
            {t("nav.certificates")}
          </Link>
          <Link href={`${home}/blog`} className="text-sm font-bold text-ink hover:text-brand transition-colors">
            {t("nav.blog")}
          </Link>
          <Link href={`${home}/contact`} className="text-sm font-bold text-ink hover:text-brand transition-colors">
            {t("nav.contact")}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-line xl:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex xl:hidden">
          <div className="w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <Image src="/brand/logo-mark.webp" alt="" width={36} height={34} className="h-8 w-auto" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-line">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-line">
              <Link href={home} onClick={() => setMobileOpen(false)} className="py-3.5 text-base font-bold text-ink">
                {t("nav.home")}
              </Link>
              <div>
                <button
                  onClick={() => setMobileSection(mobileSection === "corp" ? null : "corp")}
                  className="flex w-full items-center justify-between py-3.5 text-base font-bold text-ink"
                >
                  {t("nav.corporate")} <ChevronDown className={mobileSection === "corp" ? "rotate-180" : ""} />
                </button>
                {mobileSection === "corp" && (
                  <div className="pb-2 ps-3">
                    {corporateLinks.map((item) => (
                      <Link key={item.href} href={`${home}/${item.href}`} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-ink-soft">
                        {t(item.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => setMobileSection(mobileSection === "prod" ? null : "prod")}
                  className="flex w-full items-center justify-between py-3.5 text-base font-bold text-ink"
                >
                  {t("nav.products")} <ChevronDown className={mobileSection === "prod" ? "rotate-180" : ""} />
                </button>
                {mobileSection === "prod" && (
                  <div className="pb-2 ps-3">
                    {productLinks.map((item) => (
                      <Link key={item.href} href={`${home}/${item.href}`} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-ink-soft">
                        {t(item.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href={`${home}/certificates`} onClick={() => setMobileOpen(false)} className="py-3.5 text-base font-bold text-ink">
                {t("nav.certificates")}
              </Link>
              <Link href={`${home}/blog`} onClick={() => setMobileOpen(false)} className="py-3.5 text-base font-bold text-ink">
                {t("nav.blog")}
              </Link>
              <Link href={`${home}/contact`} onClick={() => setMobileOpen(false)} className="py-3.5 text-base font-bold text-ink">
                {t("nav.contact")}
              </Link>
            </nav>
            <div className="mt-6">
              <LanguageSwitcher variant="mobile" />
            </div>
          </div>
          <button
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
            className="flex-1 bg-ink/40"
          />
        </div>
      )}
    </header>
  );
}
