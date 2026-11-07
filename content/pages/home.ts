/*
 * Home page copy (bX v2 - Home.dc.html). Collections (services, projects, client logos)
 * come from their own files; this holds the page's own sections.
 */
import type { HeroDiagram } from "@/lib/schemas/content";

export const homePage = {
  hero: {
    eyebrow: "AI-first engineering partner",
    title: "We put AI agents into production software that already works.",
    intro:
      "Custom software, web and mobile systems, cloud platforms, and the agentic and generative AI layers that run on top of them. We design, build and operate all of it.",
    tags: ["Agentic AI", "Cloud", "Custom software"],
    primaryCta: { label: "Book a technical call", href: "#contact" },
    secondaryCta: { label: "See the work", href: "#work" },
    metrics: [
      { value: "68%", label: "faster claims triage", placeholder: true },
      { value: "3.2×", label: "more online bookings", placeholder: true },
      { value: "9 hrs", label: "saved weekly on tenders", placeholder: true },
    ],
    diagram: {
      caption: "How we build agents",
      entry: { t: "Channel", d: "web · WhatsApp · email" },
      core: { t: "Orchestrator", d: "planner · router" },
      support: [
        { t: "Retrieval", d: "vector + SQL" },
        { t: "Tools", d: "ERP · CRM" },
        { t: "Guardrails", d: "policy · PII" },
      ],
      outcomes: [{ t: "Eval & observability", d: "traces · regressions · cost" }],
      status: { t: "Deployed & monitored", d: "142 evals passing", detailTone: "status" },
    } satisfies HeroDiagram,
    footnote: "Delivering from Islamabad to clients in Germany, the UK and the Gulf",
  },
  clients: { label: "Clients & partners" },
  services: {
    eyebrow: "Services",
    title: "Four groups, one delivery team",
    aside:
      "The AI work is built by the same engineers who maintain the systems it plugs into. Client names are withheld under NDA; sector and scale are not.",
    allLink: { label: "All services", href: "/services" },
    footnote: "Each group has delivered, running systems behind it",
  },
  work: {
    eyebrow: "Selected work",
    title: "Systems in production, with numbers attached",
    allLink: { label: "All projects", href: "/work" },
  },
  delivered: {
    label: "Delivered",
    sublabel: "measured, not claimed",
    metrics: [
      { value: "94%", label: "on-time delivery", placeholder: true },
      { value: "8/10", label: "clients retained past first project", placeholder: true },
      { value: "81%", label: "automated test coverage", placeholder: true },
      { value: "4", label: "countries served", placeholder: true },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "Six stages, and you sign off each one",
    aside:
      "The process that has carried every delivery we have made. Unchanged for AI work: an agent in production needs the same discipline as a payments system.",
    steps: [
      {
        num: "01",
        title: "Requirements",
        text: "Our requirements engineers work through your goals and business domain before anyone estimates anything.",
        chips: ["Workshops", "Domain model"],
      },
      {
        num: "02",
        title: "Proposal",
        text: "Scope, approach, team shape and price, including the options we rejected and why.",
        chips: ["Fixed or team", "Estimate"],
      },
      {
        num: "03",
        title: "UX & architecture",
        text: "Mock-ups and a reference architecture you sign off before build starts.",
        chips: ["Prototypes", "ADRs"],
      },
      {
        num: "04",
        title: "Build",
        text: "Two-week iterations, unit tests at commit level, your board and your repo.",
        chips: ["Your repo", "Fortnightly demo"],
      },
      {
        num: "05",
        title: "Test & evaluate",
        text: "Functional, performance and security testing. For AI work, evaluation suites and cost tracking before rollout.",
        chips: ["Eval harness", "Load & security"],
      },
      {
        num: "06",
        title: "Deploy & operate",
        text: "Your cloud or ours, with monitoring, handover documentation and an agreed support window.",
        chips: ["Runbooks", "Support SLA"],
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    title: "Where we already know the domain",
    allLink: { label: "All industries", href: "/industries" },
    tiles: [
      { title: "Fintech", text: "Payments, settlement, KYC" },
      { title: "Healthcare", text: "Patient records, scheduling" },
      { title: "eCommerce", text: "Catalogue, fulfilment, support" },
      { title: "Telecom", text: "Provisioning, infotainment QA" },
      { title: "Facilities & services", text: "Booking, dispatch, operations" },
    ],
  },
  insights: {
    eyebrow: "Insights",
    title: "What our engineers are working out",
    allLink: { label: "All insights", href: "/insights" },
    /*
     * The Home design lists three titles that do not appear on the Insights page.
     * Kept verbatim; decide in T30 whether Home should list the latest real articles instead.
     */
    rows: [
      {
        topic: "Agents",
        title: "How we evaluate an agent before it touches a customer",
        text: "The regression suite, the cost ceiling and the three failure modes we test for every time.",
        readMinutes: 8,
      },
      {
        topic: "Cloud",
        title: "Cutting a client's AWS bill 41% without touching the product",
        text: "Where the money actually goes, and the four changes that moved the number.",
        readMinutes: 6,
      },
      {
        topic: "Delivery",
        title: "Why our AI projects use the same process as our payment systems",
        text: "Requirements, sign-off, tests, handover. Nothing about agents changes the discipline.",
        readMinutes: 5,
      },
    ],
  },
  contact: {
    eyebrow: "Start a project",
    title: "Tell us what is slow, manual or breaking.",
    text: "A 30-minute call with the engineers who would do the work, not a sales team. You leave with an approach and a rough shape of cost, whether or not you hire us.",
    location: "Islamabad, Pakistan · working with clients across CET and GMT",
    form: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Work email", placeholder: "you@company.com" },
      message: {
        label: "What are you trying to build or fix?",
        placeholder: "A sentence or two is plenty",
      },
      stage: {
        legend: "Where are you starting from?",
        options: ["An idea", "Existing system", "Team gap"],
      },
      submit: "Request a technical call",
      success: "Received. An engineer will reply within one working day.",
      note: "We reply within one working day. No mailing list.",
    },
  },
};
