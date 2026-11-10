/* Insights listing and article page copy (bX v2 - Insights.dc.html, bX v2 - Article.dc.html). */
import type { ContactBandContent } from "@/lib/schemas/content";

export const insightsPage = {
  hero: {
    eyebrow: "Insights",
    title: "Notes from our engineering work",
    intro:
      "Practical lessons from real projects, written by the engineers who delivered them. No vendor roundups and no trend predictions.",
  },
  featured: { label: "Latest", cta: "Read the article" },
  all: {
    eyebrow: "All writing",
    title: "Recent pieces",
    allFilter: "Everything",
    empty: "Nothing under this topic yet.",
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Discuss your project with our engineers",
    text: "A 30-minute call with the engineers behind these articles, about your goals and how we would approach them.",
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
    title: "Put this approach to work on your project",
    text: "A 30-minute call with the engineers behind these articles, about your goals and how we would approach them.",
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
    text: "One workflow, a working agent with its evaluation harness, and a clear go or no-go result at the end. Fixed fee, and you keep the harness either way.",
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
