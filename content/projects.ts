/*
 * Delivered projects (Work page and Home "Selected work").
 * Copy from bX v2 - Projects.dc.html, revised with the owner (2026-11-10): no figures, and the sector
 * line reads "Sector · NDA" (no region). `result` says in words what the project changed.
 * The owner will supply the final real projects before production; these stand in until then.
 */
import type { ProjectInput } from "@/lib/schemas/content";

export const projects: ProjectInput[] = [
  {
    slug: "booking-operations-platform",
    tag: "Web & mobile",
    sector: "Facilities · NDA",
    title: "Booking and operations platform",
    description:
      "Replaced phone-and-spreadsheet scheduling with one system covering booking, dispatch, invoicing and a customer portal.",
    result: "Bookings, dispatch and invoicing now run in one system.",
    stack: ["React", "Node.js", "Postgres"],
    home: true,
  },
  {
    slug: "cloud-migration-cicd",
    tag: "Cloud & DevOps",
    sector: "SaaS · NDA",
    title: "Cloud migration and CI/CD rebuild",
    description:
      "Moved a SaaS platform onto managed services, with pipelines, infrastructure as code and per-environment cost reporting.",
    result: "Releases are automated and cloud spend is visible per environment.",
    stack: ["AWS", "Kubernetes", "Terraform"],
    home: true,
  },
  {
    slug: "tender-drafting-assistant",
    tag: "Agentic AI",
    sector: "Construction · NDA",
    title: "Tender drafting assistant",
    description:
      "Reads tender documents, builds a compliance matrix and drafts the standard response sections for a bid team to edit.",
    result: "The bid team starts every response from a ready draft.",
    stack: ["Python", "RAG", "pgvector"],
    home: true,
  },
  {
    slug: "infotainment-validation-suite",
    tag: "QA engineering",
    sector: "Automotive · NDA",
    title: "Infotainment validation suite",
    description:
      "Automated regression and performance testing inside the client's release process, run alongside our German partner.",
    result: "Regression testing runs automatically on every build.",
    stack: ["Appium", "Python", "Jenkins"],
  },
  {
    slug: "admissions-assistant",
    tag: "Generative AI",
    sector: "Education · NDA",
    title: "Admissions assistant",
    description:
      "Answers student questions from the handbook with the source section cited, and escalates anything outside it to a person.",
    result: "Students get cited answers at any hour, and a person handles the rest.",
    stack: ["RAG", "Python", "Azure OpenAI"],
  },
  {
    slug: "demand-forecasting-pipeline",
    tag: "Data & cloud",
    sector: "Retail · NDA",
    title: "Demand forecasting pipeline",
    description:
      "Forecasts stock movement per store on a nightly pipeline, with the master data reconciled across three source systems first.",
    result: "Every store's stock is forecast nightly from reconciled data.",
    stack: ["Python", "Airflow", "MLflow"],
  },
  {
    slug: "settlement-contracts-indexer",
    tag: "Blockchain",
    sector: "Fintech · NDA",
    title: "Settlement contracts and indexer",
    description:
      "Settlement flow contracts with an off-chain indexer and reporting, independently audited twice before launch.",
    result: "The contracts went live only after independent security audits.",
    stack: ["Solidity", "Node.js", "Postgres"],
  },
  // PLACEHOLDER: dummy project until the owner supplies the real list.
  {
    slug: "online-store-inventory-sync",
    tag: "Web & mobile",
    sector: "eCommerce · NDA",
    title: "Online store and inventory sync",
    description:
      "An online store with payment and inventory integrations, and dashboards the client's own team updates every day.",
    result: "Orders, stock and payments stay in sync across every channel.",
    stack: ["React", "Node.js", "MySQL"],
  },
  // PLACEHOLDER: dummy project until the owner supplies the real list.
  {
    slug: "provisioning-test-automation",
    tag: "QA engineering",
    sector: "Telecom · NDA",
    title: "Provisioning test automation",
    description:
      "API and performance test suites built inside the client's pipeline, covering provisioning flows from order to activation.",
    result: "Every release is tested against the provisioning flows before it ships.",
    stack: ["Python", "Postman", "Jenkins"],
  },
];
