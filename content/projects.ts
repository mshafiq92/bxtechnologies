/*
 * Delivered projects (Work page and Home "Selected work").
 * Copy verbatim from bX v2 - Projects.dc.html; the `home` lines from bX v2 - Home.dc.html.
 * No client names: every project reads "Sector · Region · NDA" (enforced by the schema).
 * All figures are placeholders pending bX sign-off (OPEN-DECISIONS #3).
 */
import type { ProjectInput } from "@/lib/schemas/content";

export const projects: ProjectInput[] = [
  {
    slug: "claims-triage-agent",
    tag: "Agentic AI",
    sector: "Insurance · EU · NDA",
    title: "Claims triage agent",
    description:
      "Classifies inbound first-notice-of-loss email, enriches it from the policy system and routes it to the right adjuster with the file already assembled.",
    metric: { value: "68%", label: "faster first response", placeholder: true },
    stack: ["LangGraph", "Node.js", "AWS"],
    home: {
      sector: "Insurance · EU · NDA",
      text: "faster first response on inbound claims after deploying a triage agent across email and portal intake.",
    },
  },
  {
    slug: "booking-operations-platform",
    tag: "Web & mobile",
    sector: "Facilities · DE · NDA",
    title: "Booking and operations platform",
    description:
      "Replaced phone-and-spreadsheet scheduling with one system covering booking, dispatch, invoicing and a customer portal.",
    metric: { value: "3.2×", label: "more online bookings", placeholder: true },
    stack: ["React", "Node.js", "Postgres"],
    home: {
      sector: "Facilities · Germany · NDA",
      text: "more online bookings for a German facilities-services firm after rebuilding booking and operations.",
    },
  },
  {
    slug: "cloud-migration-cicd",
    tag: "Cloud & DevOps",
    sector: "SaaS · APAC · NDA",
    title: "Cloud migration and CI/CD rebuild",
    description:
      "Moved a regional SaaS platform onto managed services, with pipelines, infrastructure as code and per-environment cost reporting.",
    metric: { value: "41%", label: "lower monthly spend", placeholder: true },
    stack: ["AWS", "Kubernetes", "Terraform"],
    home: {
      sector: "SaaS · NDA",
      text: "lower monthly cloud spend for a regional SaaS platform after migration and CI/CD rebuild.",
    },
  },
  {
    slug: "tender-drafting-assistant",
    tag: "Agentic AI",
    sector: "Construction · DE · NDA",
    title: "Tender drafting assistant",
    description:
      "Reads tender documents, builds a compliance matrix and drafts the standard response sections for a bid team to edit.",
    metric: { value: "9 hrs", label: "saved per tender response", placeholder: true },
    stack: ["Python", "RAG", "pgvector"],
  },
  {
    slug: "field-telemetry-platform",
    tag: "Data & cloud",
    sector: "Utilities · EU · NDA",
    title: "Field telemetry platform",
    description:
      "Ingests device telemetry into a time-series store with alerting rules tuned alongside the control room team.",
    metric: { value: "18k", label: "devices in one view", placeholder: true },
    stack: ["IoT", "TimescaleDB", "Grafana"],
  },
  {
    slug: "infotainment-validation-suite",
    tag: "QA engineering",
    sector: "Automotive · DE · NDA",
    title: "Infotainment validation suite",
    description:
      "Automated regression and performance testing inside the client's release process, run alongside our German partner.",
    metric: { value: "2,400", label: "automated cases per build", placeholder: true },
    stack: ["Appium", "Python", "Jenkins"],
  },
  {
    slug: "admissions-assistant",
    tag: "Generative AI",
    sector: "Education · PK · NDA",
    title: "Admissions assistant",
    description:
      "Answers student questions from the handbook with the source section cited, and escalates anything outside it to a person.",
    metric: { value: "24/7", label: "coverage without extra headcount", placeholder: true },
    stack: ["RAG", "Python", "Azure OpenAI"],
  },
  {
    slug: "demand-forecasting-pipeline",
    tag: "Data & cloud",
    sector: "Retail · APAC · NDA",
    title: "Demand forecasting pipeline",
    description:
      "Forecasts stock movement per store on a nightly pipeline, with the master data reconciled across three source systems first.",
    metric: { value: "31%", label: "fewer stockouts", placeholder: true },
    stack: ["Python", "Airflow", "MLflow"],
  },
  {
    slug: "settlement-contracts-indexer",
    tag: "Blockchain",
    sector: "Fintech · EU · NDA",
    title: "Settlement contracts and indexer",
    description:
      "Settlement flow contracts with an off-chain indexer and reporting, independently audited twice before launch.",
    metric: { value: "2", label: "independent audits before go-live", placeholder: true },
    stack: ["Solidity", "Node.js", "Postgres"],
  },
];
