import "server-only";
import { put, del } from "@vercel/blob";
import { randomUUID } from "crypto";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

/**
 * Where admin uploads live. Hosted (Vercel): Vercel Blob — the serverless filesystem is
 * read-only — with the browser uploading straight to Blob (see lib/blob-client.ts) so file
 * size isn't limited by the function request-body cap. Local development without a
 * BLOB_READ_WRITE_TOKEN: files in public/uploads, posted through the server action as before.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;

export const IMAGE_TYPES = new Map<string, string>([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);
export const MEDIA_TYPES = new Map<string, string>([...IMAGE_TYPES, ["application/pdf", "pdf"]]);

export type StoredUpload = { url: string; name: string; type: string; size: number; ext: string };

const BLOB_HOST = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;

// Uploaded images carry their pixel size in the filename ("<id>-2400x1050.jpg") so pages can
// render them at their natural shape without measuring them again (see lib/content.ts).
async function nameWithSize(ext: string, buffer: Buffer, type: string) {
  const id = randomUUID();
  if (!type.startsWith("image/") || type === "image/svg+xml") return `${id}.${ext}`;
  try {
    const m = await sharp(buffer).metadata();
    const swap = (m.orientation ?? 1) >= 5;
    const w = swap ? m.height : m.width;
    const h = swap ? m.width : m.height;
    if (w && h) return `${id}-${w}x${h}.${ext}`;
  } catch {
    // fall through
  }
  return `${id}.${ext}`;
}

/** Saves a buffer produced on the server (e.g. a trimmed logo) and returns its public URL. */
export async function storeBuffer(buffer: Buffer, ext: string, contentType: string): Promise<string> {
  if (blobEnabled) {
    const filename = await nameWithSize(ext, buffer, contentType);
    const blob = await put(`uploads/${filename}`, buffer, { access: "public", contentType, addRandomSuffix: false });
    return blob.url;
  }
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

/** Removes an uploaded file (Blob or local). Missing/read-only files are ignored. */
export async function deleteUpload(url: string | null | undefined) {
  if (!url) return;
  try {
    if (BLOB_HOST.test(url)) await del(url);
    else if (url.startsWith("/uploads/")) await unlink(path.join(process.cwd(), "public", url));
  } catch {
    // already gone, or not ours to delete
  }
}

/** Downloads an uploaded file's bytes (Blob URL or local path). */
export async function readUpload(url: string): Promise<Buffer> {
  if (url.startsWith("/uploads/")) {
    const { readFile } = await import("fs/promises");
    return readFile(path.join(process.cwd(), "public", url));
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not read upload (${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Reads one uploaded file from a submitted form. The value is either a File (local dev, or a
 * small file) which is stored here, or a Blob URL string the browser already uploaded
 * (`<key>__name/__type/__size` carry its details). Returns null when nothing was chosen.
 */
export async function resolveUpload(
  formData: FormData,
  key: string,
  allowed: Map<string, string>
): Promise<{ upload: StoredUpload } | { error: string } | null> {
  const value = formData.get(key);

  if (typeof value === "string" && value) {
    if (!BLOB_HOST.test(value)) return { error: "Upload failed — please try again." };
    const type = String(formData.get(`${key}__type`) ?? "");
    const size = Number(formData.get(`${key}__size`) ?? 0);
    const ext = allowed.get(type);
    if (!ext) {
      await deleteUpload(value);
      return { error: `Unsupported file type. Allowed: ${[...new Set(allowed.values())].join(", ").toUpperCase()}.` };
    }
    if (size > MAX_UPLOAD_SIZE) {
      await deleteUpload(value);
      return { error: "File is too large (25MB max)." };
    }
    return { upload: { url: value, name: String(formData.get(`${key}__name`) ?? ""), type, size, ext } };
  }

  if (value instanceof File && value.size > 0) {
    if (value.size > MAX_UPLOAD_SIZE) return { error: "File is too large (25MB max)." };
    const ext = allowed.get(value.type);
    if (!ext) return { error: `Unsupported file type. Allowed: ${[...new Set(allowed.values())].join(", ").toUpperCase()}.` };
    const url = await storeBuffer(Buffer.from(await value.arrayBuffer()), ext, value.type);
    return { upload: { url, name: value.name, type: value.type, size: value.size, ext } };
  }

  return null;
}
