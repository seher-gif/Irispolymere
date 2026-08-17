"use client";

import Image from "next/image";
import Link from "next/link";
import { corporateLinks, productLinks } from "@/lib/nav-data";
import { useI18n } from "./providers/i18n-provider";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

const SOCIAL = [
  { label: "Instagram", href: "#", path: "M12 2.2c2.7 0 3 0 4.1.06 1 .05 1.6.2 2 .35.5.2.9.4 1.3.8.4.4.6.8.8 1.3.15.4.3 1 .35 2 .06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.2 1.6-.35 2-.2.5-.4.9-.8 1.3-.4.4-.8.6-1.3.8-.4.15-1 .3-2 .35-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.6-.2-2-.35a3.5 3.5 0 01-1.3-.8 3.5 3.5 0 01-.8-1.3c-.15-.4-.3-1-.35-2-.06-1.1-.06-1.4-.06-4.1s0-3 .06-4.1c.05-1 .2-1.6.35-2 .2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.4-.15 1-.3 2-.35C9 2.2 9.3 2.2 12 2.2zm0 1.8c-2.6 0-2.9 0-4 .06-.8.04-1.3.16-1.6.27-.4.15-.7.33-1 .63-.3.3-.48.6-.63 1-.1.3-.23.8-.27 1.6-.06 1.1-.06 1.4-.06 4s0 2.9.06 4c.04.8.16 1.3.27 1.6.15.4.33.7.63 1 .3.3.6.48 1 .63.3.1.8.23 1.6.27 1.1.06 1.4.06 4 .06s2.9 0 4-.06c.8-.04 1.3-.16 1.6-.27.4-.15.7-.33 1-.63.3-.3.48-.6.63-1 .1-.3.23-.8.27-1.6.06-1.1.06-1.4.06-4s0-2.9-.06-4c-.04-.8-.16-1.3-.27-1.6a2.6 2.6 0 00-.63-1 2.6 2.6 0 00-1-.63c-.3-.1-.8-.23-1.6-.27-1.1-.06-1.4-.06-4-.06zm0 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.8a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4zm5.7-2a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" },
  { label: "LinkedIn", href: "#", path: "M6.94 8.5H3.56V20.4h3.38V8.5zM5.25 3.6a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.44 20.4h-3.37v-5.77c0-1.38-.03-3.15-1.92-3.15-1.93 0-2.22 1.5-2.22 3.05v5.87H9.56V8.5h3.24v1.63h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18v6.84z" },
  { label: "Facebook", href: "#", path: "M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0014.6 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.14H8.35v2.96h2.55V21h2.6z" },
  { label: "X", href: "#", path: "M4 4l7.1 9.5L4.3 20h1.9l6-6.6 4.9 6.6h4l-7.4-9.9L19.7 4h-1.9l-5.6 6.1L8 4H4zm2.9 1.5h1.8l9.4 12.9h-1.8L6.9 5.5z" },
];

export function Footer() {
  const { locale, t } = useI18n();
  const home = `/${locale}`;

  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-[1320px] px-6 py-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_2fr_1fr]">
          <div className="flex justify-center lg:justify-start">
            <Link href={home}>
              <Image src="/brand/logo-full-white.webp" alt="Iris Polymere" width={220} height={104} className="h-16 w-auto" />
            </Link>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-center">
            <Link href={home} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.home")}</Link>
            <Link href={`${home}/corporate/about`} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.corporate.about")}</Link>
            <Link href={`${home}/products/pvc`} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.products")}</Link>
            <Link href={`${home}/certificates`} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.certificates")}</Link>
            <Link href={`${home}/blog`} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.blog")}</Link>
            <Link href={`${home}/contact`} className="text-sm font-semibold text-white/90 hover:text-white">{t("nav.contact")}</Link>
          </nav>
          <ul className="flex justify-center gap-3 lg:justify-end">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand"
                >
                  <SocialIcon path={s.path} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6 text-xs text-white/70 sm:grid-cols-4">
          <div>
            <p className="mb-2 font-bold uppercase tracking-wide text-white">{t("footer.products")}</p>
            {productLinks.map((p) => (
              <Link key={p.href} href={`${home}/${p.href}`} className="block py-0.5 hover:text-white">{t(p.key)}</Link>
            ))}
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wide text-white">{t("footer.corporate")}</p>
            {corporateLinks.map((c) => (
              <Link key={c.href} href={`${home}/${c.href}`} className="block py-0.5 hover:text-white">{t(c.key)}</Link>
            ))}
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wide text-white">{t("footer.certificates")}</p>
            <Link href={`${home}/certificates`} className="block py-0.5 hover:text-white">{t("nav.certificates")}</Link>
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wide text-white">{t("footer.contact")}</p>
            <Link href={`${home}/contact`} className="block py-0.5 hover:text-white">{t("nav.contact")}</Link>
            <Link href={`${home}/contact`} className="block py-0.5 hover:text-white">{t("nav.requestQuote")}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/70">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
