/*
 * Insights: categories, authors and articles.
 * Copy verbatim from bX v2 - Insights.dc.html and bX v2 - Article.dc.html.
 * Only the featured article has a written body (content/insights/<slug>.mdx); the rest are
 * placeholder titles shaped around real work, waiting for drafts from the team.
 */
import type { Author, InsightCategory, InsightInput } from "@/lib/schemas/content";

export const insightCategories: InsightCategory[] = [
  { slug: "ai-engineering", name: "AI engineering" },
  { slug: "data-cloud", name: "Data & cloud" },
  { slug: "product", name: "Product" },
  { slug: "working-with-us", name: "Working with us" },
];

export const authors: Author[] = [
  // OPEN-DECISIONS #7: real author name pending.
  { slug: "ai-engineering-author", name: "[Author name]", role: "AI engineering, bX Technologies" },
];

export const insights: InsightInput[] = [
  {
    slug: "agent-projects-fail-at-the-evaluation-harness",
    title: "Most agent projects fail at the evaluation harness, not the model",
    shortTitle: "Evaluation harness",
    category: "ai-engineering",
    topicLabel: "Agentic AI",
    date: "2026-09-12",
    readMinutes: 9,
    summary:
      "Teams spend weeks choosing between models and an afternoon deciding how they will know whether the thing works. We have started running it the other way round: write the test set with the people who do the job today, then pick a model against it. The pilots that go to production are the ones where that set existed in week one.",
    standfirst:
      "Teams spend weeks choosing between models and an afternoon deciding how they will know whether the thing works. We have started running it the other way round.",
    author: "ai-engineering-author",
    featured: true,
    hasBody: true,
    relatedService: "agentic-ai",
    keepReading: [
      "what-a-six-week-ai-pilot-actually-contains",
      "shadow-running-proving-automation-before-it-acts",
      "why-we-run-a-paid-discovery",
    ],
  },
  {
    slug: "what-a-six-week-ai-pilot-actually-contains",
    title: "What a six-week AI pilot actually contains",
    category: "ai-engineering",
    date: "2026-08-28",
    readMinutes: 7,
    summary:
      "The week-by-week shape of a pilot, what we hand over at the end, and the two conditions under which we recommend stopping.",
  },
  {
    slug: "reporting-is-late-because-nobody-owns-the-definition",
    title: "Your reporting is late because nobody owns the definition",
    category: "data-cloud",
    date: "2026-08-14",
    readMinutes: 6,
    summary:
      "Month-end pain is rarely a tooling problem. Three systems disagree about what a customer is, and the spreadsheet is where the disagreement gets resolved by hand.",
  },
  {
    slug: "an-mvp-is-a-question",
    title: "An MVP is a question, not a smaller product",
    category: "product",
    date: "2026-07-31",
    readMinutes: 5,
    summary:
      "Written for founders: how to pick the one thing the first build has to answer, and what we cut to get there in eight weeks.",
  },
  {
    slug: "retrieval-quality-is-a-data-problem",
    title: "Retrieval quality is a data problem wearing a model costume",
    category: "ai-engineering",
    date: "2026-07-17",
  },
  {
    slug: "shadow-running-proving-automation-before-it-acts",
    title: "Shadow running: how we prove automation before it acts",
    category: "ai-engineering",
    date: "2026-07-02",
    // Summary shown only in the article's "Keep reading" row.
    summary:
      "Running new automation beside the existing process, measured against it, before it is allowed to touch a customer.",
  },
  {
    slug: "what-we-put-in-place-in-week-one",
    title: "What we put in place in week one, before any feature",
    category: "working-with-us",
    date: "2026-06-19",
  },
  {
    slug: "moving-an-smb-off-spreadsheets",
    title: "Moving an SMB off spreadsheets without stopping the business",
    category: "product",
    date: "2026-06-05",
  },
  {
    slug: "cloud-bills-four-line-items",
    title: "Cloud bills: the four line items that are usually the whole problem",
    category: "data-cloud",
    date: "2026-05-22",
  },
  {
    slug: "why-we-run-a-paid-discovery",
    title: "Why we run a paid discovery instead of a free estimate",
    category: "working-with-us",
    date: "2026-05-08",
    // Summary shown only in the article's "Keep reading" row.
    summary:
      "A fixed price given before anyone has read the existing system is a guess someone pays for later.",
  },
];

/**
 * In the Insights list design, only the first three non-featured posts show a summary and read
 * time; the later ones are title-only rows. Pages use this to match the design exactly.
 */
export const insightsListSummaryLimit = 3;
