/* Insights listing and article page copy (bX v2 - Insights.dc.html, bX v2 - Article.dc.html). */
import type { ContactBandContent } from "@/lib/schemas/content";

export const insightsPage = {
  hero: {
    eyebrow: "Insights",
    title: "Notes from the work, not from the trend cycle.",
    intro:
      "Written by the engineers on the projects, usually because something surprised us. No vendor roundups, no predictions for next year.",
  },
  subscribe: {
    label:
      "Roughly two pieces a month. If you want them by email, we send a short digest and nothing else.",
    placeholder: "you@company.com",
    submit: "Subscribe",
    success: "Subscribed. The next digest arrives with the next piece.",
  },
  featured: { label: "Latest", cta: "Read the article" },
  all: {
    eyebrow: "All writing",
    title: "Recent pieces",
    // Design note addressed to bX; replace before launch once real drafts arrive.
    note: "Titles and summaries are placeholders shaped around work we have actually done. Send us the real drafts and they drop straight in.",
    allFilter: "Everything",
    empty: "Nothing under this topic yet.",
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Rather discuss it than read about it?",
    text: "Thirty minutes with the engineers who did the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};

export const articlePage = {
  onThisPage: "On this page",
  share: "Share",
  relatedService: {
    eyebrow: "Related service",
    moreLink: { label: "More insights", href: "/insights" },
  },
  keepReading: {
    eyebrow: "Keep reading",
    title: "More from the team",
    allLink: { label: "All insights", href: "/insights" },
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Have a workflow worth testing this way?",
    text: "Thirty minutes with the engineers who did the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "All services",
    secondaryHref: "/services",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};

/**
 * Per-article "Related service" panel copy, keyed by article slug.
 * The featured article's panel text is specific to it.
 */
export const articleRelatedService: Record<
  string,
  { title: string; text: string; cta: { label: string; href: string } }
> = {
  "agent-projects-fail-at-the-evaluation-harness": {
    title: "We run this as a six-week pilot",
    text: "One workflow, a working agent behind an evaluation harness, and a go/no-go number at the end. Fixed fee, and you keep the harness either way.",
    cta: { label: "Agentic AI service", href: "/services/agentic-ai" },
  },
};

/**
 * "On this page" links per article (labels are shorter than the headings in the design).
 * Each id must match an <H2 id="..."> in the article's MDX; a content test checks this.
 */
export const articleToc: Record<string, { id: string; label: string }[]> = {
  "agent-projects-fail-at-the-evaluation-harness": [
    { id: "s1", label: "Write the test set with the team" },
    { id: "s2", label: "Measure the workflow" },
    { id: "s3", label: "Make the harness cheap to run" },
    { id: "s4", label: "When the answer is no" },
  ],
};
