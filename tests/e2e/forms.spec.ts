import { expect, test, type Page } from "@playwright/test";

/*
 * Real submissions against the production build. The test server runs with FORMS_DRY_RUN, so
 * the server actions validate and "send" (log) without Resend or Turnstile.
 *
 * The rate limit still applies (5 sends per form per IP per 10 minutes, in memory), so
 * `--repeat-each` above 2 makes later submissions fail with the rate-limit error. That is the
 * limiter working; each normal run starts a fresh server.
 */

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
  await form.getByLabel("What are you trying to build or fix?").fill("E2E test, please ignore.");
  await form.getByRole("radio", { name: "Existing system" }).click();
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
  await form.getByLabel("Rough budget").selectOption("€25k to €75k");
  await form.getByRole("button", { name: "Send and book a call" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Received. An engineer will reply within one working day.",
  );
});

test("application with a PDF CV is sent", async ({ page }) => {
  await page.goto("/careers/apply?role=ai-engineer");
  await waitForLiveForm(page);
  const form = page.getByRole("form", { name: "Send application" });
  await expect(form.getByLabel("Applying for")).toHaveValue("ai-engineer");
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

test("digest subscribe form", async ({ page }) => {
  await page.goto("/insights");
  const form = page.getByRole("form", { name: "Subscribe to the insights digest" });
  await form.getByRole("textbox").fill("reader@example.com");
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Subscribed. The next digest arrives with the next piece.",
  );
});
