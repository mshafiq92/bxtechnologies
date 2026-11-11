/*
 * Service groups, services, stack lists and engagement models.
 * Copy from bX v2 - Home.dc.html and bX v2 - Services.dc.html, restructured with the owner
 * (2026-11-09). Group and service names aligned with industry naming (owner, 2026-11-11).
 * Services marked DRAFT are new copy for the owner to review.
 * Detail pages: content/service-details.ts.
 */
import type {
  EngagementModel,
  ServiceGroup,
  ServiceInput,
  StackGroup,
} from "@/lib/schemas/content";

export const serviceGroups: ServiceGroup[] = [
  {
    key: "ai",
    number: "01",
    name: "AI Engineering",
    intro: "Agents and models wired into the software your teams already use.",
  },
  {
    key: "cloud",
    number: "02",
    name: "Cloud & DevOps",
    intro: "Deployments that ship safely, and the monitoring that keeps them running.",
  },
  {
    key: "software",
    number: "03",
    name: "Software Engineering",
    intro: "Custom software, web and mobile apps, IoT and blockchain, tested before release.",
  },
  {
    key: "data",
    number: "04",
    name: "Data & Analytics",
    intro: "Pipelines, warehouses and dashboards your reporting and AI can rely on.",
  },
  {
    key: "managed",
    number: "05",
    name: "Managed IT Services",
    intro: "Service desk, device, network and on-site support, from first line to field engineers.",
  },
  {
    key: "consulting",
    number: "06",
    name: "IT Consulting",
    intro: "Roadmaps, security reviews and delivery leadership for the decisions ahead.",
  },
];

