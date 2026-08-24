"use client";

import { useState, useTransition } from "react";
import { markMessageRead, deleteMessage } from "@/lib/actions/messages";

type Message = {
  id: string;
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone: string | null;
  productInterest: string;
  message: string;
  locale: string;
  read: boolean;
  createdAt: Date;
};

export function MessageRow({ message }: { message: Message }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function toggleOpen() {
    setOpen((o) => !o);
    if (!message.read) {
      startTransition(() => markMessageRead(message.id, true));
    }
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(`Delete message from ${message.fullName}?`)) return;
    startTransition(() => deleteMessage(message.id));
  }

  return (
    <div className="border border-line bg-white">
      <div
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleOpen(); }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-start"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {!message.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">
              {message.fullName} — <span className="font-normal text-muted">{message.company}</span>
            </p>
            <p className="truncate text-xs text-muted">{message.email} · {message.productInterest} · {new Date(message.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs font-bold text-red-600 hover:text-red-700"
          >
            Delete
          </button>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-surface-alt p-4 text-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div><span className="block text-xs font-bold text-muted">Country</span>{message.country}</div>
            <div><span className="block text-xs font-bold text-muted">Phone</span>{message.phone || "—"}</div>
            <div><span className="block text-xs font-bold text-muted">Language</span>{message.locale.toUpperCase()}</div>
            <div><span className="block text-xs font-bold text-muted">Product Interest</span>{message.productInterest}</div>
          </div>
          <div className="mt-3">
            <span className="block text-xs font-bold text-muted">Message</span>
            <p className="mt-1 whitespace-pre-wrap text-ink">{message.message}</p>
          </div>
          <a href={`mailto:${message.email}`} className="mt-4 inline-block bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover">
            Reply by Email
          </a>
        </div>
      )}
    </div>
  );
}
