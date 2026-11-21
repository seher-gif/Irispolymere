import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted mode posts admin uploads (up to 25 MB) through server actions.
  experimental: { serverActions: { bodySizeLimit: "30mb" } },
  images: {
    // Admin uploads live in Vercel Blob (see lib/storage.ts).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
