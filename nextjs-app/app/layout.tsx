import type { Metadata } from "next";
import { getSiteAssetOverrides } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const assets = await getSiteAssetOverrides();
  return {
    metadataBase: new URL("https://www.irispolymere.com"),
    title: "Iris Polymere",
    description: "Iris Polymere — advanced compound solutions.",
    icons: {
      icon: assets.favicon ?? "/brand/favicon-512.png",
      apple: assets["apple-icon"] ?? "/brand/apple-touch-icon.png",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
