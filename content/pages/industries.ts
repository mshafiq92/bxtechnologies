/*
 * Industries page copy (bX v2 - Industries.dc.html). Sectors live in content/sectors.ts.
 * Revised 2026-11-07 with the owner: only sectors BX has delivered in, no invented figures, no
 * region tags, NDA stated plainly, AI-first wording, equal text lengths.
 */
import type { ContactBandContent } from "@/lib/schemas/content";

export const industriesPage = {
  hero: {
    eyebrow: "Industries",
    title: "Industries we know from the inside",
    intro: [
      "We build AI, software, cloud and data systems for startups, growing businesses and enterprises across the sectors below. Most of our work is delivered under non-disclosure agreements, so we describe the problem and the approach, never the client.",
      "If your sector is not listed, the engineering problem usually transfers. Tell us what you are building and we will say honestly whether we have solved it before.",
    ],
    primaryCta: { label: "Ask about your sector", href: "#contact" },
    secondaryCta: { label: "Browse sectors", href: "#sectors" },
  },
  jumpLinks: [
    { href: "#clients", label: "Who we work with" },
    { href: "#sectors", label: "Sectors" },
    { href: "#constraints", label: "Constraints we plan for" },
    { href: "#other", label: "Other sectors" },
    { href: "#contact", label: "Start a project" },
  ],
  clients: {
    eyebrow: "Who we work with",
    title: "Startups, growing businesses, and enterprise teams",
    intro:
      "The engineering is the same. What changes is the budget, the pace and how much process sits around the work.",
    items: [
      {
        kicker: "Startups",
        title: "From idea to launch",
        text: "A working product rather than a prototype deck: the smallest build that proves the idea, with AI where it adds value, shipped to real users on an architecture that can grow.",
        items: [
          "MVP and prototype builds",
          "AI-powered features",
          "Fractional CTO",
          "Fixed-scope sprints",
        ],
      },
      {
        kicker: "Small & mid-sized businesses",
        title: "Smarter operations",
        text: "Spreadsheets, email threads and phone calls turned into one system people actually use, with automation and AI agents taking over the repetitive work your team does every day.",
        items: [
          "Process automation",
          "AI agents for operations",
          "Internal tools and integrations",
          "Cloud migration and managed IT",
        ],
      },
      {
        kicker: "Enterprise & partners",
        title: "Embedded engineering",
        text: "Senior engineers who join your sprints, repository and release process, bringing the audit trail, security review and traceability a regulated programme needs before release.",
        items: [
          "Dedicated teams",
          "AI and machine learning at scale",
          "Legacy modernisation",
          "QA, security and compliance",
        ],
      },
    ],
  },
  sectors: {
    eyebrow: "Where we have delivered",
    title: "Sectors with work behind them",
    note: "Client names and figures are confidential. Most of our engagements are under NDA; we are happy to share references and case details privately once one is in place.",
    ndaLabel: "Under NDA",
    servicesLabel: "Services we bring",
  },
  constraints: {
    eyebrow: "Constraints we plan for",
    title: "What regulated sectors change about a build",
    intro:
      "When AI and automation enter a regulated process, these come up in the first week. Planning for them at the start is cheaper than retrofitting them at the audit.",
    items: [
      {
        number: "01",
        title: "Explainability",
        text: "Every automated decision keeps its inputs, the rule or model version and the reason, in a form a reviewer can read.",
      },
      {
        number: "02",
        title: "Data protection",
        text: "Encrypted, access-controlled data kept in the client's chosen region, with a clear list of the models and vendors that see it.",
      },
      {
        number: "03",
        title: "Human oversight",
        text: "Confidence thresholds and escalation routes, designed together with the team who will handle the escalations in practice.",
      },
      {
        number: "04",
        title: "Shadow running",
        text: "New automation runs alongside the existing process and is measured against it before it is allowed to act on its own.",
      },
    ],
  },
  other: {
    eyebrow: "Other sectors",
    title: "Don't see your sector?",
    intro:
      "Most of what we build transfers between industries: an AI assistant that answers from internal documents works much the same in healthcare as in professional services. We will tell you plainly whether we have solved your problem before.",
    cta: { label: "Ask about your sector", href: "#contact" },
    sectors: [
      "Healthcare",
      "Professional services",
      "Real estate",
      "Public sector",
      "Media",
      "Cybersecurity",
      "Manufacturing",
      "Wellness",
    ],
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Tell us the sector and the constraint",
    text: "Thirty minutes with the engineers who would do the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
