import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updatePost } from "@/lib/actions/posts";
import { PostForm } from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { nameEn: "asc" } }),
  ]);

  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">Edit Blog Post</h1>
      <div className="mt-6 max-w-3xl">
        <PostForm action={action} categories={categories} post={post} />
      </div>
    </div>
  );
}
