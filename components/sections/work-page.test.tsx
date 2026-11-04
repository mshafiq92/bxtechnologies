import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WorkPage from "@/app/work/page";

describe("Work page", () => {
  it("renders hero, projects, after launch and contact band in order", () => {
    const { container } = render(<WorkPage />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["top", "projects", "support", "contact"]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("jump bar has no visible label (Services pages only) and links to real anchors", () => {
    const { container } = render(<WorkPage />);
    const jump = screen.getByRole("navigation", { name: "Jump to" });
    expect(within(jump).queryByText("Jump to")).not.toBeInTheDocument();
    for (const link of within(jump).getAllByRole("link")) {
      const id = link.getAttribute("href")!.slice(1);
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("shows nine projects, each as Sector · Region · NDA with a navy metric", () => {
    const { container } = render(<WorkPage />);
    const cards = container.querySelectorAll("section#projects article");
    expect(cards).toHaveLength(9);
    for (const card of Array.from(cards)) {
      expect(card.textContent).toMatch(/· NDA/);
      const metric = card.querySelector("[data-metric]");
      expect(metric?.className).toContain("text-ink");
    }
  });

  it("does not link project cards anywhere (no case studies)", () => {
    const { container } = render(<WorkPage />);
    expect(container.querySelectorAll("section#projects a")).toHaveLength(0);
  });
});
