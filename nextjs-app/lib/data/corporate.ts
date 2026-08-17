export type CorporatePage = {
  slug: string;
  navKey: string;
  heroTitleKey: string;
  heroLeadKey: string;
  metaDescriptionKey: string;
};

export const corporatePages: CorporatePage[] = [
  { slug: "about", navKey: "nav.corporate.about", heroTitleKey: "about.hero.title", heroLeadKey: "about.body", metaDescriptionKey: "about.meta.description" },
  { slug: "vision-mission", navKey: "nav.corporate.vision", heroTitleKey: "vision.hero.title", heroLeadKey: "vision.hero.lead", metaDescriptionKey: "vision.meta.description" },
  { slug: "quality", navKey: "nav.corporate.quality", heroTitleKey: "quality.hero.title", heroLeadKey: "quality.intro", metaDescriptionKey: "quality.intro" },
  { slug: "sustainability", navKey: "nav.corporate.sustainability", heroTitleKey: "sustain.hero.title", heroLeadKey: "sustain.intro", metaDescriptionKey: "sustain.intro" },
  { slug: "production", navKey: "nav.corporate.production", heroTitleKey: "production.hero.title", heroLeadKey: "production.intro", metaDescriptionKey: "production.intro" },
];

export const corporatePagesBySlug = Object.fromEntries(corporatePages.map((p) => [p.slug, p]));
