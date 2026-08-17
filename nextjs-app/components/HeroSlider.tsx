"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "./providers/i18n-provider";

const SLIDES = [
  { key: "hero.slide1", image: "/assets/masterbatch-banner.webp" },
  { key: "hero.slide2", image: null },
];

export function HeroSlider() {
  const { locale, t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[440px] overflow-hidden bg-brand-darker sm:h-[500px] lg:h-[560px]">
      {SLIDES.map((slide, i) => (
        <div key={slide.key} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          {slide.image ? (
            <>
              <Image src={slide.image} alt="" fill priority={i === 0} className="object-cover object-center" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/85 to-brand-darker/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-[#0b3a68] to-brand" />
          )}

          <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center px-6">
            <div className="max-w-xl text-white">
              <span className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
                <span className="h-[2px] w-6 bg-white/75" />
                {t(`${slide.key}.eyebrow`)}
              </span>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{t(`${slide.key}.title`)}</h1>
              <p className="mt-5 text-white/85">{t(`${slide.key}.lead`)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/products/pvc`} className="bg-white px-6 py-3 text-sm font-bold text-brand hover:bg-white/90">
                  {t("btn.exploreProducts")}
                </Link>
                <Link href={`/${locale}/contact`} className="border border-white/60 px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-brand">
                  {t("btn.requestQuote")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-5 start-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 transition-all ${i === active ? "w-7 bg-white" : "w-3 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
