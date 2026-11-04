import { expect, test } from "@playwright/test";

const isMobile = (name: string) => name === "mobile";

test.describe("header", () => {
  test("mega menu opens on hover and focus, closes on Escape", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "mega menu is desktop only");
    await page.goto("/");
    const services = page.getByRole("link", { name: "Services", exact: false }).first();
    const menu = page.locator("#bx-mega-menu");

    await services.hover();
    await expect(menu).toBeVisible();
    await page.getByRole("link", { name: "Work", exact: true }).first().hover();
    await expect(menu).toBeHidden();

    await services.focus();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Agentic AI & agents" }).first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(services).toBeFocused();
  });

  test("mobile menu opens, traps focus and closes on Escape", async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), "menu button is mobile only");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    await expect(page.locator("#bx-mobile-nav")).toBeVisible();
    await expect(button).toHaveText("Close");
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

    for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
    const inside = await page.evaluate(
      () => document.querySelector("header")?.contains(document.activeElement) ?? false,
    );
    expect(inside, "focus stays inside the header while the menu is open").toBe(true);

    await page.keyboard.press("Escape");
    await expect(page.locator("#bx-mobile-nav")).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });

  test("skip link moves focus to the main content", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "keyboard check runs on desktop");
    await page.goto("/services");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test("jump bar sticks under the header and anchors land below it", async ({ page }) => {
  await page.goto("/services");
  await page
    .getByRole("navigation", { name: "Jump to" })
    .getByRole("link", { name: "Teams & Advisory" })
    .click();
  await expect(page).toHaveURL(/#teams$/);
  const barBottom = await page
    .getByRole("navigation", { name: "Jump to" })
    .evaluate((el) => el.getBoundingClientRect().bottom);
  const headingTop = await page
    .getByRole("heading", { name: "Teams & Advisory", level: 2 })
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(barBottom).toBeLessThanOrEqual(73 + 54);
  expect(headingTop, "section heading is not hidden under the sticky bars").toBeGreaterThanOrEqual(
    barBottom,
  );
});

test("FAQ keeps one answer open", async ({ page }) => {
  await page.goto("/services/agentic-ai");
  const faq = page.getByRole("region", { name: "The ones buyers actually ask" });
  const first = faq.getByRole("button").nth(0);
  const second = faq.getByRole("button").nth(1);
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("insights topic filter updates the list and the URL", async ({ page }) => {
  await page.goto("/insights");
  const group = page.getByRole("group", { name: "Filter by topic" });
  await group.getByRole("button", { name: "Product" }).click();
  await expect(page).toHaveURL(/\?topic=product$/);
  await expect(page.locator("section#all li")).toHaveCount(2);

  await page.goto("/insights?topic=data-cloud");
  await expect(group.getByRole("button", { name: "Data & cloud" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator("section#all li")).toHaveCount(2);
});

test("reduced motion stops the logo marquee", async ({ page }) => {
  await page.goto("/");
  const animation = await page
    .locator("section[aria-label='Clients & partners'] ul")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("none");
});

test("marquee runs when motion is allowed", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto("/");
  const animation = await page
    .locator("section[aria-label='Clients & partners'] ul")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("marquee");
  await context.close();
});
