import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { routes } from "./routes";

/*
 * Accessibility: axe on every page at both widths, WCAG 2.2 A and AA, zero violations
 * (BUILD-PLAN-V2 acceptance: "Axe: no contrast failures ... focus visible everywhere").
 */

for (const route of routes) {
  test(`${route} has no axe violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    );
    expect(summary).toEqual([]);
  });
}

test("keyboard focus is always visible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "keyboard check runs on desktop");
  await page.goto("/");
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return "none";
      const s = getComputedStyle(el);
      return `${s.outlineStyle} ${s.outlineWidth}`;
    });
    expect(outline, `focus ring on tab stop ${i + 1}`).toMatch(/solid 2px/);
  }
});
