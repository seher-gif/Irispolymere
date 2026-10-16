"use client";

import { upload } from "@vercel/blob/client";

// Pixel size of an image the user picked (null for SVG/PDF or if it can't be decoded).
function imageSize(file: File): Promise<{ w: number; h: number } | null> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return Promise.resolve(null);
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.naturalWidth && img.naturalHeight ? { w: img.naturalWidth, h: img.naturalHeight } : null);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "application/pdf": "pdf",
};

/** Uploads one file straight from the browser to Vercel Blob and returns its public URL. */
export async function uploadFileDirect(file: File): Promise<string> {
  const ext = EXT[file.type];
  if (!ext) throw new Error("Unsupported file type. Allowed: PNG, JPG, WEBP, SVG, PDF.");
  const size = await imageSize(file);
  // The image's pixel size goes in the name so the site can show it at its natural shape.
  const name = `uploads/${crypto.randomUUID()}${size ? `-${size.w}x${size.h}` : ""}.${ext}`;
  const blob = await upload(name, file, {
    access: "public",
    handleUploadUrl: "/api/admin/blob-upload",
    contentType: file.type,
    multipart: file.size > 8 * 1024 * 1024,
  });
  return blob.url;
}

/**
 * Before a form is submitted to a server action: uploads every chosen file directly to Blob
 * and swaps it for its URL (plus `<field>__name/__type/__size`). Empty file inputs are dropped.
 * With `direct` off (local dev) the form data is returned untouched.
 */
export async function prepareUploads(formData: FormData, direct: boolean): Promise<FormData> {
  if (!direct) return formData;
  const out = new FormData();
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      if (value.size === 0) continue;
      const url = await uploadFileDirect(value);
      out.set(key, url);
      out.set(`${key}__name`, value.name);
      out.set(`${key}__type`, value.type);
      out.set(`${key}__size`, String(value.size));
    } else {
      out.append(key, value);
    }
  }
  return out;
}
