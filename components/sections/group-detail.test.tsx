import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServiceDetailPage, { generateMetadata } from "@/app/services/[slug]/page";
import { getGroupPages, getServices } from "@/lib/content";

const renderGroup = async (slug: string) =>
  render(await ServiceDetailPage({ params: Promise.resolve({ slug }) }));

describe("Service group page (Cloud & DevOps)", () => {
  it("renders the sections in order with a jump bar", async () => {
    const { container } = await renderGroup("cloud-devops");
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual([
      "top",
      "deliver",
      "architecture",
      "delivery",
      "projects",
      "faq",
      "contact",
    ]);
    expect(screen.getByRole("navigation", { name: "Jump to" })).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it.each(getGroupPages().map((p) => [p.slug, p.group] as const))(
    "%s drills down into every service in its group, each with its own anchor",
    async (slug, key) => {
      const { container } = await renderGroup(slug);
      for (const service of getServices(key)) {
        const block = container.querySelector<HTMLElement>(`article#${service.slug}`);
        expect(block, service.slug).not.toBeNull();
        expect(within(block!).getByRole("heading", { level: 3 })).toHaveTextContent(service.name);
        for (const item of service.includes ?? []) expect(block).toHaveTextContent(item);
      }
    },
  );

  it("has a breadcrumb ending at the group and shows no figures", async () => {
    const { container } = await renderGroup("cloud-devops");
    const crumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(crumb).getByText("Cloud & DevOps")).toHaveAttribute("aria-current", "page");
    expect(container.querySelector("[data-metric]")).toBeNull();
  });

  it("keeps the questions compact: a short title, at most four, all closed", async () => {
    for (const p of getGroupPages()) expect(p.faq.items.length, p.slug).toBeLessThanOrEqual(4);
    await renderGroup("cloud-devops");
    const faq = screen.getByRole("region", { name: "Common questions" });
    for (const button of within(faq).getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("leaves out the projects section when a group has no projects yet", async () => {
    const { container } = await renderGroup("managed-it-services");
    expect(container.querySelector("section#projects")).toBeNull();
    const jump = screen.getByRole("navigation", { name: "Jump to" });
    expect(within(jump).queryByRole("link", { name: "Projects" })).toBeNull();
  });

  it("sets the page title from the group", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "cloud-devops" }) });
    expect(meta.title).toBe("Cloud & DevOps");
  });
});
