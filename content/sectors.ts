/*
 * Sectors with delivered work (Industries page "Sectors with work behind them").
 * Revised 2026-11-07 with the owner: only sectors BX has delivered in; no figures and no region
 * tags (most work is under NDA, stated once on the page). `services` are service slugs from
 * content/services.ts, shown as "Services we bring" links (validated in lib/content tests).
 */
import type { SectorInput } from "@/lib/schemas/content";

export const sectors: SectorInput[] = [
  {
    slug: "fintech",
    name: "Fintech",
    body: "Payment integrations, settlement flows and blockchain systems where the review matters as much as the build. Anything touching money is security-reviewed before it goes live.",
    chips: ["Payments", "Settlement", "Smart contracts", "Security review"],
    services: ["blockchain", "custom-software", "cloud-infrastructure"],
  },
  {
    slug: "telecom",
    name: "Telecom",
    body: "Systems and test automation for telecom and connected-device products, built inside the client's own pipeline and release process, with full traceability.",
    chips: ["Test automation", "API testing", "Performance", "Embedded squads"],
    services: ["qa-testing", "cloud-infrastructure", "devops-ci-cd"],
  },
  {
    slug: "saas-mvp",
    name: "SaaS and MVP builds",
    body: "The smallest build that proves the idea, shipped to real users, then the architecture, billing and cloud setup that let a SaaS product grow without a rewrite later on.",
    chips: ["MVP build", "Multi-tenant SaaS", "Billing", "Product analytics"],
    services: ["custom-software", "web-development", "cloud-infrastructure"],
  },
  {
    slug: "ecommerce",
    name: "eCommerce",
    body: "Online stores, payment and inventory integrations, and the dashboards small retailers run on, kept fast, secure and simple enough for their own team to update every day.",
    chips: ["Online stores", "Payments", "Inventory sync", "Dashboards"],
    services: ["web-development", "mobile-development", "custom-software"],
  },
  {
    slug: "education",
    name: "Education",
    body: "Student portals and AI assistants that answer from policy rather than from memory. Every answer cites the source it came from, and anything outside it goes to a person.",
    chips: ["Student portals", "RAG assistants", "Escalation design"],
    services: ["generative-ai", "ai-agent-development", "mobile-development"],
  },
  {
    slug: "construction-facilities",
    name: "Construction & facilities",
    body: "Bid teams and service operations moving off phone calls and spreadsheets. Tender documents become a compliance matrix, and scheduling and invoicing run on one system.",
    chips: ["Document agents", "Scheduling", "Dispatch", "Customer portals"],
    services: ["ai-agent-development", "custom-software", "digital-transformation"],
  },
];
