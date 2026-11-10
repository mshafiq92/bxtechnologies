/*
 * Service group pages (/services/<slug>): one page per group that drills down into its services.
 * Owner decision 2026-11-10: group pages replace the single-service detail pages. The services
 * shown on a page (name, description, what's included, stack) come from content/services.ts;
 * this file holds the page's own sections. No figures on these pages (owner decision).
 * DRAFT: copy written 2026-11-10 for owner review; Cloud & DevOps reviewed and kept.
 */
import type { ContactBandContent, GroupPageInput } from "@/lib/schemas/content";

import { agenticAiDetail, cloudDevopsDetail, customSoftwareDetail } from "./service-details";

const band = (title: string, text: string): ContactBandContent => ({
  eyebrow: "Start a project",
  title,
  text,
  cta: "Book a technical call",
  ctaHref: "/contact",
  secondary: "All services",
  secondaryHref: "/services",
  secondaryArrow: true,
});

export const groupPages: GroupPageInput[] = [
  // DRAFT: AI & Autonomy.
  {
    group: "ai",
    slug: "ai-autonomy",
    eyebrow: "AI & Autonomy",
    title: "AI that works inside the systems you already run",
    intro:
      "Agents, generative AI, machine learning and MLOps, tested against your own cases and wired into your ERP, CRM and data with guardrails.",
    primaryCta: "Book a technical call",
    heroDiagram: agenticAiDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro:
        "Each service can start on its own. Most clients begin with one workflow and a short pilot, then add more once the results hold up.",
    },
    architecture: agenticAiDetail.architecture,
    engagement: agenticAiDetail.engagement,
    fit: agenticAiDetail.fit,
    projects: {
      title: "AI work in production",
      slugs: ["tender-drafting-assistant", "admissions-assistant"],
    },
    faq: agenticAiDetail.faq,
    contactBand: band(
      "Discuss your AI use case with our engineers",
      "A 30-minute call about the workflow you have in mind, the data behind it and how we would test whether AI helps.",
    ),
  },

  // DRAFT: Data & Analytics.
  {
    group: "data",
    slug: "data-analytics",
    eyebrow: "Data & Analytics",
    title: "Data your reports and AI can rely on",
    intro:
      "Data engineering, pipelines, analytics and IoT data, built so every number traces back to its source and arrives on time.",
    primaryCta: "Book a technical call",
    heroDiagram: {
      caption: "From source systems to decisions",
      entry: { t: "Source systems", d: "ERP · CRM · devices" },
      core: { t: "Pipelines", d: "ingest · test · schedule" },
      support: [
        { t: "Warehouse", d: "modelled · documented" },
        { t: "Quality checks", d: "on every run" },
      ],
      outcomes: [
        { t: "Dashboards", d: "agreed metrics" },
        { t: "AI and ML", d: "clean features" },
      ],
      status: { t: "Monitored on every run", d: "freshness · tests · alerts" },
    },
    deliver: {
      title: "What we deliver",
      intro:
        "We start with the area where the numbers disagree most, then extend one source at a time.",
    },
    engagement: {
      eyebrow: "The engagement",
      jumpLabel: "The engagement",
      title: "Start with one report people trust",
      intro:
        "We fix the data underneath one important report first, then extend. You own the pipelines, models and definitions in your own repository.",
      cta: "Book a technical call",
      steps: [
        {
          label: "FIRST",
          title: "Map the sources",
          text: "Which systems hold the data, who owns each definition, and where the numbers disagree today.",
        },
        {
          label: "THEN",
          title: "Build the first pipeline",
          text: "Ingestion, modelling and quality tests for one reporting area, running on a schedule.",
        },
        {
          label: "NEXT",
          title: "Extend area by area",
          text: "More sources and reports, each with tests and agreed definitions before it goes live.",
        },
        {
          label: "AFTER",
          title: "Operate or hand over",
          text: "We monitor freshness and failed runs, or your team takes over with the documentation.",
        },
      ],
    },
    fit: {
      title: "When it is worth calling us",
      intro: "Usually the same report is being rebuilt by hand, and nobody fully trusts it.",
      items: [
        {
          sector: "eCommerce",
          title: "Stock and sales disagree",
          text: "Reports from the store, the warehouse and finance that never quite match.",
        },
        {
          sector: "SaaS",
          title: "Month-end takes a week",
          text: "Reporting assembled by hand from exports, every month, by the same few people.",
        },
        {
          sector: "Fintech",
          title: "Figures you must be able to prove",
          text: "Numbers that auditors and regulators need traced back to their source.",
        },
      ],
    },
    projects: {
      title: "Data work in production",
      slugs: ["demand-forecasting-pipeline", "online-store-inventory-sync"],
    },
    faq: {
      title: "The ones buyers actually ask",
      intro: "If yours is not here, put it in the first call.",
      items: [
        {
          q: "Which tools do you use?",
          a: "We work with SQL Server, MySQL, MongoDB and the warehouse and scheduling tools you already have. If you have none, we recommend a small, standard setup.",
        },
        {
          q: "Do we need a data warehouse first?",
          a: "Not always. We start from the reports that matter and build only the storage and pipelines they need.",
        },
        {
          q: "Who owns the pipelines and definitions?",
          a: "You do. Code, metric definitions and documentation live in your repository.",
        },
        {
          q: "Can you connect device and IoT data?",
          a: "Yes. Device telemetry is collected through message brokers into time-series storage, with alerting and dashboards on top.",
        },
      ],
    },
    contactBand: band(
      "Discuss your data with our engineers",
      "A 30-minute call about the reports you rely on, where the numbers disagree and how we would approach it.",
    ),
  },

  // Cloud & DevOps (reviewed by the owner 2026-11-10).
  {
    group: "cloud",
    slug: "cloud-devops",
    eyebrow: "Cloud & DevOps",
    title: "Cloud platforms your team can change with confidence",
    intro:
      "Deployment, migration, monitoring and CI/CD on AWS and Azure, written as code in your own account and handed over with the runbooks.",
    primaryCta: "Book a technical call",
    heroDiagram: cloudDevopsDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro:
        "Each service stands on its own. Together they give you a platform where a deploy is routine and the monthly bill is explainable.",
    },
    architecture: cloudDevopsDetail.architecture,
    engagement: cloudDevopsDetail.engagement,
    fit: cloudDevopsDetail.fit,
    projects: {
      title: "Cloud work in production",
      slugs: ["cloud-migration-cicd", "demand-forecasting-pipeline"],
    },
    faq: cloudDevopsDetail.faq,
    contactBand: band(
      "Discuss your cloud platform with our engineers",
      "A 30-minute call about your current setup, where it costs you time or money, and how we would approach it.",
    ),
  },

  // DRAFT: Managed IT. CONFIRM: on-site coverage; no country or region is named here.
  {
    group: "managed",
    slug: "managed-it",
    eyebrow: "Managed IT",
    title: "IT support that keeps your people working",
    intro:
      "Device support, field engineering, technical support and network troubleshooting, with same or next business day response.",
    primaryCta: "Book a technical call",
    heroDiagram: {
      caption: "One support desk, on site when needed",
      entry: { t: "Request", d: "phone · email · portal" },
      core: { t: "Service desk", d: "L1 · triage" },
      support: [
        { t: "L2 and L3", d: "specialist fix" },
        { t: "Field engineer", d: "on-site visit" },
      ],
      outcomes: [
        { t: "Resolved", d: "documented" },
        { t: "Asset records", d: "updated" },
      ],
      status: { t: "Tracked to resolution", d: "same or next business day" },
    },
    deliver: {
      title: "What we deliver",
      intro: "Each service can be agreed on its own or combined into one support agreement.",
    },
    engagement: {
      eyebrow: "The engagement",
      jumpLabel: "The engagement",
      title: "Agree the scope, then we respond",
      intro:
        "Coverage, response times and on-site visits are agreed up front, so every request has a clear owner.",
      cta: "Book a technical call",
      steps: [
        {
          label: "ONBOARD",
          title: "Record your estate",
          text: "Devices, sites and contacts recorded, with response times agreed for each type of request.",
        },
        {
          label: "RESPOND",
          title: "Triage and resolve",
          text: "Requests handled at L1 and escalated to L2 and L3 engineers when needed, the same or next business day.",
        },
        {
          label: "ON SITE",
          title: "Visit when needed",
          text: "Half-day and full-day visits for installations, swaps and repairs that cannot be done remotely.",
        },
        {
          label: "REPORT",
          title: "Show what was done",
          text: "Reporting on requests, response times and assets, so you can see every resolution.",
        },
      ],
    },
    fit: {
      title: "When it is worth calling us",
      intro:
        "Usually there is no one on site when equipment fails, or the in-house team is stretched.",
      items: [
        {
          sector: "Facilities",
          title: "Sites without IT staff",
          text: "Locations where someone has to be on site when equipment or the network fails.",
        },
        {
          sector: "Education",
          title: "Devices across buildings",
          text: "Laptops, printers and network equipment spread over several buildings or campuses.",
        },
        {
          sector: "Professional services",
          title: "A team that cannot stop",
          text: "Offices where a broken laptop or a network outage means lost client hours.",
        },
      ],
    },
    faq: {
      title: "The ones buyers actually ask",
      intro: "If yours is not here, put it in the first call.",
      items: [
        {
          q: "Can you send someone on site?",
          a: "Yes, for half-day and full-day visits. Coverage depends on the location, and we confirm it before work starts.",
        },
        {
          q: "How quickly do you respond?",
          a: "The same business day or the next business day, depending on the level of service you choose.",
        },
        {
          q: "Which equipment do you support?",
          a: "Laptops, desktops, servers, printers, network devices and storage, including Wi-Fi surveys with Ekahau and AirMagnet tools.",
        },
        {
          q: "Do you keep track of our assets?",
          a: "Yes. Asset tagging and inventory checks are part of the service, and records are updated after every visit.",
        },
      ],
    },
    contactBand: band(
      "Discuss your IT support with our team",
      "A 30-minute call about your sites, devices and the support your people need.",
    ),
  },

  // DRAFT: Product & Quality.
  {
    group: "product",
    slug: "product-quality",
    eyebrow: "Product & Quality",
    title: "Software built to last and to be handed over",
    intro:
      "Custom software, web and mobile apps, testing and security, built with the documentation and tests your own team needs to take it on.",
    primaryCta: "Book a technical call",
    heroDiagram: customSoftwareDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro: "From the first build to testing and security review, delivered by the same team.",
    },
    architecture: customSoftwareDetail.architecture,
    engagement: customSoftwareDetail.engagement,
    fit: customSoftwareDetail.fit,
    projects: {
      title: "Software in production",
      slugs: [
        "booking-operations-platform",
        "online-store-inventory-sync",
        "provisioning-test-automation",
      ],
    },
    faq: customSoftwareDetail.faq,
    contactBand: band(
      "Discuss your software project with our engineers",
      "A 30-minute call about what you need to build or fix, and how we would approach it.",
    ),
  },

  // DRAFT: Teams & Advisory.
  {
    group: "teams",
    slug: "teams-advisory",
    eyebrow: "Teams & Advisory",
    title: "Engineers and advisers when you need them",
    intro:
      "Dedicated teams, digital transformation, project management and blockchain specialists, working in your process with one accountable lead.",
    primaryCta: "Book a technical call",
    heroDiagram: {
      caption: "Your team, extended",
      entry: { t: "Your roadmap", d: "backlog · priorities" },
      core: { t: "Named engineers", d: "your process · your tools" },
      support: [
        { t: "Project lead", d: "plan · report" },
        { t: "Specialists", d: "when needed" },
      ],
      outcomes: [
        { t: "Releases", d: "in your repository" },
        { t: "Handover", d: "documented" },
      ],
      status: { t: "Scaled month by month", d: "no hiring overhead" },
    },
    deliver: {
      title: "What we deliver",
      intro: "Add capacity, direction or a specialist skill, for as long as the work needs it.",
    },
    engagement: {
      eyebrow: "The engagement",
      jumpLabel: "The engagement",
      title: "Choose, start, then scale",
      intro:
        "You choose the engineers and keep your process. We handle employment, equipment and cover.",
      cta: "Book a technical call",
      steps: [
        {
          label: "SELECT",
          title: "Interview and choose",
          text: "You interview the engineers and pick the ones who fit your team.",
        },
        {
          label: "START",
          title: "Join your process",
          text: "They join your standups, your board and your repository from the first week.",
        },
        {
          label: "SCALE",
          title: "Grow or reduce monthly",
          text: "Add or reduce people month by month as the roadmap changes.",
        },
        {
          label: "AFTER",
          title: "Hand over",
          text: "When the work is done, the documentation and access stay with you.",
        },
      ],
    },
    fit: {
      title: "When it is worth calling us",
      intro: "Usually the gap is capacity or direction rather than a defined build.",
      items: [
        {
          sector: "SaaS",
          title: "The roadmap outgrew the team",
          text: "More planned work than engineers, and hiring takes months.",
        },
        {
          sector: "Fintech",
          title: "A specialist skill for one programme",
          text: "Blockchain, security or data expertise needed for a project, not permanently.",
        },
        {
          sector: "Construction",
          title: "Moving off spreadsheets",
          text: "A transformation that needs planning and delivery from one accountable team.",
        },
      ],
    },
    projects: {
      title: "Team work in production",
      slugs: ["settlement-contracts-indexer", "infotainment-validation-suite"],
    },
    faq: {
      title: "The ones buyers actually ask",
      intro: "If yours is not here, put it in the first call.",
      items: [
        {
          q: "Can we interview the engineers?",
          a: "Yes. You interview and choose every engineer who joins your team.",
        },
        {
          q: "How soon can a team start?",
          a: "It depends on the skills you need. We agree a start date once you have chosen the engineers.",
        },
        {
          q: "Which hours do they work?",
          a: "An agreed overlap with your working day, so standups, reviews and questions happen in real time.",
        },
        {
          q: "Can you also run the project?",
          a: "Yes. A project manager can lead delivery, from planning and scope to reporting and release.",
        },
      ],
    },
    contactBand: band(
      "Discuss your team with our engineers",
      "A 30-minute call about the work ahead, the skills you need and how we would support you.",
    ),
  },
];
