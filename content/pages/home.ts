/*
 * Home page copy (bX v2 - Home.dc.html). Collections (services, projects, client logos)
 * come from their own files; this holds the page's own sections.
 */
import type { HeroDiagram, ServiceGroup } from "@/lib/schemas/content";

export const homePage = {
  hero: {
    eyebrow: "AI-first engineering partner",
    title: "We put AI agents into production software that already works.",
    intro:
      "AI agents, data platforms, cloud and custom software, with managed IT behind them. We design, build and operate all of it.",
    tags: ["Agentic AI", "Cloud & DevOps", "Custom software"],
    primaryCta: { label: "Book a technical call", href: "#contact" },
    secondaryCta: { label: "See the work", href: "#work" },
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
    slider: {
      label: "Highlights",
      pause: "Pause the slider",
      play: "Play the slider",
      firstSlide: "AI agents",
    },
    allServices: {
      label: "All services",
      eyebrow: "AI · Data · Cloud · Managed IT",
      title: "Engineering for AI that runs in production.",
      intro:
        "We design, build and operate AI, data and cloud systems, from the first architecture review to day to day operations.",
      tags: ["Managed IT", "Data & Analytics", "Product & Quality"],
      primaryCta: { label: "Book a technical call", href: "#contact" },
      secondaryCta: { label: "See how we work", href: "#process" },
      caption: "What we build and run",
      // Tags per group in the panel (a group without tags is not a layer).
      // Names and links come from content/services.ts.
      layers: {
        ai: ["Agents", "Gen AI", "AI/ML", "MLOps"],
        data: ["Engineering", "Pipelines", "Analytics"],
        cloud: ["Deployment", "Migration", "Monitoring"],
        managed: ["Device support", "Field engineering", "Technical support"],
      } as Partial<Record<ServiceGroup["key"], string[]>>,
      // The band beside the layers: this group touches all of them.
      side: ["Custom software", "Web and mobile", "QA", "Cybersecurity"],
    },
  },
  clients: { label: "Clients & partners" },
  services: {
    eyebrow: "Services",
    title: "AI, data and cloud engineering",
    aside:
      "We design, build and operate the systems your business depends on, from AI agents to secure cloud platforms and custom software.",
    allLink: { label: "All services", href: "/services" },
  },
  work: {
    eyebrow: "Selected work",
    title: "Systems in production, with numbers attached",
    allLink: { label: "All projects", href: "/work" },
  },
  delivered: {
    label: "Track record",
    metrics: [
      { value: "80+", label: "projects delivered" },
      { value: "50+", label: "clients" },
      { value: "20+", label: "team members" },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "You sign off every stage",
    aside:
      "One process from first workshop to live support. AI work follows it too: an agent in production needs the same discipline as a payments system.",
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
        chips: ["Prototypes", "Design records"],
      },
      {
        num: "04",
        title: "Build",
        text: "Two-week iterations, unit tests on every commit, and full visibility in your own tools.",
        chips: ["Your repo", "Fortnightly demo"],
      },
      {
        num: "05",
        title: "Test & evaluate",
        text: "Functional, performance and security testing. For AI work, evaluation suites and cost tracking before rollout.",
        chips: ["AI evaluation", "Load & security"],
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
      { title: "Telecom", text: "Provisioning, test automation" },
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
