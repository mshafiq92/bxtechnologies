/*
 * Service groups, services, stack lists and engagement models.
 * Copy verbatim from bX v2 - Home.dc.html and bX v2 - Services.dc.html.
 * Detail pages: content/service-details.ts.
 */
import type {
  EngagementModel,
  ServiceGroup,
  ServiceInput,
  StackGroup,
} from "@/lib/schemas/content";

import { agenticAiDetail, cloudDevopsDetail, customSoftwareDetail } from "./service-details";

export const serviceGroups: ServiceGroup[] = [
  {
    key: "ai",
    number: "01",
    name: "AI & Autonomy",
    intro:
      "Systems that decide and generate, wired into the software you already run. In production for insurance, education and SaaS clients.",
    production: "In production · insurance, education, SaaS",
  },
  {
    key: "data",
    number: "02",
    name: "Data & Cloud",
    intro:
      "The foundation the AI layer stands on. In production for utilities, logistics and SaaS clients.",
    production: "In production · utilities, logistics, SaaS",
  },
  {
    key: "product",
    number: "03",
    name: "Product Engineering",
    intro:
      "The core practice since 2019. In production for facilities, automotive and retail clients.",
    production: "In production · facilities, automotive, retail",
  },
  {
    key: "teams",
    number: "04",
    name: "Teams & Advisory",
    intro:
      "When the gap is capacity or direction rather than a defined build. In production for automotive, education and fintech clients.",
    production: "In production · automotive, education, fintech",
  },
];

export const services: ServiceInput[] = [
  {
    slug: "agentic-ai",
    number: "01",
    group: "ai",
    name: "Agentic AI & agents",
    navLabel: "Agentic AI & agents",
    summary:
      "Planner and executor agents wired into ERP, CRM and data, with guardrails and regression evals",
    subtitle: "Planner and executor agents that take actions, not just answer questions",
    description:
      "Orchestration, tool calling into ERP and CRM, retrieval, policy guardrails, human handoff, and the regression evals that tell you when a prompt change broke something.",
    stack: ["Claude · OpenAI", "LangGraph", "pgvector"],
    detail: agenticAiDetail,
  },
  {
    slug: "generative-ai",
    number: "02",
    group: "ai",
    name: "Generative AI integration",
    navLabel: "Generative AI integration",
    summary:
      "Retrieval over your own documents, copilots inside existing screens, evaluation before rollout",
    subtitle: "Retrieval and copilots inside the screens your team already uses",
    description:
      "Document ingestion and chunking, hybrid search over your own content, copilots embedded in existing UI, and evaluation before anything reaches a customer.",
    stack: ["RAG", "Vector search", "Node.js"],
    detail: null,
  },
  {
    slug: "ai-ml-engineering",
    number: "03",
    group: "ai",
    name: "AI/ML engineering",
    navLabel: "AI/ML engineering",
    summary: "Forecasting, vision and classification models, plus the MLOps to keep them honest",
    subtitle: "Models trained on your data, and the pipeline that keeps them honest",
    description:
      "Forecasting, classification, computer vision and anomaly detection, with feature stores, retraining schedules, drift monitoring and versioned deployment.",
    stack: ["Python", "Forecasting", "Computer vision"],
    detail: null,
  },
  {
    slug: "data-engineering",
    number: "04",
    group: "data",
    name: "Data engineering & analytics",
    navLabel: "Data engineering & analytics",
    summary: "Pipelines, warehouses and reporting your AI layer can actually rely on",
    subtitle: "Pipelines and warehouses your reporting can be trusted on",
    description:
      "Ingestion from operational systems, dimensional modelling, scheduled orchestration, data quality tests, and dashboards that reconcile with the source of truth.",
    stack: ["SQL Server", "MySQL", "MongoDB", "Reporting"],
    detail: null,
  },
  {
    slug: "cloud-devops",
    number: "05",
    group: "data",
    name: "Cloud & DevOps",
    navLabel: "Cloud & DevOps",
    summary: "AWS and Azure landing zones, CI/CD, Kubernetes, cost and reliability engineering",
    subtitle: "Landing zones, pipelines and the cost discipline to go with them",
    description:
      "AWS and Azure architecture, infrastructure as code, CI/CD, containerised deployment, observability, disaster recovery, and cloud spend brought back under control.",
    stack: ["AWS", "Azure", "Docker", "CI/CD"],
    detail: cloudDevopsDetail,
  },
  {
    slug: "iot-embedded",
    number: "06",
    group: "data",
    name: "IoT & embedded",
    navLabel: "IoT & embedded",
    summary: "Device fleets, telemetry ingestion and the dashboards operators trust",
    subtitle: "Device fleets and the telemetry operators actually watch",
    description:
      "Firmware integration, message-broker ingestion at scale, time-series storage, alerting rules, over-the-air update paths and operator dashboards.",
    stack: ["MQTT", "Telemetry", "Dashboards"],
    detail: null,
  },
  {
    slug: "custom-software",
    number: "07",
    group: "product",
    name: "Custom software development",
    navLabel: "Custom software",
    summary: "Line-of-business systems in .NET, Node and Python, built to be handed over",
    subtitle: "Line-of-business systems built to be handed over",
    description:
      "Domain modelling, API design, integrations with what you already run, and documentation thorough enough that another team could take it on.",
    stack: ["C# / ASP.NET", "Node.js", "Python", "SQL Server"],
    detail: customSoftwareDetail,
  },
  {
    slug: "web-mobile",
    number: "08",
    group: "product",
    name: "Web & mobile applications",
    navLabel: "Web & mobile apps",
    summary: "React, React Native and Flutter products, from mock-up to store release",
    subtitle: "From mock-up to store release, on one codebase where it makes sense",
    description:
      "Responsive web products, cross-platform mobile apps, design systems, accessibility, and the release engineering behind store submissions.",
    stack: ["React.js", "Tailwind", "Responsive web", "Mobile apps"],
    detail: null,
  },
  {
    slug: "qa-test-automation",
    number: "09",
    group: "product",
    name: "QA & test automation",
    navLabel: "QA & test automation",
    summary: "Functional, performance, security and API testing, including automotive infotainment",
    subtitle: "Independent testing, including safety-adjacent automotive work",
    description:
      "Functional, regression, performance, security and API testing; automation suites in your pipeline; infotainment validation delivered with our German partner.",
    stack: ["Functional", "Performance", "Security", "API"],
    detail: null,
  },
  {
    slug: "dedicated-teams",
    number: "10",
    group: "teams",
    name: "Dedicated teams",
    navLabel: "Dedicated teams",
    summary: "Named engineers in your standups, your board, your repo, scaled monthly",
    subtitle: "Named engineers in your standups, your board and your repo",
    description:
      "You interview and pick the engineers. They work your process and your hours, scale monthly, and we handle employment, equipment and cover.",
    stack: ["Your process", "CET overlap", "Monthly scaling"],
    detail: null,
  },
  {
    slug: "digital-transformation",
    number: "11",
    group: "teams",
    name: "Digital transformation consulting",
    navLabel: "Digital transformation",
    summary: "Assessment, roadmap and the migration work that follows it",
    subtitle: "Assessment and roadmap, then the migration work itself",
    description:
      "Current-state review, target architecture, a sequenced roadmap with costs, and, unlike a pure advisory, the team that executes it afterwards.",
    stack: ["Assessment", "Roadmap", "Legacy migration"],
    detail: null,
  },
  {
    slug: "blockchain",
    number: "12",
    group: "teams",
    name: "Blockchain & distributed systems",
    navLabel: "Blockchain & distributed",
    summary: "Contracts, wallets and settlement flows, audited before they touch money",
    subtitle: "Contracts and settlement flows, audited before they touch money",
    description:
      "Smart contract development and review, wallet integration, token and settlement flows, plus the off-chain services and indexing around them.",
    stack: ["Smart contracts", "Wallets", "Settlement"],
    detail: null,
  },
];

