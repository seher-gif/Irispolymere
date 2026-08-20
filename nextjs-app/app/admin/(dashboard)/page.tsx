import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [postCount, publishedCount, categoryCount, mediaCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.media.count(),
  ]);

  const cards = [
    { label: "Total Posts", value: postCount, href: "/admin/posts" },
    { label: "Published", value: publishedCount, href: "/admin/posts" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
    { label: "Media Files", value: mediaCount, href: "/admin/media" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Manage the Iris Polymere blog, categories, media and certificates.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="border border-line bg-white p-5 transition-colors hover:border-brand">
            <span className="text-3xl font-extrabold text-brand">{c.value}</span>
            <p className="mt-1 text-sm font-semibold text-ink-soft">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-dashed border-line bg-white p-6">
        <h2 className="text-base font-bold text-ink">Publishing changes to the live site</h2>
        <p className="mt-2 text-sm text-muted">
          This admin panel edits content in a local database. To make changes visible on the live site, run{" "}
          <code className="bg-surface-alt px-1.5 py-0.5 text-xs">npm run export-content</code> to regenerate the
          site&apos;s static data files, then rebuild and redeploy.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/posts/new" className="bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover">
          New Blog Post
        </Link>
        <Link href="/admin/media" className="border border-line px-5 py-2.5 text-sm font-bold text-ink-soft hover:border-brand hover:text-brand">
          Upload Media / PDF
        </Link>
      </div>
    </div>
  );
}
