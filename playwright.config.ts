import { defineConfig, devices } from "@playwright/test";

/*
 * End-to-end, accessibility and visual tests (task T41), run against a production build.
 *
 *   npm run test:e2e      desktop (1440) + mobile (390): smoke, axe, interactions, forms
 *   npm run test:visual   full-page screenshots at 1440 and 390 vs committed baselines
 *
 * Visual baselines are stored per platform: fonts rasterise differently on Windows and Linux,
 * so CI runs the behavioural projects only.
 */

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  timeout: 45_000,
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled", caret: "hide" },
  },
  snapshotPathTemplate: "{testDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}",
  use: {
    baseURL,
    trace: "on-first-retry",
    reducedMotion: "reduce",
    // Start every test with a stored "declined" choice so the cookie banner stays out of the way;
    // consent.spec.ts clears it to test the banner itself.
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
  },
  projects: [
    {
      name: "desktop",
      testIgnore: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testIgnore: /visual\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "visual-1440",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "visual-390",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true },
    },
  ],
  webServer: {
    // CI builds in an earlier step; locally build first so the tests see the current code.
    command: process.env.CI
      ? `npm run start -- -p ${PORT}`
      : `npm run build && npm run start -- -p ${PORT}`,
    url: `${baseURL}/api/health`,
    reuseExistingServer: false,
    timeout: 240_000,
    env: {
      // Log emails and skip Turnstile on the test server only.
      FORMS_DRY_RUN: "true",
      SITE_NOINDEX: "true",
      NEXT_PUBLIC_SITE_URL: baseURL,
      // Analytics is configured so consent.spec.ts can check it loads only after Accept
      // (requests to Plausible are intercepted; nothing leaves the machine).
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "bxtechnologies.net",
    },
  },
});
