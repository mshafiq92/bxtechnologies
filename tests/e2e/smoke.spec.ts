import { expect, test } from "@playwright/test";

import { routes } from "./routes";

for (const route of routes) {
  test(`${route} loads cleanly`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    const response = await page.goto(route);
    expect(response?.status(), "HTTP status").toBe(200);

    // One h1, a real title, and the shared chrome.
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/bX Technologies/);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // No sideways scrolling at any width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);

    // Every image has an alt attribute (empty is fine for decorative images).
    expect(await page.locator("img:not([alt])").count()).toBe(0);

    // No links into the design prototypes.
    expect(await page.locator('a[href*=".dc.html"]').count()).toBe(0);

    expect(consoleErrors, "console errors").toEqual([]);
  });
}

test("unknown pages return the styled 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We could not find that page.");
  await expect(page.getByRole("link", { name: "Go to the home page" })).toBeVisible();
});

test("services and articles without content are 404s", async ({ page }) => {
  expect((await page.goto("/services/iot-embedded"))?.status()).toBe(404);
  expect((await page.goto("/insights/an-mvp-is-a-question"))?.status()).toBe(404);
  expect((await page.goto("/careers/frontend-engineer"))?.status()).toBe(404);
});

test("health check responds", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBe(true);
  expect(await res.json()).toEqual({ status: "ok" });
});
