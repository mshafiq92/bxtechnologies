/* Industries page copy (bX v2 - Industries.dc.html). Sectors live in content/sectors.ts. */
import type { ContactBandContent } from "@/lib/schemas/content";

export const industriesPage = {
  hero: {
    eyebrow: "Industries",
    title: "Domain knowledge we already paid for.",
    intro: [
      "We build for startups, growing businesses and enterprise programmes alike. There are industries where we have learned the constraints the expensive way (the regulation, the legacy system, the failure mode nobody documents) and those are the ones listed here.",
      "If your sector is not on this page, it usually means the engineering problem transfers anyway. Say what you are building and we will tell you honestly whether we have seen it before.",
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
      "The engineering is the same. What changes is the budget shape, the pace and how much process sits around the work.",
    items: [
      {
        kicker: "Startups",
        title: "From idea to something users can break",
        text: "A working product rather than a prototype deck: the smallest build that proves the idea, shipped to real users, with the architecture kept simple enough to change when they tell you something you did not expect.",
        items: ["MVP build", "Fractional CTO", "Investor-ready demos", "Fixed-scope sprints"],
      },
      {
        kicker: "Small & mid-sized businesses",
        title: "Digitising the process the business already runs",
        text: "Spreadsheets, email threads and phone calls turned into one system people will actually use. We start with the process that costs the most hours, not the one that demos best, and hand over documentation your own team can work from.",
        items: ["Process digitisation", "Internal tools", "Integrations", "Cloud migration"],
      },
      {
        kicker: "Enterprise & partners",
        title: "A squad inside an existing programme",
        text: "Engineers who work your sprints, your repository and your release process, on CET overlap, plus the audit, traceability and security review that a regulated programme needs before anything reaches production.",
        items: ["Dedicated teams", "Legacy migration", "QA at scale", "Compliance work"],
      },
    ],
  },
  sectors: {
    eyebrow: "Where we have delivered",
    title: "Sectors with work behind them",
    // Design note addressed to bX; replace before launch once figures are signed off.
    note: "Client names are withheld under NDA. Figures are placeholders pending your sign-off; sectors and regions are accurate.",
  },
  constraints: {
    eyebrow: "Constraints we plan for",
    title: "What regulated sectors change about a build",
    intro:
      "These come up in the first week on insurance, automotive and fintech work. Planning for them at the start is cheaper than retrofitting them at the audit.",
    items: [
      {
        number: "01",
        title: "Explainability",
        text: "Every automated decision keeps the inputs, the rule or model version and the reason, in a form a reviewer can read.",
      },
      {
        number: "02",
        title: "Data residency",
        text: "EU-region processing where required, with a stated position on which models and vendors ever see client data.",
      },
      {
        number: "03",
        title: "A human in the path",
        text: "Confidence thresholds and escalation routes designed with the team who will handle the escalations.",
      },
      {
        number: "04",
        title: "Shadow running",
        text: "New automation runs alongside the existing process, measured against it, before it is allowed to act.",
      },
    ],
  },
  other: {
    eyebrow: "Other sectors",
    title: "Not listed here does not mean not for us",
    intro:
      "Most of what we do transfers: a document-heavy intake process looks much the same in insurance as in construction bidding. We will tell you plainly whether we have done your problem before or would be learning it on your budget.",
    cta: { label: "Ask about your sector", href: "#contact" },
    sectors: [
      "SaaS",
      "Healthcare",
      "Manufacturing",
      "Wellness",
      "Public sector",
      "Professional services",
      "Real estate",
      "Telecom",
      "Media",
    ],
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Tell us the sector and the constraint",
    text: "Thirty minutes with the engineers who did the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
