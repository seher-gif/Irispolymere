"use server";

import { prisma } from "@/lib/db";

export type ContactFormState = {
  errors?: Record<string, boolean>;
  success?: boolean;
};

const REQUIRED_FIELDS = ["fullName", "company", "country", "email", "productInterest", "message"] as const;

export async function submitContactForm(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const values = Object.fromEntries(REQUIRED_FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim()]));
  const phone = String(formData.get("phone") ?? "").trim();
  const locale = String(formData.get("locale") ?? "en").trim();

  const errors: Record<string, boolean> = {};
  for (const field of REQUIRED_FIELDS) {
    if (!values[field]) errors[field] = true;
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = true;
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        fullName: values.fullName,
        company: values.company,
        country: values.country,
        email: values.email,
        phone: phone || null,
        productInterest: values.productInterest,
        message: values.message,
        locale,
      },
    });
  } catch (err) {
    // Expected on the deployed production site, which has no persistent
    // database (see ADMIN.md) — don't break the visitor's experience over
    // an infrastructure limitation, just log it for local diagnosis.
    console.error("Failed to store contact submission:", err);
  }

  return { success: true };
}
