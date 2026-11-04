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
  getRoles,
  getRolesWithDetail,
  getSectors,
  getServiceGroups,
  getServices,
  getServicesWithDetail,
  getHomeProjects,
  legalSlugs,
  roleHref,
  serviceHref,
} from ".";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("services", () => {
  it("has four groups of three services", () => {
    expect(getServiceGroups().map((g) => g.key)).toEqual(["ai", "data", "product", "teams"]);
    for (const group of getServiceGroups()) {
      expect(getServices(group.key)).toHaveLength(3);
    }
  });

  it("has detail pages for the three designed services", () => {
    expect(getServicesWithDetail().map((s) => s.slug)).toEqual([
      "agentic-ai",
      "cloud-devops",
      "custom-software",
    ]);
  });

  it("links to a detail page when one exists, otherwise to the group", () => {
    expect(serviceHref(getServices().find((s) => s.slug === "cloud-devops")!)).toBe(
      "/services/cloud-devops",
    );
    expect(serviceHref(getServices().find((s) => s.slug === "iot-embedded")!)).toBe(
      "/services#data",
    );
  });

  it("builds the mega menu from the services list", () => {
    const { megaMenu } = getNavigation();
    expect(megaMenu.groups.map((g) => g.title)).toEqual([
      "AI & Autonomy",
      "Data & Cloud",
      "Product Engineering",
      "Teams & Advisory",
    ]);
    expect(megaMenu.groups[2]?.links[0]).toEqual({
      label: "Custom software",
      href: "/services/custom-software",
    });
    expect(megaMenu.groups[3]?.links[2]?.label).toBe("Blockchain & distributed");
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

  it("marks proof metrics as placeholders until bX signs them off", () => {
    const proof = [
      ...getProjects().map((p) => p.metric),
      ...getSectors().map((s) => s.metric),
      ...getServicesWithDetail().flatMap((s) => s.detail.proof.metrics),
    ];
    expect(proof.length).toBeGreaterThan(0);
    for (const m of proof) expect(m.placeholder).toBe(true);
  });

  it("shows only cleared client logos (current logos are cleared by decision)", () => {
    const logos = getClientLogos();
    expect(logos.length).toBe(8);
    expect(logos.every((l) => l.cleared)).toBe(true);
  });

  it("features three projects on Home", () => {
    expect(getHomeProjects().map((p) => p.metric.value)).toEqual(["68%", "3.2×", "41%"]);
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
  it("has a role page only for the AI Engineer", () => {
    expect(getRolesWithDetail().map((r) => r.slug)).toEqual(["ai-engineer"]);
    const backend = getRoles().find((r) => r.slug === "senior-backend-engineer")!;
    expect(roleHref(backend)).toBe("/careers/apply?role=senior-backend-engineer");
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
  ]);
  const dynamicRoutes = new Set([
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
