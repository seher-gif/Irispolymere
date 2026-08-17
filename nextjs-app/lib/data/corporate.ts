export type CorporatePage = {
  slug: string;
  navKey: string;
  heroTitleKey: string;
  heroLeadKey: string;
};

export const corporatePages: CorporatePage[] = [
  { slug: "about", navKey: "nav.corporate.about", heroTitleKey: "about.hero.title", heroLeadKey: "about.body" },
  { slug: "vision-mission", navKey: "nav.corporate.vision", heroTitleKey: "vision.hero.title", heroLeadKey: "about.body" },
  { slug: "quality", navKey: "nav.corporate.quality", heroTitleKey: "quality.hero.title", heroLeadKey: "quality.intro" },
  { slug: "sustainability", navKey: "nav.corporate.sustainability", heroTitleKey: "sustain.hero.title", heroLeadKey: "sustain.intro" },
  { slug: "production", navKey: "nav.corporate.production", heroTitleKey: "production.hero.title", heroLeadKey: "production.intro" },
];

export const corporatePagesBySlug = Object.fromEntries(corporatePages.map((p) => [p.slug, p]));
