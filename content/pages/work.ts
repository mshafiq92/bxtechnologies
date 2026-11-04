/* Work page copy (bX v2 - Projects.dc.html). Projects live in content/projects.ts. */
import type { ContactBandContent } from "@/lib/schemas/content";

export const workPage = {
  hero: {
    eyebrow: "Work",
    title: "Projects we have delivered and still support.",
    intro:
      "Systems in production for clients in Europe and Asia. Client names are withheld under NDA, so each project is described by sector, region, what we built and what it does now.",
    metrics: [
      { value: "7", label: "years delivering" },
      { value: "EU · APAC", label: "client base" },
      { value: "94%", label: "on-time delivery", placeholder: true },
    ],
    primaryCta: { label: "Discuss a project", href: "/contact" },
    secondaryCta: { label: "Browse projects", href: "#projects" },
  },
  jumpLinks: [
    { href: "#projects", label: "All projects" },
    { href: "#support", label: "Still supported" },
    { href: "#contact", label: "Start a project" },
  ],
  projects: {
    eyebrow: "All projects",
    title: "What we have built",
    // Design note addressed to bX; replace before launch once figures are signed off.
    note: "Figures are placeholders pending your sign-off. Sectors, regions and stacks are accurate.",
  },
  support: {
    eyebrow: "After launch",
    title: "Most of these are still ours to keep running",
    intro:
      "A delivered project is not a finished relationship. Where a client wants us to stay, we run the system; where they want to take it in-house, we hand it over properly.",
    items: [
      {
        number: "01",
        title: "Support and monitoring",
        text: "On-call cover, alerting we tuned ourselves, and a monthly report on what the system actually did.",
      },
      {
        number: "02",
        title: "Continuous change",
        text: "Small monthly change budgets rather than annual re-platforming. Most of these projects are on their third or fourth phase.",
      },
      {
        number: "03",
        title: "Clean handover",
        text: "Documentation, repository access and a walkthrough are part of the price. Nothing is written so that you have to keep us.",
      },
    ],
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Want the detail on any of these?",
    text: "We can walk you through the architecture and what went wrong on the way. Thirty minutes with the engineers who built it.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
