import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { siteCopy } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://heathub.example"),
  title: {
    default: "HeatHub | Emergency cooling search for Europe",
    template: "%s | HeatHub"
  },
  description:
    "Search and compare urgent cooling products, service providers, weather context, and official merchant links across Europe.",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <header className="border-b border-line bg-paper/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="focus-ring rounded-md text-xl font-semibold">
              {siteCopy.brand}
            </Link>
            <nav aria-label="Primary navigation" className="flex items-center gap-1 text-sm">
              <Link className="focus-ring rounded-md px-3 py-2 hover:bg-white" href="/search">
                {siteCopy.nav.search}
              </Link>
              <Link className="focus-ring rounded-md px-3 py-2 hover:bg-white" href="/map">
                {siteCopy.nav.map}
              </Link>
              <Link className="focus-ring rounded-md px-3 py-2 hover:bg-white" href="/guides">
                {siteCopy.nav.guides}
              </Link>
              <Link className="focus-ring rounded-md px-3 py-2 hover:bg-white" href="/about">
                {siteCopy.nav.about}
              </Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-line bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>{siteCopy.affiliateDisclosure}</p>
            <div className="flex gap-4">
              <Link className="focus-ring rounded-md hover:text-ink" href="/privacy">
                Privacy
              </Link>
              <Link className="focus-ring rounded-md hover:text-ink" href="/terms">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
