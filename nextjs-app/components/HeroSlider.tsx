"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "./providers/i18n-provider";

export type HeroBanner = { url: string; altText: string | null };

export function HeroSlider({ banners }: { banners: HeroBanner[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % banners.length), 7000);
    return () => clearInterval(id);
  }, [banners.length]);

  return (
    <section className="relative h-[440px] overflow-hidden bg-brand-darker sm:h-[500px] lg:h-[560px]">
      {/* Admin-managed banner images (see /admin/banners): shown as-is, full
          bleed, no gradient scrim or text layered on top of them. */}
      <h1 className="sr-only">{t("hero.slide1.title")}</h1>
      <p className="sr-only">{t("hero.slide1.lead")}</p>
      {banners.map((banner, i) => (
        <div
          key={banner.url}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <Image
            src={banner.url}
            alt={banner.altText || t("hero.slide1.eyebrow")}
            fill
            priority={i === 0}
            className="object-contain object-center sm:object-cover"
            sizes="100vw"
          />
        </div>
      ))}
      {banners.length > 1 && (
        <div className="absolute bottom-5 start-1/2 z-20 flex -translate-x-1/2 gap-2">
          {banners.map((banner, i) => (
            <button
              key={banner.url}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 transition-all ${i === active ? "w-7 bg-white" : "w-3 bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
