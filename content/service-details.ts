/*
 * Service Detail content for the three designed services.
 * Copy verbatim from bX v2 - Service Detail.dc.html (Agentic AI), - Cloud DevOps, - Custom Software.
 * The remaining services render the same template once their content is written.
 */
import type { z } from "zod";

import type { ServiceDetailSchema } from "@/lib/schemas/content";

type ServiceDetailInput = z.input<typeof ServiceDetailSchema>;

const proofNote =
  "Client names withheld under NDA. Figures are placeholders pending your final sign-off on the real numbers.";

/* AI agent development ------------------------------------------------------ */

export const agenticAiDetail: ServiceDetailInput = {
  eyebrow: "AI Engineering",
  title: "Agents that take actions inside your systems.",
  intro:
    "A chatbot answers. An agent decides, calls your APIs, and finishes the task, or hands it to a person with the reasoning attached. We build the orchestration, the guardrails and the evaluation that make that safe to run unattended.",
  metrics: [
    { value: "6 wks", label: "pilot to go/no-go" },
    { value: "1", label: "workflow at a time" },
    { value: "Fixed fee", label: "no open-ended discovery" },
  ],
  primaryCta: "Scope an agent pilot",
  heroDiagram: {
    caption: "One agent, end to end",
    entry: { t: "Inbound task", d: "email · ticket · form" },
    core: { t: "Orchestrator", d: "plan · act · check" },
    support: [
      { t: "Tools", d: "ERP · CRM · SQL" },
      { t: "Guardrails", d: "policy · spend caps" },
    ],
    outcomes: [
      { t: "Resolved", d: "written to system" },
      { t: "Handed off", d: "with reasoning" },
    ],
    status: { t: "Evaluated on every change", d: "golden set · traces · cost" },
  },
  build: {
    title: "Four patterns that carry their own weight",
    intro:
      "Each of these has a measurable job. If a workflow has no number attached to it, we will tell you an agent is the wrong tool.",
    patterns: [
      {
        number: "01",
        title: "Triage & routing",
        text: "Inbound email, tickets and form submissions read, classified, enriched from your CRM, and either resolved or routed with a draft reply. The queue stops being a person's morning.",
        items: ["Classification", "CRM lookup", "Draft reply"],
      },
      {
        number: "02",
        title: "Back-office document work",
        text: "Invoices, tenders, claims and contracts extracted into structured fields, checked against policy, and written into the system of record with an audit trail per decision.",
        items: ["Extraction", "Policy checks", "Audit trail"],
      },
      {
        number: "03",
        title: "Operations copilots",
        text: "An assistant inside the screens your staff already use, that can query live data and take the three or four actions the role actually needs, not a separate chat window beside the work.",
        items: ["In-app", "Tool calling", "Role scoped"],
      },
      {
        number: "04",
        title: "Customer-facing assistants",
        text: "Booking, status, account changes and support, answering from your own content with a hard handoff to a human the moment confidence or policy says stop.",
        items: ["Retrieval", "Handoff rules", "Multi-channel"],
      },
    ],
  },
  architecture: {
    title: "What we actually deploy",
    intro:
      "The reference shape. Model choice, hosting and data residency are decided per client, including fully in-region or on your own cloud account.",
    edge: [
      { t: "Channels", d: "web · WhatsApp · email · in-app" },
      { t: "Identity & scope", d: "who is asking, what they may see and do" },
      { t: "Your systems", d: "ERP · CRM · SQL · internal APIs" },
    ],
    core: {
      label: "Orchestrator",
      text: "Planner, router and state machine. Decides the next step, retries, and when to stop and ask a human.",
    },
    layers: [
      { t: "Retrieval", d: "Hybrid vector + SQL over your content" },
      { t: "Tools", d: "Typed functions against real endpoints" },
      { t: "Guardrails", d: "Policy, PII redaction, spend caps" },
      { t: "Human handoff", d: "Escalation with full reasoning trace" },
    ],
    observability: {
      t: "Evaluation & observability",
      d: "golden-set regression suites · per-step traces · cost and latency per task · alerting on drift",
    },
    note: "The evaluation layer is the part most pilots skip, and the reason they stall before production. Without a regression set you cannot tell whether today's prompt change improved the agent or quietly broke a case it used to handle.",
  },
  engagement: {
    eyebrow: "The pilot",
    jumpLabel: "The pilot",
    title: "One workflow, a real number",
    intro:
      "Fixed fee. You own everything produced (code, prompts, evaluation set and infrastructure definitions) whether or not you continue with us.",
    cta: "Scope a pilot",
    steps: [
      {
        label: "SCOPE",
        title: "Pick the workflow and set the bar",
        text: "We sit with the people doing the work, instrument the current process, and agree the number that decides success: handling time, cost per case, or error rate. Access, data and security review happen here, not at the end.",
      },
      {
        label: "BUILD",
        title: "Build the agent and its evaluation set",
        text: "Orchestration, retrieval and tools against your real endpoints in a sandbox, with a golden set of cases drawn from your own history. The evaluation harness is built alongside the agent, not after it.",
      },
      {
        label: "TEST",
        title: "Run it shadow, then decide",
        text: "The agent runs beside your team on live traffic without acting, so you can compare its decisions to theirs. You get the measured result, the cost per task, the failure modes we found, and a straight recommendation either way.",
      },
      {
        label: "AFTER",
        title: "Production, or an honest no",
        text: "If the number holds, we take it to production with monitoring, on-call and a retraining cadence. If it does not, we say so and tell you what would have to change. Roughly one pilot in four ends here, and that is the point of running one.",
      },
    ],
  },
  proof: {
    title: "What agents have moved for clients",
    note: proofNote,
    metrics: [
      {
        value: "24/7",
        label: "answers for applicants from the handbook, with the source section cited.",
        sector: "Education · PK · NDA",
        placeholder: true,
      },
      {
        value: "9 hrs",
        label: "per week returned to a bid team by a tender summarising and drafting agent.",
        sector: "Construction · DE · NDA",
        placeholder: true,
      },
      {
        value: "4×",
        label: "more support conversations resolved without a human, at unchanged satisfaction.",
        sector: "SaaS · APAC · NDA",
        placeholder: true,
      },
    ],
  },
  fit: {
    title: "The workflows worth starting with",
    intro:
      "High volume, clear rules, and a decision a person can check. Those three together are what make an agent pay for itself.",
    items: [
      {
        sector: "Fintech",
        title: "Payment exception handling",
        text: "Failed and disputed transactions classified, checked against settlement records, and routed with the case already assembled.",
      },
      {
        sector: "eCommerce",
        title: "Order exception handling",
        text: "Delays, damages and address failures resolved against carrier and store systems, with the customer reply drafted per case.",
      },
      {
        sector: "Education",
        title: "Admissions and student support",
        text: "Enquiry qualification, document checking against entry criteria, and around-the-clock answers from your own handbook.",
      },
      {
        sector: "SaaS",
        title: "Support deflection",
        text: "Tier-one resolution from docs and account state, with clean escalation and a written summary for the engineer who picks it up.",
      },
      {
        sector: "Facilities",
        title: "Field and job reporting",
        text: "Technician notes and site reports turned into structured work orders, with anomalies escalated to a planner.",
      },
      {
        sector: "Professional services",
        title: "Bid and proposal drafting",
        text: "Tender documents read, requirements extracted into a matrix, and a first-draft response assembled from past submissions.",
      },
    ],
  },
  faq: {
    title: "The ones buyers actually ask",
    intro:
      "If yours is not here, put it in the first call. We would rather rule ourselves out early than sell you a pilot that cannot work.",
    items: [
      {
        q: "Does our data go to a model provider?",
        a: "Only if you decide it should. We deploy against hosted APIs, against models inside your own cloud tenancy, or against open-weight models on infrastructure you control, including fully in-region for data residency requirements. PII redaction sits in front of any external call, and we document exactly what leaves your network.",
      },
      {
        q: "What stops it doing something expensive or wrong?",
        a: "Three layers. Tools are typed and scoped, so the agent can only call the operations you approved, with the permissions of the user it acts for. Policy guardrails and spend caps sit around every run. And anything below a confidence threshold, or touching a rule you marked sensitive, stops and escalates to a person with its reasoning attached.",
      },
      {
        q: "How is this different from the chatbot we already tried?",
        a: "A chatbot retrieves text and answers. An agent plans a sequence of steps, calls your systems to change state, checks its own work, and reports what it did. The engineering difference is mostly not the model. It is the orchestration, the tool layer and the evaluation harness, which is where our work goes.",
      },
      {
        q: "Who owns the code and the prompts?",
        a: "You do, from day one of the pilot. Code, prompts, the evaluation set and infrastructure definitions land in your repository under your licence. There is no runtime of ours you have to keep paying for, and no lock-in if you take it in-house afterwards.",
      },
      {
        q: "What does it cost to run once it is live?",
        a: "We report cost per task, not a monthly guess, from the pilot onward: model spend, infrastructure and the monitoring overhead. For most triage and document workflows it lands well under the cost of the manual step, and if it does not, that shows up in week six rather than after a year.",
      },
      {
        q: "Can you work with the team we already have?",
        a: "Yes, and it is usually the better arrangement. We pair with your engineers through the pilot so they can maintain it, or run it as a dedicated team inside your process. Handover documentation is part of the deliverable either way.",
      },
    ],
  },
  related: {
    title: "What agent work usually needs alongside it",
    items: [
      {
        title: "Generative AI integration",
        text: "Retrieval over your own documents and copilots inside existing screens, usually the layer an agent reads from.",
        href: "/services#ai",
      },
      {
        title: "Data engineering",
        text: "If the agent's answers have to reconcile with reporting, the pipeline and the warehouse come first.",
        href: "/services#data",
      },
      {
        title: "Cloud & DevOps",
        text: "Deployment, observability and the cost discipline that keeps an agent's spend predictable in production.",
        href: "/services/cloud-devops",
      },
    ],
  },
  contactBand: {
    eyebrow: "Start a pilot",
    title: "Bring us the workflow you would most like to stop doing by hand.",
    text: "Thirty minutes with the engineers who would build it. We will tell you whether an agent fits, what it would cost to find out, and what the number to beat should be.",
    cta: "Scope an agent pilot",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  },
};

