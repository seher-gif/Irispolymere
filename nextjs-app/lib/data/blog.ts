export type BlogPost = {
  slug: string;
  key: string;
  date: string;
  accent: string;
  relatedSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pvc-rigid-vs-flexible",
    key: "blog.post1",
    date: "2026-06-12",
    accent: "#105191",
    relatedSlugs: ["pvc-rigid", "pvc-flexible", "pvc-cable"],
  },
  {
    slug: "hffr-compounds-explained",
    key: "blog.post2",
    date: "2026-05-28",
    accent: "#1a63ab",
    relatedSlugs: ["hffr-hm2", "hffr-cpr", "hffr-filler"],
  },
  {
    slug: "masterbatch-guide",
    key: "blog.post3",
    date: "2026-04-15",
    accent: "#0b3a68",
    relatedSlugs: ["masterbatch-color", "masterbatch-white-50", "masterbatch-filler"],
  },
];

export const blogPostsBySlug = Object.fromEntries(blogPosts.map((p) => [p.slug, p]));
