import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.irispolymere.com"),
  title: "Iris Polymere",
  description: "Iris Polymere — advanced compound solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
