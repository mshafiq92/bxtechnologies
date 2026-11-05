/*
 * Open roles. Copy verbatim from bX v2 - Careers.dc.html and bX v2 - Role Detail.dc.html.
 * Placeholder listings until bX sends the live ones. Only "AI Engineer" has a role page;
 * the others link straight to the application form, as in the design.
 */
import type { RoleInput } from "@/lib/schemas/content";

export const roles: RoleInput[] = [
  {
    slug: "senior-backend-engineer",
    title: "Senior Backend Engineer",
    team: "Engineering",
    summary:
      "Node.js and C#, service design, and the integrations that hold client systems together.",
    chips: ["Node.js", "C# / .NET", "SQL Server"],
    detail: null,
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    // OPEN: placeholder; set to the real publish date when the role goes live.
    datePosted: "2026-11-05",
    team: "AI engineering",
    experience: "3+ years",
    reportsTo: "Engineering lead",
    summary:
      "Retrieval systems, agent workflows and the evaluation harnesses that decide whether they ship.",
    chips: ["Python", "RAG", "LangGraph"],
    detail: {
      intro:
        "Build retrieval systems and agent workflows that go into production for European clients, and the evaluation harnesses that decide whether they should.",
      chips: ["Python", "RAG", "LangGraph", "pgvector", "Evaluation"],
      facts: [
        { value: "Islamabad office", label: "hybrid after probation" },
        { value: "Full-time", label: "permanent" },
      ],
      work: [
        "We build agent and retrieval systems for insurance, construction and education clients: claims triage, tender drafting, assistants that answer from policy documents. Most start as a six-week pilot with a fixed fee and a go/no-go number at the end, and the ones that pass go into daily operational use.",
        "You would own workflows end to end: talking to the people whose job the system touches, assembling the test set with them, building the pipeline, and running it in shadow mode beside the existing process until the numbers justify letting it act. **Roughly a third of the job is engineering judgement about when not to automate something.**",
      ],
      whatYouWillDo: [
        "Design and build retrieval pipelines (chunking, hybrid search, reranking) against client document sets that are messier than any benchmark.",
        "Build agent workflows with explicit tool boundaries, confidence thresholds and escalation paths.",
        "Write evaluation harnesses in week one and keep them fast enough to run on every change.",
        "Sit with client teams to turn their operational knowledge into labelled cases.",
        "Take systems into production: monitoring, cost control, model version management, and the handover documentation.",
        "Write up what you learn. Some of it ends up on our insights page under your name.",
      ],
      lookingFor: [
        "Three or more years writing production Python, with services you have owned and operated rather than only notebooks.",
        "Real experience with LLM applications: retrieval, tool use, structured output, and the failure modes of each.",
        'A habit of measuring. If you have ever said "it feels better since the change", you will find our first week uncomfortable.',
        "Comfort with SQL and at least one vector store; we mostly use pgvector.",
        "English good enough to run a working session with a German or EU client directly.",
      ],
      niceToHave: [
        "Cloud and pipeline experience: AWS, containers, CI/CD, infrastructure as code.",
        "Work in a regulated setting where decisions had to be explainable and auditable.",
        "Fine-tuning or model evaluation beyond prompt-level work.",
      ],
      offer: [
        "Market-competitive salary, reviewed annually, with the band discussed at the first call rather than at the end.",
        "Health cover, paid annual leave and flexibility when life needs it.",
        "Certification and conference budget, with time inside the working week to use it.",
        "European working hours: afternoons overlap CET, no night shifts.",
        "Direct client contact from your first engagement, not after two years of internal work.",
      ],
      hiringSteps: [
        {
          number: "01",
          title: "Application review",
          text: "A person reads it. You get an answer either way within a week.",
        },
        {
          number: "02",
          title: "Conversation with an engineer",
          text: "Forty-five minutes on what you have built and how you approach problems.",
        },
        {
          number: "03",
          title: "Technical session",
          text: "Ninety minutes on a realistic retrieval problem, in your own editor. No unpaid weekend project.",
        },
        {
          number: "04",
          title: "Offer conversation",
          text: "Scope, team, compensation and start date, with a director.",
        },
      ],
      glance: [
        { label: "Team", value: "AI engineering" },
        { label: "Location", value: "Islamabad" },
        { label: "Type", value: "Full-time" },
        { label: "Experience", value: "3+ years" },
        { label: "Reports to", value: "Engineering lead" },
        { label: "Hiring time", value: "About two weeks" },
      ],
      firstWork: {
        title: "What you would work on first",
        text: "Most new engineers join an in-flight pilot in week two, pairing on the evaluation harness before owning a workflow of their own.",
        link: {
          label: "Read how we run pilots",
          href: "/insights/agent-projects-fail-at-the-evaluation-harness",
        },
      },
      contactBand: {
        eyebrow: "Apply",
        title: "Interested but not sure you match every line?",
        text: "Apply anyway. The list above describes the role at its fullest; we have hired people who met two thirds of it and grew into the rest.",
        cta: "Apply for this role",
        ctaHref: "/careers/apply?role=ai-engineer",
        secondary: "Email us first",
        secondaryHref: "mailto:jobs@bxtechnologies.net",
      },
    },
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    team: "Engineering",
    summary: "React and React Native, design-system work, and interfaces operators use all day.",
    chips: ["React", "TypeScript", "React Native"],
    detail: null,
  },
  {
    slug: "devops-platform-engineer",
    title: "DevOps / Platform Engineer",
    team: "Data & cloud",
    summary: "Pipelines, landing zones and infrastructure as code across client environments.",
    chips: ["AWS", "Kubernetes", "Terraform"],
    detail: null,
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    team: "Quality engineering",
    summary:
      "Regression suites that run per build, performance testing, and validation work with our automotive partner.",
    chips: ["Automation", "Performance", "API testing"],
    detail: null,
  },
];
