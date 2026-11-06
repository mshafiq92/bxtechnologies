import { expect, test } from "@playwright/test";

import { routes } from "./routes";

/*
 * No page may be wider than the phone it is shown on. A single element that does not wrap
 * (a long email address, a fixed-width box) makes the whole page pan sideways on phones.
 * Checked at the narrowest common phone widths, with the cookie banner open.
 */

const WIDTHS = [320, 360, 390] as const;

test.use({ storageState: { cookies: [], origins: [] } });

for (const width of WIDTHS) {
  test.describe(`${width}px wide`, () => {
    test.use({ viewport: { width, height: 800 } });

    for (const route of routes) {
      test(`${route} has no sideways scroll`, async ({ page }, info) => {
        test.skip(info.project.name !== "mobile", "phone widths run in the mobile project");
        await page.goto(route);
        const offenders = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          if (document.documentElement.scrollWidth <= vw) return [];
          return [...document.querySelectorAll("body *")]
            .filter((el) => el.getBoundingClientRect().right > vw + 1)
            .slice(0, 5)
            .map((el) => `${el.tagName.toLowerCase()} "${el.textContent?.trim().slice(0, 40)}"`);
        });
        expect(offenders).toEqual([]);
      });
    }
  });
}
