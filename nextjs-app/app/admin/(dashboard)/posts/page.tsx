import Link from "next/link";
import { prisma } from "@/lib/db";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; status?: string }>;
}) {
  const { q = "", category = "", status = "" } = await searchParams;

  const categories = await prisma.category.findMany({ orderBy: { nameEn: "asc" } });

  const posts = await prisma.post.findMany({
    where: {
      ...(q ? { titleEn: { contains: q } } : {}),
      ...(category ? { categoryId: category } : {}),
      ...(status === "published" ? { published: true } : status === "draft" ? { published: false } : {}),
    },
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Blog Posts</h1>
          <p className="mt-1 text-sm text-muted">{posts.length} post(s) shown.</p>
        </div>
        <Link href="/admin/posts/new" className="bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover">
          New Post
        </Link>
      </div>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title…"
          className="min-w-[220px] flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <select name="category" defaultValue={category} className="border border-line px-3 py-2 text-sm">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.nameEn}</option>
          ))}
        </select>
        <select name="status" defaultValue={status} className="border border-line px-3 py-2 text-sm">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit" className="border border-line px-4 py-2 text-sm font-bold text-ink-soft hover:border-brand hover:text-brand">
          Filter
        </button>
        {(q || category || status) && (
          <Link href="/admin/posts" className="px-4 py-2 text-sm font-bold text-muted hover:text-ink">
            Clear
          </Link>
        )}
      </form>

      <table className="mt-6 w-full border border-line bg-white">
        <thead>
          <tr className="border-b border-line bg-surface-alt">
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">Title</th>
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">Category</th>
            <th className="p-3 text-start text-xs font-bold uppercase text-muted">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b border-line">
              <td className="p-3">
                <Link href={`/admin/posts/${p.id}/edit`} className="text-sm font-semibold text-ink hover:text-brand">{p.titleEn}</Link>
              </td>
              <td className="p-3 text-sm text-muted">{p.category?.nameEn ?? "—"}</td>
              <td className="p-3">
                <span className={`px-2 py-0.5 text-xs font-bold ${p.published ? "bg-green-100 text-green-700" : "bg-surface-alt text-muted"}`}>
                  {p.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="p-3 text-end">
                <div className="flex justify-end gap-3">
                  <Link href={`/admin/posts/${p.id}/edit`} className="text-xs font-bold text-brand hover:text-brand-hover">Edit</Link>
                  <DeletePostButton id={p.id} title={p.titleEn} />
                </div>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-sm text-muted">No posts match these filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
