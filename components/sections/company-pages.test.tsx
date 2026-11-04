import { readFileSync } from "node:fs";
import { join } from "node:path";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import RoleDetailPage, { generateStaticParams as roleParams } from "@/app/careers/[slug]/page";
import ApplyPage from "@/app/careers/apply/page";
import CareersPage from "@/app/careers/page";
import ContactPage from "@/app/contact/page";
import IndustriesPage from "@/app/industries/page";
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
  const body = (slug: "privacy" | "terms" | "cookies") => async () => ({
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
    legalBodies: { privacy: body("privacy"), terms: body("terms"), cookies: body("cookies") },
  };
});

beforeEach(() => {
  search = "";
});

const sectionIds = (c: HTMLElement) =>
  Array.from(c.querySelectorAll("section[id]")).map((s) => s.id);

describe("About", () => {
  it("renders every section, text-only hero until a real photo exists", () => {
    const { container } = render(<AboutPage />);
    expect(sectionIds(container)).toEqual([
      "top",
      "why",
      "principles",
      "people",
      "story",
      "offices",
      "contact",
    ]);
    expect(container.querySelector("section#top figure")).toBeNull();
  });

  it("shows five people with initials avatars and no stock photos", () => {
    const { container } = render(<AboutPage />);
    const people = container.querySelectorAll("section#people li");
    expect(people).toHaveLength(5);
    expect(container.querySelector("section#people img")).toBeNull();
    expect(people[0]).toHaveTextContent("LD");
  });
});

describe("Industries", () => {
  it("renders seven sectors with navy metrics", () => {
    const { container } = render(<IndustriesPage />);
    expect(sectionIds(container)).toEqual([
      "top",
      "clients",
      "sectors",
      "constraints",
      "other",
      "contact",
    ]);
    const metrics = container.querySelectorAll("section#sectors [data-metric]");
    expect(metrics).toHaveLength(7);
    for (const m of Array.from(metrics)) expect(m.className).toContain("text-ink");
  });
});

describe("Careers", () => {
  it("links the AI Engineer to its page and other roles to the form", () => {
    render(<CareersPage />);
    expect(screen.getByRole("link", { name: /^AI Engineer/ })).toHaveAttribute(
      "href",
      "/careers/ai-engineer",
    );
    expect(screen.getByRole("link", { name: /^Frontend Engineer/ })).toHaveAttribute(
      "href",
      "/careers/apply?role=frontend-engineer",
    );
  });

  it("anchors the apply band at #apply for the jump bar", () => {
    const { container } = render(<CareersPage />);
    expect(container.querySelector("section#apply")).toHaveTextContent(
      "Apply with a CV and one paragraph",
    );
  });
});

describe("Role Detail", () => {
  it("is generated only for roles with a page", () => {
    expect(roleParams()).toEqual([{ slug: "ai-engineer" }]);
  });

  it("renders the role, glance card and also-hiring list", async () => {
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
});

describe("Apply", () => {
  it("preselects the role from ?role=", () => {
    search = "role=devops-platform-engineer";
    render(<ApplyPage />);
    expect(screen.getByRole("combobox", { name: "Applying for" })).toHaveValue(
      "devops-platform-engineer",
    );
  });

  it("offers every role plus a speculative application", () => {
    render(<ApplyPage />);
    const options = within(screen.getByRole("combobox", { name: "Applying for" })).getAllByRole(
      "option",
    );
    expect(options.map((o) => o.textContent)).toEqual([
      "AI Engineer",
      "Senior Backend Engineer",
      "Frontend Engineer",
      "DevOps / Platform Engineer",
      "QA Automation Engineer",
      "Speculative, no specific role",
    ]);
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
  it.each(["privacy", "terms", "cookies"] as const)(
    "%s: title block, on-this-page links to real headings, legal band",
    async (slug) => {
      const { container } = render(await LegalPage({ slug }));
      expect(sectionIds(container)).toEqual(["top", "policy", "contact"]);
      expect(container).toHaveTextContent("17 September 2026");
      const nav = screen.getByRole("navigation", { name: "On this page" });
      for (const a of within(nav).getAllByRole("link")) {
        const href = a.getAttribute("href")!;
        if (href.startsWith("#")) expect(container.querySelector(href)).not.toBeNull();
        else expect(["/privacy", "/terms", "/cookies"]).toContain(href);
      }
    },
  );
});

describe("content fidelity", () => {
  it("keeps the design's paragraph breaks in every MDX file", () => {
    const D = ".claude/design-handoff/design_handoff_bx_v2/designs/";
    const pairs = [
      ["bX v2 - Privacy.dc.html", "content/legal/privacy.mdx"],
      ["bX v2 - Terms.dc.html", "content/legal/terms.mdx"],
      ["bX v2 - Cookies.dc.html", "content/legal/cookies.mdx"],
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
      const paragraphs = [...article.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => norm(m[1]!));
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
