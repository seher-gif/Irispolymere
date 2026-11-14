export type CorporatePage = {
  slug: string;
  navKey: string;
  heroTitleKey: string;
  heroLeadKey: string;
  metaDescriptionKey: string;
  /** Body paragraphs shown below the hero; the first paragraph is the hero lead. */
  paragraphKeys: string[];
};

const paragraphs = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `corp.${prefix}.p${from + i}`);

export const corporatePages: CorporatePage[] = [
  { slug: "about", navKey: "nav.corporate.about", heroTitleKey: "about.hero.title", heroLeadKey: "corp.about.p1", metaDescriptionKey: "corp.about.p1", paragraphKeys: paragraphs("about", 2, 3) },
  { slug: "vision-mission", navKey: "nav.corporate.vision", heroTitleKey: "vision.hero.title", heroLeadKey: "corp.mission.p1", metaDescriptionKey: "corp.mission.p1", paragraphKeys: paragraphs("mission", 2, 2) },
  { slug: "quality", navKey: "nav.corporate.quality", heroTitleKey: "quality.hero.title", heroLeadKey: "corp.quality.p1", metaDescriptionKey: "corp.quality.p1", paragraphKeys: paragraphs("quality", 2, 3) },
  { slug: "sustainability", navKey: "nav.corporate.sustainability", heroTitleKey: "sustain.hero.title", heroLeadKey: "corp.sustain.p1", metaDescriptionKey: "corp.sustain.p1", paragraphKeys: paragraphs("sustain", 2, 3) },
  { slug: "production", navKey: "nav.corporate.production", heroTitleKey: "production.hero.title", heroLeadKey: "corp.production.p1", metaDescriptionKey: "corp.production.p1", paragraphKeys: paragraphs("production", 2, 3) },
];

export const corporatePagesBySlug = Object.fromEntries(corporatePages.map((p) => [p.slug, p]));
