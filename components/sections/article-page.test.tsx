import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ArticlePage, { generateMetadata, generateStaticParams } from "@/app/insights/[slug]/page";
import { articleComponents } from "@/components/prose/article-components";
import { insightBodies } from "@/content/insights/bodies";
import { getArticleToc, getPublishedInsights } from "@/lib/content";

const SLUG = "agent-projects-fail-at-the-evaluation-harness";

// Vitest does not compile MDX; stand in a body that uses the same components the MDX does.
vi.mock("@/content/insights/bodies", () => ({
  insightBodies: {
    "agent-projects-fail-at-the-evaluation-harness": async () => ({
      default: ({ components }: { components: Record<string, React.ComponentType<never>> }) => {
        const { H2, PullQuote, Note } = components as unknown as {
          H2: React.ComponentType<{ id: string; children: React.ReactNode }>;
          PullQuote: React.ComponentType<{ children: React.ReactNode }>;
          Note: React.ComponentType<{ title: string; children: React.ReactNode }>;
        };
        return (
          <>
            <p>Every failed AI pilot we have been asked to review had the same shape.</p>
            <H2 id="s1">Write the test set with the people who do the job</H2>
            <PullQuote>An agent without an evaluation harness is a demo.</PullQuote>
            <H2 id="s2">Measure the workflow, not the model</H2>
            <H2 id="s3">Make the harness cheap to run</H2>
            <Note title="What this looks like in a six-week pilot">
              <p>Week one is the test set and the harness.</p>
            </Note>
            <H2 id="s4">When the honest answer is no</H2>
          </>
        );
      },
    }),
  },
}));

const renderArticle = async () =>
  render(await ArticlePage({ params: Promise.resolve({ slug: SLUG }) }));

describe("Article page", () => {
  it("is generated only for articles with a written body", () => {
    expect(generateStaticParams()).toEqual([{ slug: SLUG }]);
  });

  it("renders title block, article, related service, keep reading and contact band", async () => {
    const { container } = await renderArticle();
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["top", "article", "cta", "more", "contact"]);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Most agent projects fail at the evaluation harness, not the model",
    );
    expect(container).toHaveTextContent("12 September 2026 · 9 min read");
    expect(container).toHaveTextContent("BX Technologies engineering team");
  });

  it("links every on-this-page entry to a heading in the body", async () => {
    const { container } = await renderArticle();
    const nav = screen.getByRole("navigation", { name: "On this page" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Write the test set with the team",
      "Measure the workflow",
      "Make the harness cheap to run",
      "When the answer is no",
    ]);
    for (const a of links) {
      expect(container.querySelector(a.getAttribute("href")!)?.tagName).toBe("H2");
    }
  });

  it("shares the article's own URL", async () => {
    await renderArticle();
    const linkedIn = screen.getByRole("link", { name: "Share on LinkedIn" });
    expect(linkedIn.getAttribute("href")).toContain(encodeURIComponent(`/insights/${SLUG}`));
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Share by email" }).getAttribute("href")).toMatch(
      /^mailto:\?subject=/,
    );
  });

  it("links the related service and keeps unwritten articles unlinked", async () => {
    const { container } = await renderArticle();
    expect(screen.getByRole("link", { name: /AI Engineering services/ })).toHaveAttribute(
      "href",
      "/services/ai-engineering#ai-agent-development",
    );
    const keepReading = container.querySelector("section#more ul")!;
    expect(keepReading.querySelectorAll("li")).toHaveLength(3);
    expect(keepReading.querySelectorAll("a")).toHaveLength(0);
  });

  it("sets article metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: SLUG }) });
    expect(meta.title).toBe("Most agent projects fail at the evaluation harness, not the model");
    expect(meta.openGraph).toMatchObject({ type: "article", publishedTime: "2026-09-12" });
  });
});

describe("article content", () => {
  it("registers an MDX body for exactly the articles marked hasBody", async () => {
    const actual = await vi.importActual<{ insightBodies: Record<string, unknown> }>(
      "@/content/insights/bodies",
    );
    expect(Object.keys(actual.insightBodies).sort()).toEqual(
      getPublishedInsights()
        .map((i) => i.slug)
        .sort(),
    );
    expect(Object.keys(insightBodies)).toContain(SLUG);
  });

  it("has an <H2 id> in the MDX for every table-of-contents entry", () => {
    const mdx = readFileSync(join(process.cwd(), `content/insights/${SLUG}.mdx`), "utf8");
    for (const { id } of getArticleToc(SLUG)) expect(mdx).toContain(`<H2 id="${id}">`);
  });

  it("maps the components the MDX uses", () => {
    const mdx = readFileSync(join(process.cwd(), `content/insights/${SLUG}.mdx`), "utf8");
    const used = new Set([...mdx.matchAll(/<([A-Z][A-Za-z]+)/g)].map((m) => m[1]));
    for (const name of used) expect(articleComponents).toHaveProperty(name!);
  });
});
