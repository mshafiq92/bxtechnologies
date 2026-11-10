import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import InsightsPage from "@/app/insights/page";
import { formatDate, formatReadTime } from "@/lib/format";

// Forms post to server actions; stub them so UI tests don't need a request context.
vi.mock("@/lib/forms/actions", () => ({
  submitEnquiry: vi.fn(async () => ({ status: "success" })),
  subscribe: vi.fn(async () => ({ status: "success" })),
  submitApplication: vi.fn(async () => ({ status: "success" })),
}));

let search = "";
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(search),
  usePathname: () => "/insights",
}));

beforeEach(() => {
  search = "";
  window.history.replaceState(null, "", "/insights");
});

const listRows = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("section#all li")).map(
    (li) => li.querySelector(".text-h4")?.textContent,
  );

describe("Insights page", () => {
  it("renders hero, featured, all writing and contact band in order", () => {
    const { container } = render(<InsightsPage />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["top", "featured", "all", "contact"]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("links the featured article to its page", () => {
    const { container } = render(<InsightsPage />);
    const link = container.querySelector("section#featured a");
    expect(link).toHaveAttribute("href", "/insights/agent-projects-fail-at-the-evaluation-harness");
    expect(link).toHaveTextContent("Latest · Agentic AI");
    expect(link).toHaveTextContent("12 September 2026 · 9 min read");
  });

  it("lists every other article, linking only those with a written body", () => {
    const { container } = render(<InsightsPage />);
    expect(listRows(container)).toHaveLength(9);
    expect(listRows(container)).not.toContain(
      "Most agent projects fail at the evaluation harness, not the model",
    );
    // None of the listed pieces has a body yet, so no row is a link (no broken links).
    expect(container.querySelectorAll("section#all li a")).toHaveLength(0);
  });

  it("filters by topic, keeps one pill pressed and syncs the URL", () => {
    const { container } = render(<InsightsPage />);
    const group = screen.getByRole("group", { name: "Filter by topic" });
    const product = within(group).getByRole("button", { name: "Product" });
    fireEvent.click(product);
    expect(product).toHaveAttribute("aria-pressed", "true");
    expect(within(group).getByRole("button", { name: "Everything" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(listRows(container)).toEqual([
      "An MVP is a question, not a smaller product",
      "Moving an SMB off spreadsheets without stopping the business",
    ]);
    expect(window.location.search).toBe("?topic=product");

    fireEvent.click(within(group).getByRole("button", { name: "Everything" }));
    expect(listRows(container)).toHaveLength(9);
    expect(window.location.search).toBe("");
  });

  it("starts filtered when the URL has a valid topic", () => {
    search = "topic=data-cloud";
    const { container } = render(<InsightsPage />);
    expect(listRows(container)).toEqual([
      "Your reporting is late because nobody owns the definition",
      "Cloud bills: the four line items that are usually the whole problem",
    ]);
  });

  it("ignores an unknown topic in the URL", () => {
    search = "topic=nonsense";
    const { container } = render(<InsightsPage />);
    expect(listRows(container)).toHaveLength(9);
  });
});

describe("format helpers", () => {
  it("formats dates and read times as in the design", () => {
    expect(formatDate("2026-09-12")).toBe("12 September 2026");
    expect(formatDate("2026-05-08")).toBe("8 May 2026");
    expect(formatReadTime(9)).toBe("9 min read");
    expect(formatReadTime(undefined)).toBeUndefined();
  });
});
