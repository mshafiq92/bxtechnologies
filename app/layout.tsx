import type { Metadata, Viewport } from "next";

import { Analytics } from "@/components/consent/analytics";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/cn";
import { consentPrePaintScript } from "@/lib/consent";
import { getConsentCopy, getNavigation } from "@/lib/content";
import { noIndex, siteUrl } from "@/lib/site";

import { inter, jetbrainsMono } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BX Technologies",
    template: "%s | BX Technologies",
  },
  description:
    "AI-first engineering partner. We design, build and operate custom software, web, mobile and agentic AI systems.",
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A1F33", // guard-ignore: browser UI colour must be a literal (matches --brand-deep, the header)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the consent script below sets data-consent on <html> before React loads.
    <html
      lang="en"
      className={cn("theme-bx-light", inter.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Hides the cookie notice before first paint for visitors who already chose. */}
        <script dangerouslySetInnerHTML={{ __html: consentPrePaintScript() }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-ground font-sans text-ink">
        <ConsentProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-surface px-4 py-3 font-semibold text-link focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <CookieBanner copy={getConsentCopy()} />
          <Header nav={getNavigation()} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
