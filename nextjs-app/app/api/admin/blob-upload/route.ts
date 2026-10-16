import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";
import { MAX_UPLOAD_SIZE, MEDIA_TYPES } from "@/lib/storage";

// Issues short-lived tokens so the admin's browser can upload straight to Vercel Blob
// (bypassing the serverless request-body size limit). Only signed-in admins get a token;
// Blob's own completion callback is verified by handleUpload itself.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  if (body.type === "blob.generate-client-token" && !(await getSession())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...MEDIA_TYPES.keys()],
        maximumSizeInBytes: MAX_UPLOAD_SIZE,
        addRandomSuffix: false,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
