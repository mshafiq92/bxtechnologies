import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/cn";
import { getNavigation } from "@/lib/content";
import { noIndex, siteUrl } from "@/lib/site";

import { inter, jetbrainsMono } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "bX Technologies",
    template: "%s | bX Technologies",
  },
  description:
    "AI-first engineering partner. We design, build and operate custom software, web, mobile and agentic AI systems for clients in Europe and Asia.",
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F4F8FB", // guard-ignore: browser UI colour must be a literal (matches --bg)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("theme-bx-light", inter.variable, jetbrainsMono.variable)}>
      <body className="flex min-h-dvh flex-col bg-ground font-sans text-ink">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-surface px-4 py-3 font-semibold text-link focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header nav={getNavigation()} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
