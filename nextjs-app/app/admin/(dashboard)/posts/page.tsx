import Link from "next/link";
import { prisma } from "@/lib/db";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Blog Posts</h1>
          <p className="mt-1 text-sm text-muted">{posts.length} post(s) total.</p>
        </div>
        <Link href="/admin/posts/new" className="bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-hover">
          New Post
        </Link>
      </div>

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
              <td colSpan={4} className="p-6 text-center text-sm text-muted">No posts yet. Create your first one.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
