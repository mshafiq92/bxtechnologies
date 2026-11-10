import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getInsight,
  getPublishedInsights,
  getAllRoles,
  getRolesWithDetail,
  getGroupPages,
} from "@/lib/content";

import { pageMetadata } from "./metadata";
import { articleLd, breadcrumbLd, jobPostingLd, organizationLd, groupLd } from "./structured-data";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("pageMetadata", () => {
  it("builds canonical, Open Graph and Twitter from one input", () => {
    const m = pageMetadata({ title: "About", description: "D", path: "/about" });
    expect(m.title).toBe("About");
    expect(m.alternates?.canonical).toBe("/about");
    expect(m.openGraph).toMatchObject({
      url: "/about",
      title: "About | BX Technologies",
      siteName: "BX Technologies",
      type: "website",
    });
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("keeps an absolute title as-is and marks articles", () => {
    const m = pageMetadata({
      title: "Home title",
      description: "D",
      path: "/x",
      absoluteTitle: true,
      article: { publishedTime: "2026-01-01" },
    });
    expect(m.title).toEqual({ absolute: "Home title" });
    expect(m.openGraph).toMatchObject({ title: "Home title", type: "article" });
  });
});

describe("sitemap", () => {
  it("lists every page with content and nothing else", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const paths = sitemap().map((e) => new URL(e.url).pathname);

    for (const p of getGroupPages()) expect(paths).toContain(`/services/${p.slug}`);
    for (const i of getPublishedInsights()) expect(paths).toContain(`/insights/${i.slug}`);
    for (const r of getRolesWithDetail()) expect(paths).toContain(`/careers/${r.slug}`);
    expect(paths).toEqual(expect.arrayContaining(["/", "/privacy", "/terms", "/cookies"]));
    expect(paths.some((p) => p.startsWith("/dev") || p.startsWith("/api"))).toBe(false);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("robots", () => {
  it("blocks everything on staging (SITE_NOINDEX=true)", async () => {
    vi.stubEnv("SITE_NOINDEX", "true");
    const { default: robots } = await import("@/app/robots");
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("allows crawling in production and points to the sitemap", async () => {
    vi.stubEnv("SITE_NOINDEX", "false");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://bxtechnologies.net");
    const { default: robots } = await import("@/app/robots");
    const r = robots();
    expect(r.rules).toMatchObject({ allow: "/", disallow: ["/dev/", "/api/"] });
    expect(r.sitemap).toBe("https://bxtechnologies.net/sitemap.xml");
  });
});

describe("structured data", () => {
  it("Organization leaves out placeholder social links", () => {
    const org = organizationLd();
    expect(org["@type"]).toBe("Organization");
    expect(org.sameAs).toEqual(["https://linkedin.com/company/bx-technologies"]);
  });

  it("BreadcrumbList links every item except the current page", () => {
    const ld = breadcrumbLd([
      { label: "Home", href: "/" },
      { label: "Careers", href: "/careers" },
      { label: "AI Engineer" },
    ]);
    const items = ld.itemListElement as Record<string, unknown>[];
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items[1]!.item).toMatch(/\/careers$/);
    expect(items[2]!.item).toBeUndefined();
  });

  it("Service, Article and JobPosting carry the required fields", () => {
    const page = getGroupPages()[0]!;
    expect(groupLd(page, page.eyebrow)).toMatchObject({ "@type": "Service", name: page.eyebrow });

    const insight = getInsight(getPublishedInsights()[0]!.slug)!;
    expect(articleLd(insight)).toMatchObject({
      "@type": "Article",
      headline: insight.title,
      datePublished: insight.date,
    });

    const job = jobPostingLd(getAllRoles().find((r) => r.slug === "ai-engineer")!)!;
    expect(job).toMatchObject({
      "@type": "JobPosting",
      title: "AI Engineer",
      employmentType: "FULL_TIME",
      jobLocation: { address: { addressLocality: "Islamabad", addressCountry: "PK" } },
    });
    expect(job.datePosted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(job.description).toContain("<strong>");
    expect(job.description).not.toContain("**");
  });

  it("JobPosting is skipped for a role without a posting date", () => {
    const role = { ...getAllRoles().find((r) => r.slug === "ai-engineer")!, datePosted: undefined };
    expect(jobPostingLd(role)).toBeNull();
  });
});
