/* Work page copy (bX v2 - Projects.dc.html). Projects live in content/projects.ts. */
import type { ContactBandContent } from "@/lib/schemas/content";

export const workPage = {
  hero: {
    eyebrow: "Work",
    title: "Work we deliver and keep running",
    intro:
      "AI, software, data and cloud systems we designed, built and still support. Client names stay under NDA, so each project is shown by its sector and what it does today.",
  },
  projects: {
    eyebrow: "All projects",
    title: "What we have built",
  },
  support: {
    eyebrow: "After launch",
    title: "We stay after launch",
    intro:
      "A delivered project is not a finished relationship. Where a client wants us to stay, we run the system; where they want to take it in-house, we hand it over properly.",
    items: [
      {
        number: "01",
        title: "Support and monitoring",
        text: "On-call cover, alerting we tuned ourselves, and a monthly report on what the system did and what needs attention next.",
      },
      {
        number: "02",
        title: "Continuous change",
        text: "Small monthly change budgets rather than annual re-platforming, so your systems keep improving in safe, reviewable steps.",
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
    title: "Discuss your project with our engineers",
    text: "A 30-minute call with the engineers who built these systems, about your goals, the right architecture and how we would approach it.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
