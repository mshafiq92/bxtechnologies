/*
 * Service groups, services, stack lists and engagement models.
 * Copy from bX v2 - Home.dc.html and bX v2 - Services.dc.html, restructured with the owner
 * (2026-11-09).
 * Services marked DRAFT are new copy for the owner to review.
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
    intro: "Agents and models wired into the software your teams already use.",
  },
  {
    key: "data",
    number: "02",
    name: "Data & Analytics",
    intro: "Pipelines, warehouses and dashboards your reporting and AI can rely on.",
  },
  {
    key: "cloud",
    number: "03",
    name: "Cloud & DevOps",
    intro: "Deployments that ship safely, and the monitoring that keeps them running.",
  },
  {
    key: "managed",
    number: "04",
    name: "Managed IT",
    intro: "Hardware, network and on-site support, from first line to field engineers.",
  },
  {
    key: "product",
    number: "05",
    name: "Product & Quality",
    intro: "Custom software and mobile products, tested and secured before release.",
  },
  {
    key: "teams",
    number: "06",
    name: "Teams & Advisory",
    intro: "Engineers and advisers for when the gap is capacity or direction.",
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
    name: "Gen AI integration",
    navLabel: "Gen AI integration",
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
    summary: "Forecasting, vision and classification models, trained on your own data",
    subtitle: "Models trained on your data, and the pipeline that keeps them honest",
    description:
      "Forecasting, classification, computer vision and anomaly detection, with feature stores, retraining schedules, drift monitoring and versioned deployment.",
    stack: ["Python", "Forecasting", "Computer vision"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "mlops",
    number: "04",
    group: "ai",
    name: "MLOps & model operations",
    navLabel: "MLOps",
    summary:
      "Training pipelines, model serving and drift monitoring, so models stay reliable after launch",
    subtitle: "Models taken from notebook to a monitored service your team can own",
    description:
      "Training and retraining pipelines, model registry and versioning, serving, drift and performance monitoring, and rollback.",
    stack: ["Pipelines", "Model registry", "Monitoring"],
    detail: null,
  },
  {
    slug: "data-engineering",
    number: "05",
    group: "data",
    name: "Data engineering",
    navLabel: "Data engineering",
    summary: "Warehouses and data models your reporting and AI layer can actually rely on",
    subtitle: "Warehouses and data models your reporting can be trusted on",
    description:
      "Warehouse design, dimensional modelling and data quality tests, so everything downstream starts from clean data.",
    stack: ["SQL Server", "MySQL", "MongoDB", "Data quality"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "data-pipelines",
    number: "06",
    group: "data",
    name: "Data pipelines",
    navLabel: "Data pipelines",
    summary: "Scheduled ingestion from your operational systems, tested on every run",
    subtitle: "Data moved reliably from the systems that create it",
    description:
      "Ingestion from operational systems, scheduled orchestration, and quality checks on every run, so reports and models always have fresh data.",
    stack: ["Ingestion", "Orchestration", "Quality checks"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "analytics-bi",
    number: "07",
    group: "data",
    name: "Analytics & BI",
    navLabel: "Analytics & BI",
    summary: "Dashboards and reports that reconcile with the source of truth",
    subtitle: "Dashboards your finance and operations teams trust",
    description:
      "Dimensional models, dashboards, scheduled reporting and metric definitions agreed with the people who use them.",
    stack: ["Dashboards", "Reporting", "SQL"],
    detail: null,
  },
  {
    slug: "iot-embedded",
    number: "08",
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
  // The Cloud & DevOps detail page stays at /services/cloud-devops and opens from this service.
  {
    slug: "cloud-devops",
    number: "09",
    group: "cloud",
    name: "Cloud deployment",
    navLabel: "Cloud deployment",
    summary: "AWS and Azure landing zones, infrastructure as code and containerised deployment",
    subtitle: "Landing zones and deployments your team can change safely",
    description:
      "AWS and Azure architecture, infrastructure as code, containerised deployment and disaster recovery, with cloud spend brought back under control.",
    stack: ["AWS", "Azure", "Docker"],
    detail: cloudDevopsDetail,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "cloud-migration",
    number: "10",
    group: "cloud",
    name: "Cloud migration",
    navLabel: "Cloud migration",
    summary: "Existing systems moved to AWS or Azure, planned in stages and tested before cutover",
    subtitle: "Existing systems moved to the cloud, one planned stage at a time",
    description:
      "A review of what you run today, a sequenced migration plan, application and data moves, and testing before each cutover.",
    stack: ["Assessment", "Migration plan", "Cutover"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "monitoring-observability",
    number: "11",
    group: "cloud",
    name: "Monitoring & observability",
    navLabel: "Monitoring & observability",
    summary: "Metrics, logs, traces and alerts, so problems are found before customers report them",
    subtitle: "See what your systems are doing, and hear about problems first",
    description:
      "Metrics, logs and traces across your applications and infrastructure, dashboards your team uses, and alerting rules tuned to real incidents.",
    stack: ["Metrics", "Logs", "Alerting"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "ci-cd-pipelines",
    number: "12",
    group: "cloud",
    name: "CI/CD pipelines",
    navLabel: "CI/CD pipelines",
    summary: "Automated build, test and release pipelines, from first commit to production",
    subtitle: "Every change built, tested and released the same way",
    description:
      "Build, test and release automation, containerised deployment and rollback paths, so shipping a change is routine.",
    stack: ["CI/CD", "Git / GitHub", "Docker"],
    detail: null,
  },
  // CONFIRM (all Managed IT services): on-site coverage countries. The source says on-site support is
  // available in the registered country and otherwise relies on partners or employees there. Do not
  // name any country or region in this copy until the owner confirms it.
  {
    slug: "device-support",
    number: "13",
    group: "managed",
    name: "Device support",
    navLabel: "Device support",
    summary:
      "Troubleshooting and repair for laptops, desktops, servers, printers and network devices",
    subtitle: "The equipment your people depend on, kept working",
    description:
      "Hardware troubleshooting and repair, support for laptops, desktops, servers, printers and network devices, equipment swaps, and asset tagging and inventory checks.",
    stack: ["Troubleshooting", "Repair", "Asset tagging"],
    detail: null,
  },
  {
    slug: "field-engineering",
    number: "14",
    group: "managed",
    name: "Field engineering",
    navLabel: "Field engineering",
    summary:
      "Installation, smart hands and remote hands, with half-day and full-day on-site visits",
    subtitle: "Engineers on site when the work cannot be done remotely",
    description:
      "Installation and de-installation, smart hands and remote hands, site inspections and equipment verification, with half-day and full-day on-site visits.",
    stack: ["Smart hands", "Remote hands", "On-site field engineering"],
    detail: null,
  },
  {
    slug: "technical-support",
    number: "15",
    group: "managed",
    name: "Technical support (L1-L3)",
    navLabel: "Technical support (L1-L3)",
    summary: "First line to expert technical support, with same or next business day response",
    subtitle: "Technical support from first line to expert level",
    description:
      "L1, L2 and L3 technical support, with same business day and next business day response.",
    stack: ["L1 support", "L2 support", "L3 support"],
    detail: null,
  },
  {
    slug: "network-troubleshooting",
    number: "16",
    group: "managed",
    name: "Network troubleshooting",
    navLabel: "Network troubleshooting",
    summary: "Network device, storage and Wi-Fi support, using Ekahau and AirMagnet tools",
    subtitle: "The network and storage underneath everything else",
    description:
      "Support for network devices and storage, and Wi-Fi support using Ekahau and AirMagnet tools.",
    stack: ["Network devices", "Wi-Fi", "Storage support"],
    detail: null,
  },
  {
    slug: "custom-software",
    number: "17",
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
    number: "18",
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
    number: "19",
    group: "product",
    name: "QA & test automation",
    navLabel: "QA & test automation",
    summary: "Functional, performance, security and API testing, independent of the build team",
    subtitle: "Independent testing that runs in your pipeline on every build",
    description:
      "Functional, regression, performance, security and API testing, with automation suites that run in your pipeline and report on every build.",
    stack: ["Functional", "Performance", "Security", "API"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "cybersecurity",
    number: "20",
    group: "product",
    name: "Cybersecurity & penetration testing",
    navLabel: "Cybersecurity",
    summary: "Vulnerability assessments, penetration tests and security reviews",
    subtitle: "Find the weaknesses before someone else does",
    description:
      "Threat and vulnerability assessments, penetration testing, security review of code and infrastructure, and remediation guidance.",
    stack: ["Pentesting", "Vulnerability assessment", "Security review"],
    detail: null,
  },
  {
    slug: "dedicated-teams",
    number: "21",
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
    number: "22",
    group: "teams",
    name: "Digital transformation & technology consulting",
    navLabel: "Digital transformation",
    summary: "Assessment, roadmap and the migration work that follows it",
    subtitle: "Assessment and roadmap, then the migration work itself",
    description:
      "Current-state review, technology stack selection and review, target architecture, a sequenced roadmap with costs, and, unlike a pure advisory, the team that executes it afterwards.",
    stack: ["Assessment", "Roadmap", "Legacy migration"],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "project-management",
    number: "23",
    group: "teams",
    name: "Software project management",
    navLabel: "Project management",
    summary: "Delivery managed from concept to market",
    subtitle: "One accountable lead from first scope to release",
    description:
      "Planning, scope and change control, reporting, risk tracking and release coordination across your team and ours.",
    stack: ["Planning", "Reporting", "Release"],
    detail: null,
  },
  {
    slug: "blockchain",
    number: "24",
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
  "Two engineers on a monthly retainer, cancellable with a month's notice. For an MVP or a manual process that needs to become a system";

/** Engagement models (Services page text; Home uses a shorter Startup & SMB sentence). */
export const engagementModels: EngagementModel[] = [
  {
    title: "Fixed price",
    tag: "Clear scope",
    text: "Cost agreed during requirements and analysis, with a clear change process. Best when the specification is stable.",
  },
  {
    title: "Dedicated team",
    tag: "Evolving scope",
    text: "Named engineers, your process, monthly scaling. Direct access to the team, with no hiring overhead.",
  },
  {
    title: "AI pilot",
    tag: "Low risk",
    text: "Six weeks, one workflow, a working agent and a clear go or no-go result at the end. Fixed fee.",
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
  title: "Choose how we work together",
  text: "Match the engagement to how clear your requirements are, from fixed scope to a dedicated team or a short AI pilot.",
  cta: "Talk through the options",
};
