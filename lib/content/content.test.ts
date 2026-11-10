import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { ProjectSchema, ServiceSchema } from "@/lib/schemas/content";

import {
  getClientLogos,
  getEngagementModels,
  getFeaturedInsight,
  getInsights,
  getKeepReading,
  getLegalPage,
  getNavigation,
  getPage,
  getProjects,
  getPublishedInsights,
  getAllRoles,
  getRoles,
  getRolesWithDetail,
  getSectors,
  getServiceGroups,
  getServices,
  getServicesWithDetail,
  getGroupPages,
  groupHref,
  getHomeProjects,
  legalSlugs,
  roleHref,
  serviceHref,
} from ".";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("services", () => {
  it("has the groups in order and every service numbered in group order", () => {
    const keys = getServiceGroups().map((g) => g.key);
    expect(keys).toEqual(["ai", "data", "cloud", "managed", "product", "teams"]);
    expect(getServices()).toHaveLength(24);
    expect(getServices().map((s) => s.number)).toEqual(
      Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
    expect(getServices().map((s) => s.slug)).toEqual(
      keys.flatMap((key) => getServices(key).map((s) => s.slug)),
    );
  });

  it("puts every service in a group that exists", () => {
    const keys = new Set<string>(getServiceGroups().map((g) => g.key));
    for (const service of getServices()) expect(keys, service.slug).toContain(service.group);
  });

  it("has at least three services in every group", () => {
    for (const group of getServiceGroups()) {
      expect(getServices(group.key).length, group.key).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps Managed IT and Cloud in separate groups", () => {
    expect(getServices("cloud").map((s) => s.name)).toEqual([
      "Cloud deployment",
      "Cloud migration",
      "Monitoring & observability",
      "CI/CD pipelines",
    ]);
    expect(getServices("managed").map((s) => s.name)).toEqual([
      "Device support",
      "Field engineering",
      "Technical support (L1-L3)",
      "Network troubleshooting",
    ]);
  });

  it("never claims insurance or utilities work in group or service copy", () => {
    const copy = JSON.stringify([getServiceGroups(), getServices(), getProjects()]);
    expect(copy).not.toMatch(/insurance|utilities/i);
  });

  it("has no single-service detail pages: every group has a group page", () => {
    expect(getServicesWithDetail()).toEqual([]);
    expect(getGroupPages().map((p) => p.group)).toEqual(getServiceGroups().map((g) => g.key));
  });

  it("gives every group page real projects and a What's included list for each service", () => {
    const page = getGroupPages().find((p) => p.slug === "cloud-devops");
    expect(page?.group).toBe("cloud");
    const projectSlugs = new Set(getProjects().map((p) => p.slug));
    for (const p of getGroupPages()) {
      for (const slug of p.projects?.slugs ?? []) expect(projectSlugs, slug).toContain(slug);
    }
    for (const p of getGroupPages()) {
      for (const service of getServices(p.group)) {
        expect(service.includes?.length, service.slug).toBeGreaterThan(0);
      }
    }
  });

  it("links to the group page block, then a detail page, otherwise to the group", () => {
    expect(serviceHref(getServices().find((s) => s.slug === "cloud-deployment")!)).toBe(
      "/services/cloud-devops#cloud-deployment",
    );
    expect(serviceHref(getServices().find((s) => s.slug === "agentic-ai")!)).toBe(
      "/services/ai-autonomy#agentic-ai",
    );
    expect(groupHref("ai")).toBe("/services/ai-autonomy");
    expect(groupHref("cloud")).toBe("/services/cloud-devops");
    expect(groupHref("data")).toBe("/services/data-analytics");
    expect(serviceHref(getServices().find((s) => s.slug === "iot-embedded")!)).toBe(
      "/services/data-analytics#iot-embedded",
    );
  });

  it("builds the mega menu from the services list", () => {
    const { megaMenu } = getNavigation();
    expect(megaMenu.groups.map((g) => g.title)).toEqual([
      "AI & Autonomy",
      "Data & Analytics",
      "Cloud & DevOps",
      "Managed IT",
      "Product & Quality",
      "Teams & Advisory",
    ]);
    expect(megaMenu.groups[4]?.links[0]).toEqual({
      label: "Custom software",
      href: "/services/product-quality#custom-software",
    });
    expect(megaMenu.groups[5]?.links[3]?.label).toBe("Blockchain & distributed");
  });

  it("gives Home the shorter Startup & SMB sentence", () => {
    const full = getEngagementModels("full").models.at(-1)!.text;
    const home = getEngagementModels("home").models.at(-1)!.text;
    expect(full).toContain("six-figure programme");
    expect(home).not.toContain("six-figure programme");
  });
});

describe("business rules in content", () => {
  it("describes every project as Sector · Region · NDA", () => {
    for (const p of getProjects()) expect(p.sector).toMatch(/· NDA$/);
    expect(() =>
      ProjectSchema.parse({ ...getProjects()[0], sector: "Insurance · Acme Corp" }),
    ).toThrow();
  });

  it("shows no proof figures: projects and group pages carry none (owner decision)", () => {
    for (const p of getProjects()) expect(p).not.toHaveProperty("metric");
    expect(getServicesWithDetail()).toEqual([]);
  });

  it("links every sector to services that exist, and shows no sector figures", () => {
    const slugs = new Set(getServices().map((s) => s.slug));
    for (const sector of getSectors()) {
      expect(sector.services.length).toBeGreaterThan(0);
      for (const slug of sector.services) expect(slugs, `${sector.name}: ${slug}`).toContain(slug);
      expect(sector).not.toHaveProperty("metric");
    }
  });

  it("shows only cleared client logos (current logos are cleared by decision)", () => {
    const logos = getClientLogos();
    expect(logos.length).toBe(8);
    expect(logos.every((l) => l.cleared)).toBe(true);
  });

  it("features three projects on Home", () => {
    expect(getHomeProjects().map((p) => p.slug)).toEqual([
      "booking-operations-platform",
      "cloud-migration-cicd",
      "tender-drafting-assistant",
    ]);
  });

  it("rejects a service without a stack", () => {
    expect(() => ServiceSchema.parse({ ...getServices()[0], stack: [] })).toThrow();
  });
});

describe("insights", () => {
  it("lists newest first with one featured article", () => {
    const dates = getInsights().map((i) => i.date);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(getFeaturedInsight()?.slug).toBe("agent-projects-fail-at-the-evaluation-harness");
  });

  it("has an MDX body for every article marked hasBody", () => {
    expect(getPublishedInsights().length).toBeGreaterThan(0);
    for (const i of getPublishedInsights()) {
      expect(existsSync(join(root, "content/insights", `${i.slug}.mdx`))).toBe(true);
    }
  });

  it("returns the designed keep-reading list for the featured article", () => {
    expect(
      getKeepReading("agent-projects-fail-at-the-evaluation-harness").map((i) => i.title),
    ).toEqual([
      "What a six-week AI pilot actually contains",
      "Shadow running: how we prove automation before it acts",
      "Why we run a paid discovery instead of a free estimate",
    ]);
  });

  it("gives the article the section ids its on-this-page links use", () => {
    const body = read("content/insights/agent-projects-fail-at-the-evaluation-harness.mdx");
    for (const id of ["s1", "s2", "s3", "s4"]) expect(body).toContain(`<H2 id="${id}">`);
  });
});

describe("careers", () => {
  it("shows no roles while none is published (owner, 2026-11-07: no open positions)", () => {
    expect(getRoles()).toEqual([]);
    expect(getRolesWithDetail()).toEqual([]);
    // Drafts are kept, so opening a role later is a one-line change.
    expect(getAllRoles().length).toBeGreaterThan(0);
    for (const r of getAllRoles()) expect(r.published).toBe(false);
  });

  it("links a role to its page when it has one, otherwise to the application form", () => {
    const byId = (slug: string) => getAllRoles().find((r) => r.slug === slug)!;
    expect(roleHref(byId("ai-engineer"))).toBe("/careers/ai-engineer");
    expect(roleHref(byId("senior-backend-engineer"))).toBe(
      "/careers/apply?role=senior-backend-engineer",
    );
  });
});

describe("legal pages", () => {
  it.each(legalSlugs)("%s: every table-of-contents entry has a matching heading", (slug) => {
    const body = read(`content/legal/${slug}.mdx`);
    for (const { id } of getLegalPage(slug).toc) {
      expect(body).toContain(`<H2 id="${id}">`);
    }
  });
});

describe("links", () => {
  const staticRoutes = new Set([
    "/",
    "/services",
    "/work",
    "/insights",
    "/about",
    "/industries",
    "/careers",
    "/careers/apply",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/imprint",
  ]);
  const dynamicRoutes = new Set([
    ...getGroupPages().map((p) => `/services/${p.slug}`),
    ...getServicesWithDetail().map((s) => `/services/${s.slug}`),
    ...getPublishedInsights().map((i) => `/insights/${i.slug}`),
    ...getRolesWithDetail().map((r) => `/careers/${r.slug}`),
  ]);

  /** Collect every internal href in the content (page copy, collections, navigation). */
  function collectHrefs(value: unknown, out: string[] = []): string[] {
    if (Array.isArray(value)) value.forEach((v) => collectHrefs(v, out));
    else if (value && typeof value === "object") {
      for (const [key, v] of Object.entries(value)) {
        if (/href$/i.test(key) && typeof v === "string") out.push(v);
        else collectHrefs(v, out);
      }
    }
    return out;
  }

  it("points every internal link at a route that exists", () => {
    const hrefs = collectHrefs([
      getNavigation(),
      getServices(),
      ...(
        ["home", "services", "work", "insights", "about", "industries", "careers", "apply"] as const
      ).map((k) => getPage(k)),
      ...legalSlugs.map((s) => getLegalPage(s)),
    ]);
    const internal = hrefs.filter((h) => h.startsWith("/"));
    expect(internal.length).toBeGreaterThan(20);
    for (const href of internal) {
      const path = href.split(/[?#]/)[0]!;
      expect(staticRoutes.has(path) || dynamicRoutes.has(path), `unknown route: ${href}`).toBe(
        true,
      );
    }
  });
});
