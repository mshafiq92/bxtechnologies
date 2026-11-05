import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/*
 * Cookie banner and analytics consent, from a first visit (no stored choice).
 * Requests to Plausible are intercepted, so the check never leaves the machine.
 */

test.use({ storageState: { cookies: [], origins: [] } });

const banner = (page: Page) => page.locator("[data-cookie-banner]");

/** Records whether the Plausible script was requested, and answers it with an empty script. */
async function watchPlausible(page: Page) {
  const seen = { requested: false };
  await page.route("https://plausible.io/**", (route) => {
    seen.requested = true;
    return route.fulfill({ contentType: "text/javascript", body: "" });
  });
  return seen;
}

const consentCookie = async (page: Page) =>
  (await page.context().cookies()).find((c) => c.name === "bx_consent");

test("first visit: banner asks, and no analytics loads before a choice", async ({ page }) => {
  const plausible = await watchPlausible(page);
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  await expect(banner(page)).toHaveAttribute("data-cookie-banner", "notice");
  await page.waitForLoadState("networkidle");
  expect(plausible.requested, "Plausible must not load before consent").toBe(false);
  expect(await consentCookie(page)).toBeUndefined();
});

test("the open banner passes axe", async ({ page }) => {
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
});

test("Decline stores the choice, keeps analytics off and survives navigation", async ({ page }) => {
  const plausible = await watchPlausible(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Decline" }).click();
  await expect(banner(page)).toBeHidden();

  const cookie = await consentCookie(page);
  expect(cookie?.value).toBe("v1.denied");
  // Twelve months, give or take the test run.
  const days = (cookie!.expires - Date.now() / 1000) / 86400;
  expect(days).toBeGreaterThan(364);
  expect(days).toBeLessThan(366);

  await page.goto("/about");
  await expect(banner(page)).toBeHidden();
  await page.waitForLoadState("networkidle");
  expect(plausible.requested).toBe(false);
});

test("Accept loads Plausible, and withdrawing it from the footer turns it off", async ({
  page,
}) => {
  const plausible = await watchPlausible(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Accept" }).click();
  await expect(banner(page)).toBeHidden();
  await expect.poll(() => page.locator('script[src*="plausible.io"]').count()).toBe(1);
  expect(plausible.requested).toBe(true);
  await expect(page.locator('script[src*="plausible.io"]')).toHaveAttribute(
    "data-domain",
    "bxtechnologies.net",
  );

  // Footer "Cookie settings" reopens the settings with analytics on; switching it off reloads
  // the page without the script.
  await page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" }).click();
  const settings = banner(page);
  await expect(settings).toHaveAttribute("data-cookie-banner", "settings");
  const toggle = settings.getByRole("switch", { name: "Analytics" });
  await expect(toggle).toBeChecked();
  await toggle.uncheck();
  await Promise.all([
    page.waitForEvent("load"),
    settings.getByRole("button", { name: "Save choices" }).click(),
  ]);
  expect((await consentCookie(page))?.value).toBe("v1.denied");
  await expect(page.locator('script[src*="plausible.io"]')).toHaveCount(0);
});

test("keyboard: the banner is reachable early and both choices work by key", async ({
  page,
}, info) => {
  test.skip(info.project.name === "mobile", "keyboard check runs on desktop");
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  // Skip link first, then the banner's controls, before the header.
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(banner(page).getByRole("button", { name: "Decline" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(banner(page)).toBeHidden();
});

test("the Cookies policy's 'Cookie settings' link opens the settings", async ({ page }) => {
  await page.goto("/cookies");
  await banner(page).getByRole("button", { name: "Decline" }).click();
  await page.getByRole("link", { name: "Cookie settings" }).click();
  await expect(banner(page)).toHaveAttribute("data-cookie-banner", "settings");
});

test("on phones the banner is a bottom sheet that leaves the page usable", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "mobile", "layout check runs on mobile");
  await page.goto("/");
  const box = (await banner(page).boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(box.x).toBe(0);
  expect(box.width).toBe(viewport.width);
  expect(Math.round(box.y + box.height)).toBe(viewport.height);
  expect(box.height, "covers less than half the screen").toBeLessThan(viewport.height / 2);
});

test.describe("returning visitor", () => {
  test.use({
    storageState: {
      cookies: [
        {
          name: "bx_consent",
          value: "v1.denied",
          domain: "localhost",
          path: "/",
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    },
  });

  test("the notice is in the server HTML but never painted", async ({ page, request }) => {
    // New visitors get it with the first paint (no wait for JavaScript, no late LCP).
    expect(await (await request.get("/privacy")).text()).toContain('data-cookie-banner="notice"');

    // Returning visitors: hidden before first paint by the inline script, then removed.
    await page.goto("/privacy", { waitUntil: "commit" });
    await page.waitForSelector("html[data-consent='set']", { state: "attached" });
    await page.waitForLoadState("domcontentloaded");
    if (await banner(page).count()) await expect(banner(page)).toBeHidden();
    await page.waitForLoadState("load");
    await expect(banner(page)).toHaveCount(0);
  });
});
