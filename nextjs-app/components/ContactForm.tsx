"use client";

import { useActionState } from "react";
import { useI18n } from "./providers/i18n-provider";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = {};

export function ContactForm() {
  const { t, locale } = useI18n();
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const errors = state.errors ?? {};

  // text-base (16px), not text-sm — anything smaller triggers iOS Safari's
  // automatic zoom-on-focus on this form.
  const fieldClass = (name: string) =>
    `w-full rounded-sm border px-4 py-2.5 text-base outline-none transition-colors focus:border-brand ${
      errors[name] ? "border-red-400" : "border-line"
    }`;

  if (state.success) {
    return (
      <div className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-6">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-green-600">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <div>
          <strong className="block text-sm font-bold text-green-800">{t("contact.form.success.title")}</strong>
          <p className="mt-1 text-sm text-green-700">{t("contact.form.success.text")}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.fullName")} <span className="text-brand">*</span></label>
        <input name="fullName" className={fieldClass("fullName")} />
        {errors.fullName && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.required")}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.company")} <span className="text-brand">*</span></label>
        <input name="company" className={fieldClass("company")} />
        {errors.company && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.required")}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.country")} <span className="text-brand">*</span></label>
        <input name="country" className={fieldClass("country")} />
        {errors.country && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.required")}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.email")} <span className="text-brand">*</span></label>
        <input name="email" type="email" className={fieldClass("email")} />
        {errors.email && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.email")}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.phone")}</label>
        <input name="phone" type="tel" className={fieldClass("phone")} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.productInterest")} <span className="text-brand">*</span></label>
        <select name="productInterest" className={fieldClass("productInterest")} defaultValue="">
          <option value="" disabled>{t("contact.form.productInterest.select")}</option>
          <option value="pvc">{t("contact.form.productInterest.pvc")}</option>
          <option value="hffr">{t("contact.form.productInterest.hffr")}</option>
          <option value="masterbatch">{t("contact.form.productInterest.masterbatch")}</option>
          <option value="filler">{t("contact.form.productInterest.filler")}</option>
          <option value="technical">{t("contact.form.productInterest.technical")}</option>
          <option value="other">{t("contact.form.productInterest.other")}</option>
        </select>
        {errors.productInterest && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.required")}</span>}
      </div>
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-bold text-ink">{t("contact.form.message")} <span className="text-brand">*</span></label>
        <textarea name="message" rows={5} className={fieldClass("message")} />
        {errors.message && <span className="text-xs font-semibold text-red-500">{t("contact.form.error.required")}</span>}
      </div>
      <div className="col-span-full">
        <button type="submit" disabled={pending} className="w-full rounded-sm bg-brand py-3.5 text-sm font-bold text-white hover:bg-brand-hover disabled:opacity-60 sm:w-auto sm:px-10">
          {pending ? "…" : t("btn.submitRequest")}
        </button>
      </div>
    </form>
  );
}
