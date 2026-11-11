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
  // DRAFT: AI Engineering.
  {
    group: "ai",
    slug: "ai-engineering",
    eyebrow: "AI Engineering",
    title: "AI that works inside the systems you already run",
    intro:
      "Agents, generative AI, chatbots, machine learning, computer vision and forecasting, tested against your own cases and wired into your systems with guardrails.",
    primaryCta: "Book a technical call",
    heroDiagram: agenticAiDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro:
        "Each service can start on its own. Most clients begin with one workflow and a short pilot, then add more once the results hold up.",
    },
    architecture: agenticAiDetail.architecture,
    engagement: agenticAiDetail.engagement,
    projects: {
      title: "AI work in production",
      slugs: ["tender-drafting-assistant", "admissions-assistant", "demand-forecasting-pipeline"],
    },
    faq: {
      title: "Common questions",
      items: [
        agenticAiDetail.faq.items[0]!,
        agenticAiDetail.faq.items[1]!,
        agenticAiDetail.faq.items[3]!,
        agenticAiDetail.faq.items[4]!,
      ],
    },
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
      "Data engineering, pipelines and BI, built so every number traces back to its source and arrives on time.",
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
    projects: {
      title: "Data work in production",
      slugs: ["demand-forecasting-pipeline", "online-store-inventory-sync"],
    },
    faq: {
      title: "Common questions",
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
          q: "Can you help us agree definitions and ownership?",
          a: "Yes. We agree who owns each data set and how each metric is defined, then write it down so every report uses the same rules.",
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
      "Infrastructure, migration, DevOps, managed cloud and MLOps on AWS and Azure, written as code in your own account and handed over with the runbooks.",
    primaryCta: "Book a technical call",
    heroDiagram: cloudDevopsDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro:
        "Each service stands on its own. Together they give you a platform where a deploy is routine and the monthly bill is explainable.",
    },
    architecture: cloudDevopsDetail.architecture,
    engagement: cloudDevopsDetail.engagement,
    projects: {
      title: "Cloud work in production",
      slugs: ["cloud-migration-cicd", "demand-forecasting-pipeline"],
    },
    faq: {
      title: "Common questions",
      items: [
        cloudDevopsDetail.faq.items[0]!,
        cloudDevopsDetail.faq.items[1]!,
        cloudDevopsDetail.faq.items[2]!,
        cloudDevopsDetail.faq.items[4]!,
      ],
    },
    contactBand: band(
      "Discuss your cloud platform with our engineers",
      "A 30-minute call about your current setup, where it costs you time or money, and how we would approach it.",
    ),
  },

  // DRAFT: Managed IT Services. CONFIRM: on-site coverage; no country or region is named here.
  {
    group: "managed",
    slug: "managed-it-services",
    eyebrow: "Managed IT Services",
    title: "IT support that keeps your people working",
    intro:
      "Service desk, device support, on-site IT support and network management, with same or next business day response.",
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
    faq: {
      title: "Common questions",
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

  // DRAFT: Software Engineering.
  {
    group: "software",
    slug: "software-engineering",
    eyebrow: "Software Engineering",
    title: "Software built to last and to be handed over",
    intro:
      "Custom software, web and mobile apps, IoT, testing and blockchain, built with the documentation and tests your own team needs to take it on.",
    primaryCta: "Book a technical call",
    heroDiagram: customSoftwareDetail.heroDiagram,
    deliver: {
      title: "What we deliver",
      intro:
        "From the first build to independent testing and release, each service can start on its own.",
    },
    architecture: customSoftwareDetail.architecture,
    engagement: customSoftwareDetail.engagement,
    projects: {
      title: "Software in production",
      slugs: [
        "booking-operations-platform",
        "online-store-inventory-sync",
        "provisioning-test-automation",
      ],
    },
    faq: {
      title: "Common questions",
      items: [
        customSoftwareDetail.faq.items[0]!,
        customSoftwareDetail.faq.items[1]!,
        customSoftwareDetail.faq.items[2]!,
        customSoftwareDetail.faq.items[3]!,
      ],
    },
    contactBand: band(
      "Discuss your software project with our engineers",
      "A 30-minute call about what you need to build or fix, and how we would approach it.",
    ),
  },

  // DRAFT: IT Consulting (new page copy 2026-11-11).
  {
    group: "consulting",
    slug: "it-consulting",
    eyebrow: "IT Consulting",
    title: "Advice from the engineers who deliver it",
    intro:
      "Digital transformation, project management and cybersecurity, from the first assessment and roadmap to the delivery that follows.",
    primaryCta: "Book a technical call",
    heroDiagram: {
      caption: "From assessment to delivery",
      entry: { t: "Current state", d: "systems · risks · costs" },
      core: { t: "Assessment", d: "review · prioritise" },
      support: [
        { t: "Security review", d: "findings · fixes" },
        { t: "Project lead", d: "plan · report" },
      ],
      outcomes: [
        { t: "Roadmap", d: "costed · sequenced" },
        { t: "Delivery", d: "one accountable lead" },
      ],
      status: { t: "Reviewed at every stage", d: "scope · risk · cost" },
    },
    deliver: {
      title: "What we deliver",
      intro:
        "Each service can start on its own, and every recommendation comes with a plan our engineers can deliver.",
    },
    engagement: {
      eyebrow: "The engagement",
      jumpLabel: "The engagement",
      title: "Assess, plan, then deliver",
      intro:
        "We start with a short assessment and end with a plan you can act on, whether or not we deliver it.",
      cta: "Book a technical call",
      steps: [
        {
          label: "ASSESS",
          title: "Review what you run",
          text: "Systems, costs, risks and the workflows that matter most, reviewed with your team.",
        },
        {
          label: "PLAN",
          title: "Agree the roadmap",
          text: "A costed, sequenced plan with priorities, owners and the first step defined.",
        },
        {
          label: "DELIVER",
          title: "Lead the work",
          text: "A project manager leads delivery, with scope, change control and progress reporting.",
        },
        {
          label: "REVIEW",
          title: "Check the results",
          text: "Progress is reviewed against the plan, and the roadmap is updated as you learn.",
        },
      ],
    },
    faq: {
      title: "Common questions",
      items: [
        {
          q: "Do we have to use you for delivery?",
          a: "No. The roadmap and findings are yours, and the plan is written so any capable team can follow it.",
        },
        {
          q: "What does a cybersecurity review cover?",
          a: "Vulnerability assessments, penetration testing and a review of code and infrastructure, with findings ranked and remediation guidance.",
        },
        {
          q: "Can you review our technology stack?",
          a: "Yes. Stack selection and review are part of digital transformation consulting, with a target architecture and a costed roadmap.",
        },
        {
          q: "Can you manage a project our own team builds?",
          a: "Yes. A project manager can lead planning, scope, reporting and release across your team and ours.",
        },
      ],
    },
    contactBand: band(
      "Discuss your plans with our engineers",
      "A 30-minute call about the decision in front of you, what we would review first and how we would approach it.",
    ),
  },
];
