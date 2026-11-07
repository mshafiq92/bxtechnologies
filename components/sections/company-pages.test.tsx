import { readFileSync } from "node:fs";
import { join } from "node:path";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import { generateStaticParams as roleParams } from "@/app/careers/[slug]/page";
import ApplyPage from "@/app/careers/apply/page";
import CareersPage from "@/app/careers/page";
import ContactPage from "@/app/contact/page";
import IndustriesPage from "@/app/industries/page";
import { getLegalPage } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { renderInline } from "@/lib/inline";

import { isLikelyEmail } from "./contact-form";
import { LegalPage } from "./legal-page";

// Forms post to server actions; stub them so UI tests don't need a request context.
vi.mock("@/lib/forms/actions", () => ({
  submitEnquiry: vi.fn(async () => ({ status: "success" })),
  subscribe: vi.fn(async () => ({ status: "success" })),
  submitApplication: vi.fn(async () => ({ status: "success" })),
}));

let search = "";
vi.mock("next/navigation", async (orig) => ({
  ...(await orig<typeof import("next/navigation")>()),
  useSearchParams: () => new URLSearchParams(search),
  usePathname: () => "/",
}));

// Vitest does not compile MDX: legal bodies render a stand-in with one heading per TOC entry.
vi.mock("@/content/legal/bodies", async () => {
  const { getLegalPage } = await import("@/lib/content");
  const body = (slug: "privacy" | "terms" | "cookies" | "imprint") => async () => ({
    default: () => (
      <>
        {getLegalPage(slug).toc.map((t) => (
          <h2 key={t.id} id={t.id}>
            {t.label}
          </h2>
        ))}
      </>
    ),
  });
  return {
    legalBodies: {
      privacy: body("privacy"),
      terms: body("terms"),
      cookies: body("cookies"),
      imprint: body("imprint"),
    },
  };
});

beforeEach(() => {
  search = "";
});

const sectionIds = (c: HTMLElement) =>
  Array.from(c.querySelectorAll("section[id]")).map((s) => s.id);

describe("About", () => {
  it("renders every section, with the glance card standing in for the photo", () => {
    const { container } = render(<AboutPage />);
    expect(sectionIds(container)).toEqual([
      "top",
      "why",
      "mission",
      "principles",
      "clients",
      "story",
      "offices",
      "contact",
    ]);
    // No stock photo: the hero shows the "BX at a glance" card until a real photo exists.
    expect(container.querySelector("section#top img")).toBeNull();
    expect(container.querySelector("section#top figure")).toHaveTextContent("BX at a glance");
  });

  it("hides the people section and its jump link until real names arrive", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelector("section#people")).toBeNull();
    expect(container.querySelector('a[href="#people"]')).toBeNull();
    expect(container).not.toHaveTextContent("[Name]");
    // Every jump link points at a section that exists.
    for (const a of Array.from(container.querySelectorAll('[data-jump-bar] a[href^="#"]'))) {
      expect(container.querySelector(a.getAttribute("href")!)).not.toBeNull();
    }
  });
});

describe("Industries", () => {
  it("renders six sectors under NDA, each linking to its services, with no figures", () => {
    const { container } = render(<IndustriesPage />);
    expect(sectionIds(container)).toEqual([
      "top",
      "clients",
      "sectors",
      "constraints",
      "other",
      "contact",
    ]);
    const sectors = container.querySelectorAll("section#sectors article");
    expect(sectors).toHaveLength(6);
    for (const sector of Array.from(sectors)) {
      expect(sector).toHaveTextContent("Under NDA");
      expect(sector.querySelectorAll('a[href^="/services"]').length).toBeGreaterThan(0);
    }
    expect(container.querySelector("section#sectors [data-metric]")).toBeNull();
    expect(container).not.toHaveTextContent(/placeholder/i);
  });
});

describe("Careers", () => {
  // No role is published (owner, 2026-11-07). The open-roles behaviour is covered in
  // careers-open-roles.test.tsx with the drafts published.
  it("says there are no open positions instead of listing draft roles", () => {
    const { container } = render(<CareersPage />);
    const roles = container.querySelector("section#roles")!;
    expect(roles.querySelector("[data-no-roles]")).toHaveTextContent("No open positions right now");
    expect(roles.querySelectorAll("ul li")).toHaveLength(0);
    expect(
      within(roles as HTMLElement).getByRole("link", { name: "Send a speculative CV" }),
    ).toHaveAttribute("href", "/careers/apply");
    expect(container).not.toHaveTextContent(/placeholder/i);
  });

  it("points the hero at a CV and the hiring process, and shows the Working at BX card", () => {
    const { container } = render(<CareersPage />);
    const hero = container.querySelector("section#top") as HTMLElement;
    expect(within(hero).getByRole("link", { name: "Send your CV" })).toHaveAttribute(
      "href",
      "/careers/apply",
    );
    expect(within(hero).getByRole("link", { name: /How we hire/ })).toHaveAttribute(
      "href",
      "#process",
    );
    expect(hero.querySelector("figure")).toHaveTextContent("Working at BX");
  });

  it("anchors the apply band at #apply for the jump bar", () => {
    const { container } = render(<CareersPage />);
    expect(container.querySelector("section#apply")).toHaveTextContent(
      "Apply with a CV and one paragraph",
    );
  });
});

