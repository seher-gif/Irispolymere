import { prisma } from "@/lib/db";
import { createPost } from "@/lib/actions/posts";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { nameEn: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">New Blog Post</h1>
      <div className="mt-6 max-w-3xl">
        <PostForm action={createPost} categories={categories} />
      </div>
    </div>
  );
}
