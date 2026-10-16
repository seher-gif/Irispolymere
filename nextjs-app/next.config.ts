import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin uploads live in Vercel Blob (see lib/storage.ts).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
