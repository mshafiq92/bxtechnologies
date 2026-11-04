import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServiceDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/services/[slug]/page";

const renderService = async (slug: string) =>
  render(await ServiceDetailPage({ params: Promise.resolve({ slug }) }));

describe("Service Detail template", () => {
  it("is generated only for the services that have detail content", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "agentic-ai" },
      { slug: "cloud-devops" },
      { slug: "custom-software" },
    ]);
  });

  it("renders the designed sections in order with a jump bar", async () => {
    const { container } = await renderService("agentic-ai");
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual([
      "top",
      "build",
      "architecture",
      "delivery",
      "proof",
      "fit",
      "faq",
      "related",
      "contact",
    ]);
    const jump = screen.getByRole("navigation", { name: "Jump to" });
    expect(within(jump).getByRole("link", { name: "The pilot" })).toHaveAttribute(
      "href",
      "#delivery",
    );
  });

  it("uses each service's own copy, including the engagement label", async () => {
    await renderService("cloud-devops");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Infrastructure your team can change on a Tuesday afternoon.",
    );
    const jump = screen.getByRole("navigation", { name: "Jump to" });
    expect(within(jump).getByRole("link", { name: "The engagement" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", {
        name: "Bring us the deploy you dread, or the bill you cannot explain.",
      }),
    ).toBeInTheDocument();
  });

  it("has a three-level breadcrumb ending at the service", async () => {
    await renderService("custom-software");
    const crumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(crumb).getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(within(crumb).getByText("Custom software development")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("opens the first FAQ and keeps one open at a time", async () => {
    await renderService("agentic-ai");
    const faq = screen.getByRole("region", { name: "The ones buyers actually ask" });
    const buttons = within(faq).getAllByRole("button");
    expect(buttons).toHaveLength(6);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(buttons[3]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[3]).toHaveAttribute("aria-expanded", "true");
  });

  it("links related services to real pages", async () => {
    await renderService("agentic-ai");
    const related = screen.getByRole("region", {
      name: "What agent work usually needs alongside it",
    });
    const hrefs = within(related)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([
      "/services",
      "/services#ai",
      "/services#data",
      "/services/cloud-devops",
    ]);
  });

  it("sets the page title and description from the service", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "agentic-ai" }) });
    expect(meta.title).toBe("Agentic AI & agents");
    expect(meta.alternates?.canonical).toBe("/services/agentic-ai");
  });
});
