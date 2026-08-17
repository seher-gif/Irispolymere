import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex max-w-[1320px] flex-col items-center px-6 py-24 text-center">
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-brand">404</span>
      <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for does not exist or may have been moved. Use the navigation above or return to the homepage.
      </p>
      <Link href={`/${defaultLocale}`} className="mt-8 bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover">
        Back to Homepage
      </Link>
    </div>
  );
}
