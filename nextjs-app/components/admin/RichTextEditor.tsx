"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

function ToolbarButton({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`min-w-[32px] border px-2 py-1.5 text-xs font-bold ${active ? "border-brand bg-brand-tint text-brand" : "border-line text-ink-soft hover:border-brand hover:text-brand"}`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: defaultValue || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[260px] px-3 py-3 focus:outline-none",
      },
    },
  });

  // Keep a hidden input in sync so this works inside a plain <form action={...}>
  useEffect(() => {
    if (!editor) return;
    const hidden = document.getElementById(`${name}-hidden`) as HTMLInputElement | null;
    if (hidden) hidden.value = editor.getHTML();
    const update = () => {
      if (hidden) hidden.value = editor.getHTML();
    };
    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor, name]);

  function addLink() {
    if (!editor) return;
    const url = window.prompt("Link URL (e.g. /uploads/file.pdf or https://…)");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function addImage() {
    if (!editor) return;
    const url = window.prompt("Image URL (upload via Media Library first, then paste the URL)");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  if (!editor) {
    return <div className="border border-line bg-white p-4 text-sm text-muted">Loading editor…</div>;
  }

  return (
    <div className="border border-line bg-white">
      <div className="flex flex-wrap gap-1.5 border-b border-line bg-surface-alt p-2">
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>I</ToolbarButton>
        <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
        <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>••</ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;</ToolbarButton>
        <ToolbarButton label="Link (PDF or URL)" active={editor.isActive("link")} onClick={addLink}>🔗</ToolbarButton>
        <ToolbarButton label="Image" onClick={addImage}>🖼</ToolbarButton>
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>↶</ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>↷</ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" id={`${name}-hidden`} name={name} defaultValue={defaultValue || ""} />
    </div>
  );
}
