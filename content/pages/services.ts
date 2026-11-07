/*
 * Services page copy (bX v2 - Services.dc.html). Groups, services, stack lists and
 * engagement models live in content/services.ts.
 */
import type { ContactBandContent } from "@/lib/schemas/content";

export const servicesPage = {
  hero: {
    eyebrow: "Services",
    title: "Four groups of services, one delivery team.",
    intro:
      "We are an engineering firm, not a marketplace of unrelated skills. The AI work is built by the same people who maintain the systems it plugs into, which is why it survives contact with production.",
    metrics: [
      { value: "80+", label: "projects delivered" },
      { value: "4", label: "countries served", placeholder: true },
      { value: "94%", label: "on-time delivery", placeholder: true },
    ],
    primaryCta: { label: "Book a technical call", href: "#contact" },
    secondaryCta: { label: "Engagement models", href: "#engagement" },
  },
  jumpLinks: [
    { href: "#ai", label: "AI & Autonomy" },
    { href: "#data", label: "Data & Cloud" },
    { href: "#product", label: "Product Engineering" },
    { href: "#teams", label: "Teams & Advisory" },
    { href: "#stack", label: "Stack" },
    { href: "#engagement", label: "Engagement" },
  ],
  stack: {
    eyebrow: "Stack",
    title: "What we build with",
    // Design note addressed to bX; replace before launch once the lists are confirmed.
    note: "Drawn from the skills your team profiles already list. Confirm and extend this before launch. It should name only what your engineers have shipped and supported in production.",
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Not sure which service you need?",
    text: "Describe what is slow, manual or breaking. A 30-minute call with the engineers who would do the work. You leave with an approach, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