/* Cloud & DevOps ------------------------------------------------------------ */

export const cloudDevopsDetail: ServiceDetailInput = {
  eyebrow: "Cloud & DevOps",
  title: "Infrastructure your team can change on a Tuesday afternoon.",
  intro:
    "Landing zones, pipelines and observability on AWS and Azure, written as code and handed over with the runbooks. The goal is a platform where a deploy is routine and the monthly bill is explainable.",
  metrics: [
    { value: "2 wks", label: "to a first infrastructure review" },
    { value: "IaC", label: "every environment as code" },
    { value: "Your account", label: "no runtime of ours to rent" },
  ],
  primaryCta: "Book an infrastructure review",
  heroDiagram: {
    caption: "One path to production",
    entry: { t: "Commit", d: "pull request · review" },
    core: { t: "Pipeline", d: "build · test · scan" },
    support: [
      { t: "Staging", d: "same IaC as prod" },
      { t: "Policy", d: "cost · security checks" },
    ],
    outcomes: [
      { t: "Production", d: "staged rollout" },
      { t: "Rollback", d: "one command" },
    ],
    status: { t: "Monitored after every deploy", d: "metrics · logs · alerts" },
  },
  build: {
    title: "Four pieces most platforms are missing",
    intro:
      "We start with whichever one is costing you the most: failed deploys, slow environments, or a bill nobody can explain.",
    patterns: [
      {
        number: "01",
        title: "Landing zones",
        text: "Accounts, networks, identity and guardrails set up once, as code, so every new environment starts compliant instead of being fixed afterwards.",
        items: ["Multi-account setup", "SSO and roles", "Policy as code"],
      },
      {
        number: "02",
        title: "CI/CD pipelines",
        text: "One pipeline from pull request to production, with tests and security scans that run on every change and a rollback that takes one command.",
        items: ["Build and test", "Security scans", "Staged rollout"],
      },
      {
        number: "03",
        title: "Observability & on-call",
        text: "Metrics, logs and traces wired up before go-live, with alerts that point at a runbook rather than a person guessing at 2am.",
        items: ["Dashboards", "Alert rules", "Runbooks"],
      },
      {
        number: "04",
        title: "Cost engineering",
        text: "Every resource tagged and reported per environment, idle capacity removed, and the defaults changed so the savings hold after we leave.",
        items: ["Tagging", "Right-sizing", "Monthly report"],
      },
    ],
  },
  architecture: {
    title: "The reference platform",
    intro:
      "AWS or Azure, in your own account. Region, network layout and compliance controls are decided per client, then written as code.",
    edge: [
      { t: "Source control", d: "GitHub · Bitbucket" },
      { t: "Identity", d: "SSO · least-privilege roles" },
      { t: "Environments", d: "dev · staging · production" },
    ],
    core: {
      label: "CI/CD pipeline",
      text: "Build, test, security scan and deploy on every merge. The same pipeline promotes to staging and production, so nothing reaches users by hand.",
    },
    layers: [
      { t: "Compute", d: "Containers on Docker and Kubernetes" },
      { t: "Data", d: "Managed databases with tested backups" },
      { t: "Network", d: "Private networking and endpoints" },
      { t: "Security", d: "Secrets, scanning and policy as code" },
    ],
    observability: {
      t: "Observability",
      d: "metrics · logs · traces · cost per environment · alerting with runbooks",
    },
    note: "Observability is the part most migrations leave for later, and the reason the first incident after go-live takes a day to diagnose. We put it in before the first workload moves.",
  },
  engagement: {
    eyebrow: "The engagement",
    jumpLabel: "The engagement",
    title: "Review, migrate, then hand over",
    intro:
      "Fixed fee for the review. You own the infrastructure code, pipelines and runbooks from day one, whether or not you continue with us.",
    cta: "Book a review",
    steps: [
      {
        label: "REVIEW",
        title: "Review what is running",
        text: "Architecture, pipelines, access and the last six months of the bill. You get a written review with the three changes that would matter most and what each would cost.",
      },
      {
        label: "BUILD",
        title: "Build the target platform",
        text: "Landing zone, pipelines and observability as code in your account, with staging built from the same definitions as production.",
      },
      {
        label: "MIGRATE",
        title: "Move workloads in waves",
        text: "One service at a time, each with a tested rollback and a cutover window agreed in advance. The riskiest workload goes last, not first.",
      },
      {
        label: "AFTER",
        title: "Operate or hand over",
        text: "We run on-call with agreed response times, or your team shadows us for a period and takes over with the runbooks and alerting already in place.",
      },
    ],
  },
  proof: {
    title: "What platform work has moved for clients",
    note: proofNote,
    metrics: [
      {
        value: "41%",
        label: "lower monthly cloud spend after migration and a CI/CD rebuild.",
        sector: "SaaS · APAC · NDA",
        placeholder: true,
      },
      {
        value: "12×",
        label: "more production deploys per week once releases stopped being manual.",
        sector: "SaaS · APAC · NDA",
        placeholder: true,
      },
      {
        value: "0",
        label: "hours of unplanned downtime across a wave-by-wave migration.",
        sector: "Telecom · NDA",
        placeholder: true,
      },
    ],
  },
  fit: {
    title: "When it is worth calling us",
    intro: "Usually one of these is already costing real money or real sleep.",
    items: [
      {
        sector: "SaaS",
        title: "The bill grows faster than revenue",
        text: "Spend nobody can attribute to a customer, a feature or an environment.",
      },
      {
        sector: "Fintech",
        title: "An audit is coming",
        text: "Access, change history and environment separation that have to be shown, not described.",
      },
      {
        sector: "eCommerce",
        title: "Seasonal peaks",
        text: "Capacity that has to scale up for a few weeks a year and back down again without anyone remembering to.",
      },
      {
        sector: "Facilities",
        title: "Deploys are an event",
        text: "Releases that need a weekend, a checklist and the one person who knows how.",
      },
      {
        sector: "Telecom",
        title: "Environments have drifted",
        text: "Staging that no longer matches production, so testing there proves very little.",
      },
      {
        sector: "Education",
        title: "A server room to retire",
        text: "On-premises systems that need to move before the hardware or the contract runs out.",
      },
    ],
  },
  faq: {
    title: "The ones buyers actually ask",
    intro:
      "If yours is not here, put it in the first call. We would rather rule ourselves out early than sell you a migration that cannot work.",
    items: [
      {
        q: "Do we have to move to AWS?",
        a: "No. We work on AWS and Azure, in your own account either way. If you already have a provider and a reason for it, we build there.",
      },
      {
        q: "Will the migration cause downtime?",
        a: "We plan for none and move workloads in waves, each with a tested rollback. Where a cutover window is unavoidable, it is agreed in advance and rehearsed in staging first.",
      },
      {
        q: "How do you bring the bill down without slowing things?",
        a: "Most savings come from four places: idle environments, oversized instances, storage nobody reads, and data transfer. We tag everything, report cost per environment, and change the defaults so the savings hold.",
      },
      {
        q: "Who is on call after go-live?",
        a: "Your choice. We can run on-call with agreed response times, or hand over the runbooks and alerting to your team after a period of shadowing.",
      },
      {
        q: "Who owns the infrastructure code?",
        a: "You do. Infrastructure definitions, pipeline configuration and runbooks live in your repository. Nothing depends on an account or tool of ours.",
      },
      {
        q: "Can you work with our existing DevOps team?",
        a: "Yes, and it is usually the better arrangement. We pair with them on the platform rebuild so they own it afterwards.",
      },
    ],
  },
  related: {
    title: "What platform work usually needs alongside it",
    items: [
      {
        title: "Data engineering",
        text: "Pipelines and warehouses that run on the same platform and the same deployment discipline.",
        href: "/services#data",
      },
      {
        title: "AI agent development",
        text: "Agents in production need predictable cost, observability and rollback, which is this platform.",
        href: "/services/ai-engineering",
      },
      {
        title: "Custom software development",
        text: "Line-of-business systems built to deploy through the pipeline from their first commit.",
        href: "/services/software-engineering",
      },
    ],
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Bring us the deploy you dread, or the bill you cannot explain.",
    text: "Thirty minutes with the engineers who would do the work. We will tell you what we would look at first, what a review would cost, and what the number to beat should be.",
    cta: "Book an infrastructure review",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  },
};

