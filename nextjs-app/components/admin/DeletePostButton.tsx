"use client";

import { useTransition } from "react";
import { deletePost } from "@/lib/actions/posts";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(() => deletePost(id));
  }

  return (
    <button onClick={handleDelete} disabled={pending} className="text-xs font-bold text-red-600 hover:text-red-700">
      Delete
    </button>
  );
}