describe("Role Detail", () => {
  it("generates no role pages while no role is published", () => {
    expect(roleParams()).toEqual([]);
  });
});

describe("Apply", () => {
  it("offers only a speculative application while no role is published", () => {
    search = "role=ai-engineer";
    render(<ApplyPage />);
    const select = screen.getByRole("combobox", { name: "Applying for" });
    expect(
      within(select)
        .getAllByRole("option")
        .map((o) => o.textContent),
    ).toEqual(["Speculative, no specific role"]);
    expect(select).toHaveValue("speculative");
  });

  it("rejects a CV that is not PDF or DOCX", () => {
    render(<ApplyPage />);
    const input = document.querySelector<HTMLInputElement>('input[type="file"]')!;
    fireEvent.change(input, {
      target: { files: [new File(["x"], "cv.png", { type: "image/png" })] },
    });
    expect(screen.getByText("Error: upload your CV as a PDF or DOCX file.")).toBeInTheDocument();
    fireEvent.change(input, {
      target: { files: [new File(["x"], "cv.pdf", { type: "application/pdf" })] },
    });
    expect(screen.getByText("cv.pdf")).toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("shows the design's work-email error and marks the field invalid", async () => {
    render(<ContactPage />);
    const form = screen.getByRole("form", { name: "Send and book a call" });
    fireEvent.submit(form);
    const email = within(form).getByRole("textbox", { name: "Work email" });
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Error: enter a work email address so we can reply.");
    expect(within(form).queryByRole("status")).toBeNull();

    fireEvent.change(email, { target: { value: "jane@company.de" } });
    fireEvent.submit(form);
    expect(email).not.toHaveAttribute("aria-invalid");
    expect(await within(form).findByRole("status")).toHaveTextContent(
      "Received. An engineer will reply within one working day.",
    );
  });

  it("has no contact band (the page is the contact form)", () => {
    const { container } = render(<ContactPage />);
    expect(sectionIds(container)).toEqual(["top", "next"]);
  });

  it("validates email shape like the design", () => {
    expect(isLikelyEmail("a@b.co")).toBe(true);
    expect(isLikelyEmail("nope")).toBe(false);
    expect(isLikelyEmail("a@b")).toBe(false);
  });
});

describe("Legal pages", () => {
  it.each(["privacy", "terms", "cookies", "imprint"] as const)(
    "%s: title block, on-this-page links to real headings, legal band",
    async (slug) => {
      const { container } = render(await LegalPage({ slug }));
      expect(sectionIds(container)).toEqual(["top", "policy", "contact"]);
      expect(container).toHaveTextContent(formatDate(getLegalPage(slug).lastUpdated));
      const nav = screen.getByRole("navigation", { name: "On this page" });
      for (const a of within(nav).getAllByRole("link")) {
        const href = a.getAttribute("href")!;
        if (href.startsWith("#")) expect(container.querySelector(href)).not.toBeNull();
        else expect(["/privacy", "/terms", "/cookies", "/imprint"]).toContain(href);
      }
    },
  );
});

describe("content fidelity", () => {
  it("keeps the design's paragraph breaks in every MDX file", () => {
    const D = ".claude/design-handoff/design_handoff_bx_v2/designs/";
    // The legal pages were revised with the owner (Privacy and Cookies on 2026-11-05, Terms on
    // 2026-11-07), so they no longer follow the design copy paragraph for paragraph. The article does.
    const pairs = [
      [
        "bX v2 - Article.dc.html",
        "content/insights/agent-projects-fail-at-the-evaluation-harness.mdx",
      ],
    ];
    const norm = (s: string) =>
      s
        .replace(/<[^>]+>|\*\*|`|\[|\]\([^)]*\)/g, "")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
    for (const [design, mdxPath] of pairs) {
      const html = readFileSync(join(process.cwd(), D + design!), "utf8");
      const article = /<article[^>]*>([\s\S]*?)<\/article>/.exec(html)![1]!;
      // The brand is written "BX" since the 2026-11-06 logo refresh; the designs still say "bX".
      const paragraphs = [...article.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) =>
        norm(m[1]!).replace(/\bbX\b/g, "BX"),
      );
      const mdx = readFileSync(join(process.cwd(), mdxPath!), "utf8").replace(
        /\{\/\*[\s\S]*?\*\/\}/g,
        "",
      );
      const blocks = mdx
        .split(/\n\s*\n/)
        .filter((b) => b.trim() && !/^[<-]/.test(b.trim()))
        .map(norm);
      const notes = [...mdx.matchAll(/<Note[^>]*>([\s\S]*?)<\/Note>/g)].map((m) => norm(m[1]!));
      for (const p of paragraphs)
        expect([...blocks, ...notes], `${mdxPath}: ${p.slice(0, 60)}`).toContain(p);
    }
  });

  it("renders **bold** in typed content", () => {
    const { container } = render(<p>{renderInline("Plain **bold** plain")}</p>);
    expect(container.querySelector("strong")).toHaveTextContent("bold");
    expect(container).toHaveTextContent("Plain bold plain");
  });
});