/* Custom software development ---------------------------------------------- */

export const customSoftwareDetail: ServiceDetailInput = {
  eyebrow: "Software Engineering",
  title: "Line-of-business software built to be handed over.",
  intro:
    "Domain modelling, API design and the integrations with what you already run, in .NET, Node.js or Python. Documented well enough that your own team, or another vendor, could take it on.",
  metrics: [
    { value: "2 wks", label: "between working demos" },
    { value: "Your repo", label: "from the first commit" },
    { value: "Fixed or team", label: "engagement model" },
  ],
  primaryCta: "Discuss a build",
  heroDiagram: {
    caption: "From domain to deployed",
    entry: { t: "Domain model", d: "workshops · ADRs" },
    core: { t: "API & services", d: ".NET · Node · Python" },
    support: [
      { t: "Integrations", d: "ERP · CRM · payments" },
      { t: "Data", d: "SQL Server · MySQL" },
    ],
    outcomes: [
      { t: "Web & mobile", d: "React · responsive" },
      { t: "Handover", d: "docs · runbooks" },
    ],
    status: { t: "Tested at commit level", d: "unit · API · regression" },
  },
  build: {
    title: "Four kinds of system we build most",
    intro:
      "Each one replaces something the business already does by hand, or in a system that has stopped keeping up.",
    patterns: [
      {
        number: "01",
        title: "Operations platforms",
        text: "Booking, scheduling, dispatch and invoicing on one system, replacing the phone calls and spreadsheets that hold the business together today.",
        items: ["Scheduling", "Dispatch", "Invoicing"],
      },
      {
        number: "02",
        title: "Customer portals",
        text: "Self-service for the requests your team answers by email: status, documents, bookings and account changes, tied to the same records staff use.",
        items: ["Self-service", "Documents", "Notifications"],
      },
      {
        number: "03",
        title: "Integration layers",
        text: "The service that sits between your ERP, CRM and payment systems so data moves once, correctly, instead of being re-keyed by hand.",
        items: ["ERP and CRM", "Payments", "Sync jobs"],
      },
      {
        number: "04",
        title: "Legacy replacement",
        text: "A system that has stopped keeping up, rebuilt alongside the old one and switched over module by module, with the data migrated and reconciled.",
        items: ["Parallel running", "Data migration", "Phased cutover"],
      },
    ],
  },
  architecture: {
    title: "How a build is structured",
    intro:
      "A service layer behind a typed API, so the web app, the mobile app and your existing systems all use the same rules. Stack choices follow what your team can maintain.",
    edge: [
      { t: "Web app", d: "React · responsive" },
      { t: "Mobile app", d: "iOS · Android" },
      { t: "Partner systems", d: "ERP · CRM · payments" },
    ],
    core: {
      label: "API & domain layer",
      text: "Business rules live in one place, versioned and tested. Every client (web, mobile, partner integration) calls the same typed API.",
    },
    layers: [
      { t: "Data", d: "SQL Server, MySQL or MongoDB" },
      { t: "Integrations", d: "Typed connectors with retries" },
      { t: "Auth & roles", d: "SSO and per-role permissions" },
      { t: "Background jobs", d: "Imports, reports, notifications" },
    ],
    observability: {
      t: "Testing & release",
      d: "unit tests at commit · API contract tests · regression suite · staged releases",
    },
    note: "The test suite is part of what you buy. Without it, the second phase of a project costs more than the first, because every change risks breaking something nobody remembers building.",
  },
  engagement: {
    eyebrow: "The engagement",
    jumpLabel: "The engagement",
    title: "Discovery, build, handover",
    intro:
      "Fixed price when the scope is clear, a dedicated team when it is not. Either way the code is in your repository from the first commit.",
    cta: "Discuss a build",
    steps: [
      {
        label: "DISCOVER",
        title: "Discovery",
        text: "Workshops with the people who use the current process, a domain model, the integration list and a written scope with a price or a team shape.",
      },
      {
        label: "BUILD",
        title: "Build in iterations",
        text: "Two-week iterations with a working demo on staging at the end of each. You see the software, not a status report.",
      },
      {
        label: "TEST",
        title: "Test and harden",
        text: "Regression, performance and security testing, data migration rehearsed against a copy of production, and a go-live checklist agreed with your team.",
      },
      {
        label: "AFTER",
        title: "Support or hand over",
        text: "A monthly support and change budget, or a handover with documentation and a walkthrough. Most clients do the first for a while, then the second.",
      },
    ],
  },
  proof: {
    title: "What custom builds have moved for clients",
    note: proofNote,
    metrics: [
      {
        value: "3.2×",
        label: "more online bookings after rebuilding booking and operations on one system.",
        sector: "Facilities · DE · NDA",
        placeholder: true,
      },
      {
        value: "94%",
        label: "of delivered projects shipped on the date agreed at the end of discovery.",
        sector: "Across delivered projects",
        placeholder: true,
      },
      {
        value: "8/10",
        label: "clients retained past their first project, most now on a third or fourth phase.",
        sector: "Across clients",
        placeholder: true,
      },
    ],
  },
  fit: {
    title: "When a custom build is the right call",
    intro: "Off-the-shelf software is usually cheaper. These are the cases where it is not.",
    items: [
      {
        sector: "Facilities",
        title: "Booking runs on the phone",
        text: "Scheduling, dispatch and invoicing held together by spreadsheets and one person who knows the system.",
      },
      {
        sector: "Healthcare",
        title: "Records and scheduling in separate tools",
        text: "Appointments, records and follow-ups spread across systems that do not share data.",
      },
      {
        sector: "eCommerce",
        title: "Stock and ordering across systems",
        text: "Three systems that disagree about what is in stock, reconciled by hand every week.",
      },
      {
        sector: "Education",
        title: "A student or staff portal",
        text: "Applications, documents and status requests that currently arrive by email.",
      },
      {
        sector: "Telecom",
        title: "Exceptions handled by email",
        text: "Failed orders and activations tracked in inboxes rather than in a system with a history.",
      },
      {
        sector: "Professional services",
        title: "A process nothing off-the-shelf fits",
        text: "Work that is the reason clients choose you, which a generic tool would flatten.",
      },
    ],
  },
  faq: {
    title: "The ones buyers actually ask",
    intro:
      "If yours is not here, put it in the first call. We would rather rule ourselves out early than sell you a build you do not need.",
    items: [
      {
        q: "Fixed price or dedicated team?",
        a: "Fixed price when the scope is stable enough to write down; a dedicated team when it will change as you learn. We recommend one at the end of discovery and explain why.",
      },
      {
        q: "Who owns the code?",
        a: "You do, from the first commit. It lives in your repository under your licence, and the documentation is part of the deliverable.",
      },
      {
        q: "Which stack will you use?",
        a: "Whichever your team can maintain. Most of our builds are C# / ASP.NET, Node.js or Python on SQL Server, MySQL or MongoDB, with React on the front end. If you already have a stack, we build in it.",
      },
      {
        q: "Can it integrate with the systems we already run?",
        a: "That is usually most of the work. ERP, CRM, payment and identity integrations are scoped in discovery, with a test environment for each one before the build starts.",
      },
      {
        q: "How do we see progress?",
        a: "A demo every two weeks on a staging environment you can use, plus your board and your repository. No status reports in place of working software.",
      },
      {
        q: "What happens after launch?",
        a: "Either we stay on with a monthly support and change budget, or we hand over with a walkthrough. Most clients do the first for a while and then the second.",
      },
    ],
  },
  related: {
    title: "What a custom build usually needs alongside it",
    items: [
      {
        title: "Web & mobile applications",
        text: "The front ends and store releases for the system, built against the same API.",
        href: "/services#product",
      },
      {
        title: "QA & test automation",
        text: "Independent regression and performance testing for builds where failures are expensive.",
        href: "/services#product",
      },
      {
        title: "Cloud & DevOps",
        text: "The pipeline and platform the system deploys through from its first commit.",
        href: "/services/cloud-devops",
      },
    ],
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Bring us the process that still runs on spreadsheets and email.",
    text: "Thirty minutes with the engineers who would build it. You leave with an approach, a rough shape of cost, and a view on whether off-the-shelf would do the job instead.",
    cta: "Discuss a build",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  },
};
