import { expect, test, type Page } from "@playwright/test";

/*
 * Real submissions against the production build. The test server runs with FORMS_DRY_RUN, so
 * the server actions validate and "send" (log) without Resend or Turnstile.
 *
 * The rate limit still applies (5 sends per form per IP per 10 minutes, in memory). Each test
 * sends from its own address (X-Forwarded-For, trusted by the local test server) so tests, retries
 * and `--repeat-each` never share a quota. The limiter itself is unit-tested (lib/forms).
 */

let address = 0;
test.beforeEach(async ({ page }, info) => {
  address += 1;
  const project = info.project.name === "mobile" ? 2 : 1;
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `198.51.${project}${info.repeatEachIndex}${info.retry}.${address}`,
  });
});

/**
 * The apply form reads ?role= in the browser, so the prerendered form is a Suspense fallback
 * that React swaps for the live one after hydration. Files set before the swap are lost.
 */
async function waitForLiveForm(page: Page) {
  await page.waitForLoadState("networkidle");
}

test("home contact form sends an enquiry", async ({ page }) => {
  await page.goto("/#contact");
  const form = page.getByRole("form", { name: "Request a technical call" });
  await form.getByLabel("Name").fill("Test Person");
  await form.getByLabel("Work email").fill("test@example.com");
  await form.getByLabel("Your message").fill("E2E test, please ignore.");
  await form.getByRole("button", { name: "Request a technical call" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Received. An engineer will reply within one working day.",
  );
});

test("contact form shows the work-email error, then sends", async ({ page }) => {
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Send and book a call" });
  await form.getByRole("button", { name: "Send and book a call" }).click();
  const email = form.getByRole("textbox", { name: "Work email" });
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(form.getByText("Error: enter a work email address so we can reply.")).toBeVisible();
  await expect(email).toBeFocused();

  await email.fill("jane@company.de");
  await form.getByRole("radio", { name: "An AI pilot" }).click();
  await form.getByRole("button", { name: "Send and book a call" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Received. An engineer will reply within one working day.",
  );
});

test("application with a PDF CV is sent", async ({ page }) => {
  // No role is published, so the form offers a speculative application only.
  await page.goto("/careers/apply");
  await waitForLiveForm(page);
  const form = page.getByRole("form", { name: "Send application" });
  await expect(form.getByLabel("Applying for")).toHaveValue("speculative");
  await form.getByLabel("Full name").fill("Test Applicant");
  await form.getByLabel("Email", { exact: true }).fill("applicant@example.com");
  await form.locator('input[type="file"]').setInputFiles({
    name: "test-cv.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4\n%%EOF\n"),
  });
  await expect(form.getByText("test-cv.pdf")).toBeVisible();
  await form.getByLabel("What have you built that you are proud of?").fill("A test.");
  await form.getByLabel("What do you want to be doing in two years?").fill("Testing.");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send application" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Application received. You will hear back within a week.",
  );
});

test("application rejects a non-PDF CV", async ({ page }) => {
  await page.goto("/careers/apply");
  await waitForLiveForm(page);
  const form = page.getByRole("form", { name: "Send application" });
  await form.locator('input[type="file"]').setInputFiles({
    name: "photo.png",
    mimeType: "image/png",
    buffer: Buffer.from("png"),
  });
  await expect(form.getByText("Error: upload your CV as a PDF or DOCX file.")).toBeVisible();
});