export const services: ServiceInput[] = [
  {
    slug: "ai-agent-development",
    number: "01",
    group: "ai",
    name: "AI agent development",
    navLabel: "AI agent development",
    summary:
      "Planner and executor agents wired into ERP, CRM and data, with guardrails and regression evals",
    subtitle: "Planner and executor agents that take actions, not just answer questions",
    description:
      "Orchestration, tool calling into ERP and CRM, retrieval, policy guardrails, human handoff, and the regression evals that tell you when a prompt change broke something.",
    stack: ["Claude · OpenAI", "LangGraph", "pgvector"],
    includes: [
      "Planner and executor agents",
      "Tool calling into ERP and CRM",
      "Policy guardrails and human handoff",
      "Regression evaluation sets",
    ],
    detail: null,
  },
  {
    slug: "generative-ai",
    number: "02",
    group: "ai",
    name: "Generative AI integration",
    navLabel: "Gen AI integration",
    summary:
      "Retrieval over your own documents, copilots inside existing screens, evaluation before rollout",
    subtitle: "Retrieval and copilots inside the screens your team already uses",
    description:
      "Document ingestion and chunking, hybrid search over your own content, copilots embedded in existing UI, and evaluation before anything reaches a customer.",
    stack: ["RAG", "Vector search", "Node.js"],
    includes: [
      "Document ingestion and search",
      "Copilots in your existing screens",
      "Answers with cited sources",
      "Evaluation before rollout",
    ],
    detail: null,
  },
  // DRAFT: new service (owner approved 2026-11-11), copy for owner review.
  {
    slug: "ai-chatbots",
    number: "03",
    group: "ai",
    name: "AI chatbot development",
    navLabel: "AI chatbot development",
    summary:
      "Customer and internal assistants that answer from your own content and hand over to people",
    subtitle: "Assistants that answer from your content, not from a script",
    description:
      "Chatbots for customer service, internal help desks and websites, answering from your own documents and systems, with handover to a person and every conversation logged for review.",
    stack: ["Claude · OpenAI", "RAG", "Web chat"],
    includes: [
      "Customer service chatbots",
      "Internal help desk assistants",
      "Handover to a person",
      "Conversation logs and review",
    ],
    detail: null,
  },
  {
    slug: "machine-learning",
    number: "04",
    group: "ai",
    name: "Machine learning & deep learning",
    navLabel: "ML & DL",
    summary: "Custom models trained on your own data, from classification to deep learning",
    subtitle: "Models trained on your data, and the pipeline that keeps them honest",
    description:
      "Classification, anomaly detection, recommendation and deep learning models built for your problem, with feature stores, retraining schedules and versioned deployment.",
    stack: ["Python", "Classification", "Deep learning"],
    includes: [
      "Classification and recommendation",
      "Anomaly detection",
      "Deep learning models",
      "Feature stores and retraining",
    ],
    detail: null,
  },
  // DRAFT: new service (owner approved 2026-11-11), copy for owner review.
  {
    slug: "computer-vision",
    number: "05",
    group: "ai",
    name: "Computer vision",
    navLabel: "Computer vision",
    summary: "Inspection, recognition and document reading from images and video",
    subtitle:
      "Models that inspect images and video, so your team does not have to check them by hand",
    description:
      "Defect detection, object and text recognition, document reading and video analysis, trained on your own images and tested against cases you agree before rollout.",
    stack: ["Python", "Computer vision", "OCR"],
    includes: [
      "Defect detection and inspection",
      "Object and text recognition",
      "Document reading",
      "Video analysis",
    ],
    detail: null,
  },
  // DRAFT: new service (owner approved 2026-11-11), copy for owner review.
  {
    slug: "predictive-analytics",
    number: "06",
    group: "ai",
    name: "Predictive analytics",
    navLabel: "Predictive analytics",
    summary: "Forecasts for demand, churn and risk, built on your own history",
    subtitle: "Forecasts your planners can check against what actually happened",
    description:
      "Demand, sales, churn and risk forecasting from your historical data, with accuracy tracked against actual results and forecasts delivered into the reports and systems your team uses.",
    stack: ["Python", "Forecasting", "SQL"],
    includes: [
      "Demand and sales forecasting",
      "Churn and risk prediction",
      "Accuracy tracked against actuals",
      "Forecasts in your reports",
    ],
    detail: null,
  },
  {
    slug: "cloud-infrastructure",
    number: "07",
    group: "cloud",
    name: "Cloud infrastructure",
    navLabel: "Cloud infrastructure",
    summary: "AWS and Azure landing zones, infrastructure as code and containerised deployment",
    subtitle: "Landing zones and deployments your team can change safely",
    description:
      "AWS and Azure architecture, infrastructure as code, containerised deployment and disaster recovery, with cloud spend brought back under control.",
    stack: ["AWS", "Azure", "Docker"],
    includes: [
      "Landing zones on AWS and Azure",
      "Infrastructure as code",
      "Containers on Docker and Kubernetes",
      "Disaster recovery",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "cloud-migration",
    number: "08",
    group: "cloud",
    name: "Cloud migration & modernisation",
    navLabel: "Cloud migration",
    summary:
      "Existing systems moved to AWS or Azure and modernised, in planned stages tested before cutover",
    subtitle: "Existing systems moved to the cloud, one planned stage at a time",
    description:
      "A review of what you run today, a sequenced migration plan, legacy applications modernised where it pays off, and testing before each cutover.",
    stack: ["Assessment", "Migration plan", "Cutover"],
    includes: [
      "Review of what runs today",
      "Workloads moved in waves",
      "Legacy app modernisation",
      "A tested rollback for every cutover",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "devops-ci-cd",
    number: "09",
    group: "cloud",
    name: "DevOps & CI/CD",
    navLabel: "DevOps & CI/CD",
    summary: "Automated build, test and release pipelines, from first commit to production",
    subtitle: "Every change built, tested and released the same way",
    description:
      "Build, test and release automation, containerised deployment and rollback paths, so shipping a change is routine.",
    stack: ["CI/CD", "Git / GitHub", "Docker"],
    includes: [
      "Build and test on every change",
      "Security scans",
      "Staged rollout",
      "One-command rollback",
    ],
    detail: null,
  },
  // DRAFT: replaces Monitoring & SRE (owner approved 2026-11-11, DPL naming), copy for owner review.
  {
    slug: "managed-cloud",
    number: "10",
    group: "cloud",
    name: "Managed cloud",
    navLabel: "Managed cloud",
    summary: "Monitoring, patching, backups and cost control for the cloud you already run",
    subtitle: "Your cloud kept healthy, secure and affordable after launch",
    description:
      "Monitoring and alerting, incident response in agreed hours, patching and backups, and monthly cost reviews that keep cloud spend explainable.",
    stack: ["Monitoring", "Backups", "Cost control"],
    includes: [
      "Monitoring and alerts with runbooks",
      "Patching and backups",
      "Incident response in agreed hours",
      "Monthly cost reviews",
    ],
    detail: null,
  },
  // DRAFT: copy for owner review. Moved to Cloud & DevOps (owner, 2026-11-11).
  {
    slug: "mlops",
    number: "11",
    group: "cloud",
    name: "Machine learning operations (MLOps)",
    navLabel: "MLOps",
    summary:
      "Training pipelines, model serving and drift monitoring, so models stay reliable after launch",
    subtitle: "Models taken from notebook to a monitored service your team can own",
    description:
      "Training and retraining pipelines, model registry and versioning, serving, drift and performance monitoring, and rollback.",
    stack: ["Pipelines", "Model registry", "Monitoring"],
    includes: [
      "Training and retraining pipelines",
      "Model registry and versioning",
      "Model serving",
      "Drift and performance monitoring",
    ],
    detail: null,
  },
  {
    slug: "custom-software",
    number: "12",
    group: "software",
    name: "Custom software development",
    navLabel: "Custom software",
    summary: "Line-of-business systems in .NET, Node and Python, built to be handed over",
    subtitle: "Line-of-business systems built to be handed over",
    description:
      "Domain modelling, API design, integrations with what you already run, and documentation thorough enough that another team could take it on.",
    stack: ["C# / ASP.NET", "Node.js", "Python", "SQL Server"],
    includes: [
      "Domain modelling",
      "API design",
      "Integrations with existing systems",
      "Handover documentation",
    ],
    detail: null,
  },
  // Split from Web & mobile (owner approved 2026-11-11, DPL naming). DRAFT copy for owner review.
  {
    slug: "web-development",
    number: "13",
    group: "software",
    name: "Web app development",
    navLabel: "Web app development",
    summary:
      "Responsive web applications, portals and online stores, built to be fast and accessible",
    subtitle: "Web applications that work on every screen",
    description:
      "Responsive web applications, customer portals, admin tools and online stores, with design systems, accessibility and the integrations behind them.",
    stack: ["React.js", "Tailwind", "Responsive web"],
    includes: [
      "Responsive web applications",
      "Customer portals and admin tools",
      "Online stores and checkout",
      "Design systems and accessibility",
    ],
    detail: null,
  },
  // Split from Web & mobile (owner approved 2026-11-11, DPL naming). DRAFT copy for owner review.
  {
    slug: "mobile-development",
    number: "14",
    group: "software",
    name: "Mobile app development",
    navLabel: "Mobile app development",
    summary: "Android, iOS and cross-platform apps, from mock-up to store release",
    subtitle: "From mock-up to store release, on one codebase where it makes sense",
    description:
      "Native and cross-platform apps for Android and iOS, with the release engineering behind store submissions and updates.",
    stack: ["React Native", "Flutter", "Mobile apps"],
    includes: ["Android apps", "iOS apps", "Cross-platform apps", "Store release and updates"],
    detail: null,
  },
  {
    slug: "iot-development",
    number: "15",
    group: "software",
    name: "IoT development",
    navLabel: "IoT development",
    summary: "Device fleets, telemetry ingestion and the dashboards operators trust",
    subtitle: "Device fleets and the telemetry operators actually watch",
    description:
      "Firmware integration, message-broker ingestion at scale, time-series storage, alerting rules, over-the-air update paths and operator dashboards.",
    stack: ["MQTT", "Telemetry", "Dashboards"],
    includes: [
      "Firmware integration",
      "Telemetry ingestion",
      "Time-series storage",
      "Over-the-air updates",
    ],
    detail: null,
  },
  {
    slug: "qa-testing",
    number: "16",
    group: "software",
    name: "QA & software testing",
    navLabel: "QA & software testing",
    summary: "Functional, performance, security and API testing, independent of the build team",
    subtitle: "Independent testing that runs in your pipeline on every build",
    description:
      "Functional, regression, performance, security and API testing, with automation suites that run in your pipeline and report on every build.",
    stack: ["Functional", "Performance", "Security", "API"],
    includes: [
      "Functional testing",
      "Performance testing",
      "Security and API testing",
      "Usability, sanity and smoke testing",
    ],
    detail: null,
  },
  {
    slug: "blockchain",
    number: "17",
    group: "software",
    name: "Blockchain development",
    navLabel: "Blockchain development",
    summary: "Contracts, wallets and settlement flows, audited before they touch money",
    subtitle: "Contracts and settlement flows, audited before they touch money",
    description:
      "Smart contract development and review, wallet integration, token and settlement flows, plus the off-chain services and indexing around them.",
    stack: ["Smart contracts", "Wallets", "Settlement"],
    includes: [
      "Smart contract development",
      "Contract review",
      "Wallet integration",
      "Off-chain indexing",
    ],
    detail: null,
  },
  {
    slug: "data-engineering",
    number: "18",
    group: "data",
    name: "Data engineering",
    navLabel: "Data engineering",
    summary: "Warehouses and data models your reporting and AI layer can actually rely on",
    subtitle: "Warehouses and data models your reports can rely on",
    description:
      "Warehouse design, dimensional modelling and data quality tests, so everything downstream starts from clean data.",
    stack: ["SQL Server", "MySQL", "MongoDB", "Data quality"],
    includes: [
      "Warehouse design",
      "Dimensional modelling",
      "Data quality tests",
      "Every definition documented",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "data-pipelines",
    number: "19",
    group: "data",
    name: "Data pipelines & ETL",
    navLabel: "Data pipelines & ETL",
    summary: "Scheduled ingestion from your operational systems, tested on every run",
    subtitle: "Data moved reliably from the systems that create it",
    description:
      "Ingestion from operational systems, scheduled orchestration, and quality checks on every run, so reports and models always have fresh data.",
    stack: ["Ingestion", "Orchestration", "Quality checks"],
    includes: [
      "Ingestion from operational systems",
      "Scheduled orchestration",
      "Quality checks on every run",
      "Alerts when a run fails",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "business-intelligence",
    number: "20",
    group: "data",
    name: "Business intelligence & analytics",
    navLabel: "BI & analytics",
    summary: "Dashboards and reports that reconcile with the source of truth",
    subtitle: "Dashboards your finance and operations teams trust",
    description:
      "Dimensional models, dashboards, scheduled reporting and metric definitions agreed with the people who use them.",
    stack: ["Dashboards", "Reporting", "SQL"],
    includes: [
      "Dashboards",
      "Scheduled reporting",
      "Agreed metric definitions",
      "Reports that match the source data",
    ],
    detail: null,
  },
  {
    slug: "it-service-desk",
    number: "21",
    group: "managed",
    name: "IT service desk (L1-L3)",
    navLabel: "IT service desk (L1-L3)",
    summary: "First line to expert technical support, with same or next business day response",
    subtitle: "Technical support from first line to expert level",
    description:
      "L1, L2 and L3 technical support, with same business day and next business day response.",
    stack: ["L1 support", "L2 support", "L3 support"],
    includes: [
      "First-line L1 support",
      "L2 and L3 escalation",
      "Same or next business day response",
      "Documented resolutions",
    ],
    detail: null,
  },
  // CONFIRM (all Managed IT Services): on-site coverage countries. The source says on-site support is
  // available in the registered country and otherwise relies on partners or employees there. Do not
  // name any country or region in this copy until the owner confirms it.
  {
    slug: "device-support",
    number: "22",
    group: "managed",
    name: "End-user device support",
    navLabel: "End-user device support",
    summary:
      "Troubleshooting and repair for laptops, desktops, servers, printers and network devices",
    subtitle: "The equipment your people depend on, kept working",
    description:
      "Hardware troubleshooting and repair, support for laptops, desktops, servers, printers and network devices, equipment swaps, and asset tagging and inventory checks.",
    stack: ["Troubleshooting", "Repair", "Asset tagging"],
    includes: [
      "Laptops and desktops",
      "Servers and printers",
      "Network devices",
      "Asset tagging and inventory checks",
    ],
    detail: null,
  },
  {
    slug: "on-site-it-support",
    number: "23",
    group: "managed",
    name: "On-site IT support",
    navLabel: "On-site IT support",
    summary:
      "Installation, smart hands and remote hands, with half-day and full-day on-site visits",
    subtitle: "Engineers on site when the work cannot be done remotely",
    description:
      "Installation and de-installation, smart hands and remote hands, site inspections and equipment verification, with half-day and full-day on-site visits.",
    stack: ["Smart hands", "Remote hands", "On-site field engineering"],
    includes: [
      "Installation and de-installation",
      "Equipment swaps",
      "Smart hands and remote hands",
      "Site inspections",
    ],
    detail: null,
  },
  {
    slug: "network-management",
    number: "24",
    group: "managed",
    name: "Network management",
    navLabel: "Network management",
    summary: "Network device, storage and Wi-Fi support, using Ekahau and AirMagnet tools",
    subtitle: "The network and storage underneath everything else",
    description:
      "Support for network devices and storage, and Wi-Fi support using Ekahau and AirMagnet tools.",
    stack: ["Network devices", "Wi-Fi", "Storage support"],
    includes: [
      "Network device support",
      "Wi-Fi surveys with Ekahau and AirMagnet",
      "Storage support",
      "Equipment verification",
    ],
    detail: null,
  },
  {
    slug: "digital-transformation",
    number: "25",
    group: "consulting",
    name: "Digital transformation consulting",
    navLabel: "Digital transformation",
    summary: "Assessment, roadmap and the migration work that follows it",
    subtitle: "Assessment and roadmap, then the migration work itself",
    description:
      "Current-state review, technology stack selection and review, target architecture, a sequenced roadmap with costs, and, unlike a pure advisory, the team that executes it afterwards.",
    stack: ["Assessment", "Roadmap", "Legacy migration"],
    includes: [
      "Current-state review",
      "Technology stack selection",
      "Target architecture",
      "A costed, sequenced roadmap",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "project-management",
    number: "26",
    group: "consulting",
    name: "IT project management",
    navLabel: "IT project management",
    summary: "Delivery managed from concept to market",
    subtitle: "One accountable lead from first scope to release",
    description:
      "Planning, scope and change control, reporting, risk tracking and release coordination across your team and ours.",
    stack: ["Planning", "Reporting", "Release"],
    includes: [
      "Planning and scope",
      "Change control",
      "Progress reporting",
      "Release coordination",
    ],
    detail: null,
  },
  // DRAFT: new service, copy for owner review.
  {
    slug: "cybersecurity",
    number: "27",
    group: "consulting",
    name: "Cybersecurity consulting",
    navLabel: "Cybersecurity",
    summary: "Vulnerability assessments, penetration tests and security reviews",
    subtitle: "Find the weaknesses before someone else does",
    description:
      "Threat and vulnerability assessments, penetration testing, security review of code and infrastructure, and remediation guidance.",
    stack: ["Pentesting", "Vulnerability assessment", "Security review"],
    includes: [
      "Vulnerability assessments",
      "Penetration testing",
      "Code and infrastructure review",
      "Remediation guidance",
    ],
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
