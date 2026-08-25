"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCertificate, type CreateCertificateState } from "@/lib/actions/certificates";

const initialState: CreateCertificateState = {};

export function NewCertificateForm() {
  const [state, formAction, pending] = useActionState(createCertificate, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state.error && formRef.current) {
      formRef.current.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <details className="border border-dashed border-line bg-surface-alt p-5">
      <summary className="cursor-pointer text-sm font-bold text-brand">+ Add a new certificate type</summary>
      <form ref={formRef} action={formAction} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input name="key" placeholder="Key (optional — auto from title)" className="border border-line bg-white px-2 py-1.5 text-sm" />
        <input name="titleEn" required placeholder="Title (EN) *" className="border border-line bg-white px-2 py-1.5 text-sm" />
        <input name="titleFr" placeholder="Title (FR)" className="border border-line bg-white px-2 py-1.5 text-sm" />
        <input name="titleAr" placeholder="Title (AR)" dir="rtl" className="border border-line bg-white px-2 py-1.5 text-sm" />
        <textarea name="descEn" placeholder="Description (EN)" rows={2} className="border border-line bg-white px-2 py-1.5 text-sm sm:col-span-3" />
        <div className="sm:col-span-3">
          <button type="submit" disabled={pending} className="bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60">
            {pending ? "Adding…" : "Add Certificate"}
          </button>
          {state.error && <span className="ms-3 text-sm font-semibold text-red-600">{state.error}</span>}
        </div>
      </form>
    </details>
  );
}
