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

  test(`${route} has SEO tags, a share image and valid JSON-LD`, async ({ page, request }) => {
    await page.goto(route);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname, "canonical").toBe(route);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);

    // Every page needs its own og:image (a page-level openGraph replaces the inherited one).
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage, "og:image").toBeTruthy();
    const image = await request.get(new URL(ogImage!).pathname + new URL(ogImage!).search);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");

    for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(json), "JSON-LD parses").not.toThrow();
      expect(JSON.parse(json)["@context"]).toBe("https://schema.org");
    }
  });
}

test("the test server is not indexable (SITE_NOINDEX=true)", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
});

test("sitemap lists the public pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const route of routes) {
    expect(xml, route).toContain(`${route === "/" ? "" : route}</loc>`);
  }
  expect(xml).not.toContain("/dev/");
});

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
