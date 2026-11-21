import { readFile } from "fs/promises";
import path from "path";

// Self-hosted mode (no Vercel Blob): `next start` only serves public/ files that existed at
// build time, so files uploaded from the admin afterwards are served from here.
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const name = segments.join("/");
  const type = TYPES[name.split(".").pop()?.toLowerCase() ?? ""];
  if (!type || !/^[\w.-]+$/.test(name)) return new Response("Not found", { status: 404 });
  try {
    const file = await readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(file), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
