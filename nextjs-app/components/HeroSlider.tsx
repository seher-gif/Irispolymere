"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "./providers/i18n-provider";
import { IndustrialVisual } from "./IndustrialVisual";

const SLIDES = [
  { key: "hero.slide1", accent: "#105191" },
  { key: "hero.slide2", accent: "#1a63ab" },
];

export function HeroSlider() {
  const { locale, t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-darker">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          className={`${i === active ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"} transition-opacity duration-700`}
        >
          <div className="grid grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24 mx-auto max-w-[1320px]">
            <div className="text-white">
              <span className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                <span className="h-[2px] w-6 bg-white/70" />
                {t(`${slide.key}.eyebrow`)}
              </span>
              <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t(`${slide.key}.title`)}
              </h1>
              <p className="mt-5 max-w-lg text-white/80">{t(`${slide.key}.lead`)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/products/pvc`} className="rounded-sm bg-white px-6 py-3 text-sm font-bold text-brand hover:bg-white/90">
                  {t("btn.exploreProducts")}
                </Link>
                <Link href={`/${locale}/contact`} className="rounded-sm border border-white/50 px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-brand">
                  {t("btn.requestQuote")}
                </Link>
              </div>
            </div>
            <div className="hidden overflow-hidden rounded-md shadow-2xl md:block">
              <IndustrialVisual accent={slide.accent} variant="hero" className="h-full w-full" />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-5 start-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-7 bg-white" : "w-3 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
