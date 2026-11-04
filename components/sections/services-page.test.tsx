import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServicesPage from "@/app/services/page";

describe("Services page", () => {
  it("renders the designed sections in order, after a jump bar", () => {
    const { container } = render(<ServicesPage />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual([
      "top",
      "ai",
      "data",
      "product",
      "teams",
      "stack",
      "engagement",
      "contact",
    ]);
    const jump = screen.getByRole("navigation", { name: "Jump to" });
    expect(
      within(jump)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#ai", "#data", "#product", "#teams", "#stack", "#engagement"]);
  });

  it("has one h1 and a breadcrumb back to Home", () => {
    const { container } = render(<ServicesPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    const crumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(crumb).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(crumb).getByText("Services")).toHaveAttribute("aria-current", "page");
  });

  it("lists every service, linking to its detail page or to the contact band", () => {
    const { container } = render(<ServicesPage />);
    const rows = ["ai", "data", "product", "teams"].flatMap((id) =>
      Array.from(container.querySelectorAll(`section#${id} a[href]`)),
    );
    expect(rows).toHaveLength(12);
    const hrefs = Object.fromEntries(
      rows.map((a) => [a.querySelector(".text-h4")?.textContent, a.getAttribute("href")]),
    );
    expect(hrefs["Agentic AI & agents"]).toBe("/services/agentic-ai");
    expect(hrefs["Cloud & DevOps"]).toBe("/services/cloud-devops");
    expect(hrefs["Custom software development"]).toBe("/services/custom-software");
    expect(hrefs["IoT & embedded"]).toBe("#contact");
  });

  it("ends with the Services contact band copy", () => {
    render(<ServicesPage />);
    const band = screen.getByRole("region", { name: "Not sure which service you need?" });
    expect(within(band).getByRole("link", { name: "Book a technical call" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
