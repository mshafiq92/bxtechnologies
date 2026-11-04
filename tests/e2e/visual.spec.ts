import { expect, test } from "@playwright/test";

import { routeName, routes } from "./routes";

/*
 * Full-page visual regression at 1440 and 390 (projects visual-1440 / visual-390).
 * Baselines live in tests/e2e/__screenshots__/<platform>/; update them deliberately with
 *   npm run test:visual -- --update-snapshots
 * after reviewing the change. Reduced motion keeps the logo strip still.
 */

for (const route of routes) {
  test(`${route} matches its baseline`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${routeName(route)}.png`, { fullPage: true });
  });
}