/**
 * "What we build with" (Services page). BUSINESS-RULES-V2 §6: names must come from the team
 * skills data (teamData.js, not in this repo). Treated as approved until that file is shared.
 */
export const stackGroups: StackGroup[] = [
  { title: "AI & data", items: ["Claude", "OpenAI", "LangGraph", "MCP", "pgvector", "Python"] },
  {
    title: "Backend",
    items: [
      "C# / ASP.NET",
      "Node.js",
      "Express",
      "Python",
      "C / C++",
      "MongoDB",
      "SQL Server",
      "MySQL",
    ],
  },
  {
    title: "Frontend & mobile",
    items: ["React.js", "JavaScript", "HTML / CSS", "Tailwind", "Bootstrap"],
  },
  { title: "Platform & QA", items: ["Git / GitHub", "Bitbucket", "Docker", "AWS", "Azure"] },
];

const startupTrackBase =
  "Two engineers on a monthly retainer, one priority at a time, cancellable with a month's notice. For an MVP that has to reach users, or a manual process that needs to become a system";

/** Engagement models (Services page text; Home uses a shorter Startup & SMB sentence). */
export const engagementModels: EngagementModel[] = [
  {
    title: "Fixed price",
    tag: "Clear scope",
    text: "Cost set during requirements and analysis. Change requests accepted late in the process. Best when the specification is stable.",
  },
  {
    title: "Dedicated team",
    tag: "Evolving scope",
    text: "Named engineers, your process, monthly scaling. Direct interaction with the team, no hiring overhead, lower total cost of ownership.",
  },
  {
    title: "AI pilot",
    tag: "New",
    text: "Six weeks, one workflow, a working agent behind an evaluation harness and a go/no-go number at the end. Fixed fee.",
  },
  {
    title: "Startup & SMB track",
    tag: "Smaller budgets",
    text: `${startupTrackBase} without a six-figure programme around it.`,
  },
];

/** Home shows the Startup & SMB track without the final clause. */
export const engagementModelsHome: EngagementModel[] = engagementModels.map((m) =>
  m.title === "Startup & SMB track" ? { ...m, text: `${startupTrackBase}.` } : m,
);

export const engagementIntro = {
  eyebrow: "Engagement models",
  title: "Pick the shape that fits the problem",
  text: "Fixed scope when requirements are clear, a dedicated team when they are not, a bounded pilot when the question is whether AI helps at all, and a smaller monthly track for startups and growing businesses.",
  cta: "Talk through the options",
};
