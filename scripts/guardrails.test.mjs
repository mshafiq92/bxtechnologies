import { describe, expect, it } from "vitest";

import { checkSource } from "./guardrails.mjs";

const rules = (path, text, options) => checkSource(path, text, options).map((p) => p.rule);

describe("guard rails", () => {
  describe("raw-colour", () => {
    it("flags hex colours outside the token file", () => {
      expect(rules("components/ui/x.tsx", 'const c = "#00AEEF";')).toContain("raw-colour");
      expect(rules("styles/globals.css", "a { color: #fff; }")).toContain("raw-colour");
    });

    it("allows hex colours in the token file", () => {
      expect(rules("styles/tokens.css", "--bg: #f4f8fb;")).toEqual([]);
    });

    it("flags colour functions and Tailwind palette classes", () => {
      expect(rules("styles/globals.css", "a { color: rgb(0 0 0); }")).toContain("raw-colour");
      expect(rules("components/a.tsx", '<p className="text-red-500">x</p>')).toContain(
        "raw-colour",
      );
      expect(rules("components/a.tsx", '<p className="bg-white">x</p>')).toContain("raw-colour");
    });

    it("does not flag bX tokens or anchor links", () => {
      expect(rules("components/a.tsx", '<p className="bg-brand-cyan text-ink">x</p>')).toEqual([]);
      expect(rules("components/a.tsx", '<a href="#add">x</a>')).toEqual([]);
    });

    it("respects guard-ignore", () => {
      expect(rules("app/layout.tsx", 'themeColor: "#F4F8FB", // guard-ignore: reason')).toEqual([]);
    });
  });

  describe("status-colour", () => {
    it("flags green on links and buttons", () => {
      expect(rules("components/a.tsx", '<a href="/x" className="text-status">Go</a>')).toContain(
        "status-colour",
      );
      expect(rules("components/a.tsx", '<button className="bg-brand-green">Go</button>')).toContain(
        "status-colour",
      );
    });

    it("flags green on metric numbers", () => {
      expect(
        rules("components/a.tsx", '<p className="text-metric text-success">68%</p>'),
      ).toContain("status-colour");
    });

    it("allows a green status dot", () => {
      expect(
        rules(
          "components/a.tsx",
          '<span className="bg-status size-2 rounded-pill" aria-hidden="true" />',
        ),
      ).toEqual([]);
    });
  });

  describe("copy rules", () => {
    it("flags em and en dashes in copy", () => {
      expect(rules("content/home.ts", 'title: "Fast — and safe"')).toContain("dash");
      expect(rules("components/a.tsx", "<p>WK 1–2</p>")).toContain("dash");
    });

    it("flags printed counts", () => {
      expect(rules("content/home.ts", 'cta: "All 12 services"')).toContain("printed-count");
      expect(rules("content/home.ts", 'label: "9 articles"')).toContain("printed-count");
      expect(rules("content/home.ts", 'label: "twelve services"')).toContain("printed-count");
    });

    it("allows approved phrasing", () => {
      expect(rules("content/home.ts", 'cta: "All services", t: "Four groups of services"')).toEqual(
        [],
      );
    });
  });

  describe("blocked-name", () => {
    const blockedNames = ["Acme Corp"];

    it("flags blocked client names in content", () => {
      expect(
        rules("content/work.ts", 'title: "Platform for Acme Corp"', { blockedNames }),
      ).toContain("blocked-name");
    });

    it("exempts the client logos file", () => {
      expect(rules("content/client-logos.ts", 'name: "Acme Corp"', { blockedNames })).toEqual([]);
    });
  });
});
