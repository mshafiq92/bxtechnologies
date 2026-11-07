import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RoleDetailPage, { generateStaticParams as roleParams } from "@/app/careers/[slug]/page";
import ApplyPage from "@/app/careers/apply/page";
import CareersPage from "@/app/careers/page";

/*
 * Careers with open roles. Today no role is published (see company-pages.test.tsx), so this file
 * publishes the drafts in content/roles.ts to check what happens the day a role goes live: the
 * list, the role page and the apply form all come back without any code change.
 */

vi.mock("@/content/roles", async (orig) => {
  const { roles } = await orig<typeof import("@/content/roles")>();
  return { roles: roles.map((r) => ({ ...r, published: true })) };
});

vi.mock("@/lib/forms/actions", () => ({
  submitApplication: vi.fn(async () => ({ status: "success" })),
}));

let search = "";
vi.mock("next/navigation", async (orig) => ({
  ...(await orig<typeof import("next/navigation")>()),
  useSearchParams: () => new URLSearchParams(search),
  usePathname: () => "/",
}));

beforeEach(() => {
  search = "";
});

describe("Careers with published roles", () => {
  it("lists them: the AI Engineer links to its page, other roles to the form", () => {
    const { container } = render(<CareersPage />);
    expect(container.querySelector("[data-no-roles]")).toBeNull();
    expect(screen.getByRole("link", { name: /^AI Engineer/ })).toHaveAttribute(
      "href",
      "/careers/ai-engineer",
    );
    expect(screen.getByRole("link", { name: /^Frontend Engineer/ })).toHaveAttribute(
      "href",
      "/careers/apply?role=frontend-engineer",
    );
    const hero = container.querySelector("section#top") as HTMLElement;
    expect(within(hero).getByRole("link", { name: "See open roles" })).toHaveAttribute(
      "href",
      "#roles",
    );
  });

  it("generates a page only for roles with written detail", () => {
    expect(roleParams()).toEqual([{ slug: "ai-engineer" }]);
  });

  it("renders the role page with its glance card and apply links", async () => {
    render(await RoleDetailPage({ params: Promise.resolve({ slug: "ai-engineer" }) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("AI Engineer");
    expect(screen.getByText("About two weeks")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Roughly a third of the job is engineering judgement about when not to automate something.",
      ),
    ).toHaveProperty("tagName", "STRONG");
    for (const link of screen.getAllByRole("link", { name: "Apply for this role" })) {
      expect(link).toHaveAttribute("href", "/careers/apply?role=ai-engineer");
    }
  });

  it("offers every role plus a speculative application, and preselects ?role=", () => {
    search = "role=devops-platform-engineer";
    render(<ApplyPage />);
    const select = screen.getByRole("combobox", { name: "Applying for" });
    expect(select).toHaveValue("devops-platform-engineer");
    expect(
      within(select)
        .getAllByRole("option")
        .map((o) => o.textContent),
    ).toEqual([
      "AI Engineer",
      "Senior Backend Engineer",
      "Frontend Engineer",
      "DevOps / Platform Engineer",
      "QA Automation Engineer",
      "Speculative, no specific role",
    ]);
  });
});
