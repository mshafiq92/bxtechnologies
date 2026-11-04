/*
 * Sectors with delivered work (Industries page "Sectors with work behind them").
 * Copy verbatim from bX v2 - Industries.dc.html. Figures are placeholders (OPEN-DECISIONS #3).
 */
import type { SectorInput } from "@/lib/schemas/content";

export const sectors: SectorInput[] = [
  {
    slug: "insurance",
    name: "Insurance",
    region: "EU · NDA",
    body: "Claims handling, first-notice-of-loss intake and document-heavy back-office work. The constraint is never the model. It is that a decision has to be explainable to a regulator and reversible by a human.",
    chips: ["Claims triage", "Document extraction", "Fraud signals", "Policy system integration"],
    metric: { value: "68%", label: "faster first response on triaged claims", placeholder: true },
  },
  {
    slug: "automotive",
    name: "Automotive",
    region: "DE · NDA",
    body: "Infotainment and connected-vehicle validation alongside a German partner, working inside the client's pipeline and release process rather than beside it. Long programmes, strict traceability, per-build rather than per-release testing.",
    chips: ["Test automation", "Performance", "API testing", "Embedded squads"],
    metric: { value: "2,400", label: "automated cases run per build", placeholder: true },
  },
  {
    slug: "utilities-energy",
    name: "Utilities & energy",
    region: "EU · NDA",
    body: "Field telemetry and reporting for operators who have to act on what they see. Alerting rules tuned with the control room, because an alert nobody trusts is worse than no alert.",
    chips: ["IoT ingestion", "Time-series", "Reporting", "Data quality"],
    metric: { value: "18k", label: "devices reporting into one view", placeholder: true },
  },
  {
    slug: "fintech",
    name: "Fintech",
    region: "EU · NDA",
    body: "Settlement flows, payment integrations and on-chain work where the review matters more than the build. Everything that touches money gets an independent audit before launch, including ours.",
    chips: ["Smart contracts", "Payments", "Indexing", "Security review"],
    metric: { value: "2", label: "independent audits before go-live", placeholder: true },
  },
  {
    slug: "retail-logistics",
    name: "Retail & logistics",
    region: "APAC · EU · NDA",
    body: "Forecasting, stock movement and the migrations underneath them. The hard part is rarely the algorithm. It is a master data set that three systems disagree about.",
    chips: ["Demand forecasting", "MLOps", "Legacy migration", "Dashboards"],
    metric: { value: "31%", label: "fewer stockouts at constant inventory", placeholder: true },
  },
  {
    slug: "education",
    name: "Education",
    region: "PK · NDA",
    body: "Student-facing systems and assistants that answer from policy rather than from memory. Answers cite the handbook section they came from, and anything outside it escalates to a person.",
    chips: ["RAG", "Portal integration", "Escalation design"],
    metric: {
      value: "24/7",
      label: "admissions coverage without extra headcount",
      placeholder: true,
    },
  },
  {
    slug: "construction-facilities",
    name: "Construction & facilities",
    region: "DE · NDA",
    body: "Bid teams and service operations replacing phone-and-spreadsheet processes. Tender documents read and turned into a compliance matrix; scheduling and invoicing put on one system.",
    chips: ["Document agents", "Scheduling", "Dispatch", "Customer portals"],
    metric: { value: "9 hrs", label: "saved per tender response", placeholder: true },
  },
];
