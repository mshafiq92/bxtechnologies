import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WorkPage from "@/app/work/page";
import { getProjects } from "@/lib/content";

describe("Work page", () => {
  it("renders hero, projects, after launch and contact band in order", () => {
    const { container } = render(<WorkPage />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["top", "projects", "support", "contact"]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("shows every project as Sector · NDA with a result in words and no figures", () => {
    const { container } = render(<WorkPage />);
    const cards = container.querySelectorAll("section#projects article");
    expect(cards).toHaveLength(getProjects().length);
    for (const card of Array.from(cards)) {
      expect(card.textContent).toMatch(/· NDA/);
      expect(card.querySelector("[data-metric]")).toBeNull();
    }
  });

  it("does not link project cards anywhere (no case studies)", () => {
    const { container } = render(<WorkPage />);
    expect(container.querySelectorAll("section#projects a")).toHaveLength(0);
  });
});
