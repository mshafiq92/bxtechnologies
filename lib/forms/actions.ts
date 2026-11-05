"use server";

import { headers } from "next/headers";

import { getRole } from "@/lib/content";

import { clientIpFrom } from "./client-ip";
import { withCvLimit } from "./limits";
import { mailConfig, sendMail } from "./mail";
import { rateLimit } from "./rate-limit";
import {
  applicationSchema,
  CV_EXTENSIONS,
  CV_MAX_BYTES,
  enquirySchema,
  subscribeSchema,
  type Application,
  type Enquiry,
} from "./schemas";
import { HONEYPOT_FIELD as HONEYPOT, type FormState } from "./state";
import { verifyTurnstile } from "./turnstile";

/*
 * Server actions for the site forms (task T40): Home and Contact enquiries, job applications
 * (CV attached to the email) and the insights digest. Every action:
 *   1. drops honeypot submissions silently,
 *   2. rate-limits per IP,
 *   3. verifies Cloudflare Turnstile,
 *   4. validates with Zod,
 *   5. emails the team through Resend, and acknowledges the sender where it makes sense.
 */

const GENERIC_ERROR =
  "Error: the message could not be sent. Please try again, or email info@bxtechnologies.net.";
const SPAM_ERROR = "Error: we could not confirm you are not a bot. Please try again.";
const RATE_ERROR = "Error: too many attempts. Please wait a few minutes and try again.";

async function clientIp(): Promise<string> {
  return clientIpFrom(await headers(), process.env.VERCEL === "1");
}

function fields(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

/** Shared guard: honeypot, rate limit, Turnstile. Returns a state to stop with, or null. */
async function guard(formData: FormData, form: string): Promise<FormState | null> {
  if (String(formData.get(HONEYPOT) ?? "").trim() !== "") {
    // Pretend success so bots learn nothing.
    return { status: "success" };
  }
  const ip = await clientIp();
  if (!rateLimit(`${form}:${ip}`)) return { status: "error", message: RATE_ERROR };
  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: SPAM_ERROR };
  }
  return null;
}

const line = (label: string, value: string | undefined) => (value ? `${label}: ${value}\n` : "");

function enquiryText(e: Enquiry): string {
  return (
    `New enquiry from the ${e.source === "home" ? "home page" : "contact page"}\n\n` +
    line("Name", e.name) +
    line("Company", e.company) +
    line("Email", e.email) +
    line("Phone", e.phone) +
    line("Starting from", e.stage) +
    line("Needs", e.need) +
    line("Company size", e.companySize) +
    line("Budget", e.budget) +
    `\nMessage:\n${e.message ?? "(none)"}\n`
  );
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const stop = await guard(formData, "enquiry");
  if (stop) return stop;

  const parsed = enquirySchema.safeParse(fields(formData));
  if (!parsed.success) {
    return { status: "error", fieldErrors: fieldErrors(parsed.error.issues) };
  }
  const enquiry = parsed.data;
  const { enquiries } = mailConfig();

  const team = await sendMail({
    to: enquiries,
    replyTo: enquiry.email,
    subject: `Website enquiry: ${enquiry.name ?? enquiry.email}${enquiry.company ? ` (${enquiry.company})` : ""}`,
    text: enquiryText(enquiry),
  });
  if (!team.ok) return { status: "error", message: GENERIC_ERROR };

  // Acknowledge the sender; a failure here must not fail the enquiry.
  await sendMail({
    to: enquiry.email,
    replyTo: enquiries,
    subject: "We have your message",
    text:
      `Thank you${enquiry.name ? `, ${enquiry.name}` : ""}.\n\n` +
      "An engineer will reply within one working day with a time proposal for a short technical call.\n\n" +
      "bX Technologies\ninfo@bxtechnologies.net · +49 203 34689340\n",
  });
  return { status: "success" };
}

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const stop = await guard(formData, "subscribe");
  if (stop) return stop;

  const parsed = subscribeSchema.safeParse(fields(formData));
  if (!parsed.success) {
    return { status: "error", fieldErrors: fieldErrors(parsed.error.issues) };
  }
  const result = await sendMail({
    to: mailConfig().enquiries,
    replyTo: parsed.data.email,
    subject: "Insights digest: new subscriber",
    text: `New digest subscriber: ${parsed.data.email}\nDate: ${new Date().toISOString()}\n`,
  });
  return result.ok ? { status: "success" } : { status: "error", message: GENERIC_ERROR };
}

function applicationText(a: Application, cvName: string): string {
  return (
    `New application: ${a.role}\n\n` +
    line("Name", a.name) +
    line("Email", a.email) +
    line("Phone", a.phone) +
    line("Based in", a.location) +
    line("LinkedIn", a.linkedin) +
    line("GitHub or portfolio", a.portfolio) +
    line("Experience", a.experience) +
    line("Earliest start", a.start) +
    line("Heard about us", a.source) +
    `CV: ${cvName} (attached)\n` +
    `\nWhat have you built that you are proud of?\n${a.proud}\n` +
    `\nWhat do you want to be doing in two years?\n${a.future}\n` +
    "\nConsent: stored for up to twelve months for this and future roles.\n"
  );
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const stop = await guard(formData, "application");
  if (stop) return stop;

  const parsed = applicationSchema.safeParse(fields(formData));
  const errors = parsed.success ? {} : fieldErrors(parsed.error.issues);

  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = "Error: add your CV so the team can read it.";
  } else if (!CV_EXTENSIONS.test(cv.name)) {
    errors.cv = "Error: upload your CV as a PDF or DOCX file.";
  } else if (cv.size > CV_MAX_BYTES) {
    errors.cv = withCvLimit("Error: the CV is larger than 10 MB. Send a smaller file.");
  }
  if (!parsed.success || Object.keys(errors).length > 0) {
    return { status: "error", fieldErrors: errors };
  }

  const application = {
    ...parsed.data,
    // The form submits the role slug; email the readable title.
    role:
      parsed.data.role === "speculative"
        ? "Speculative, no specific role"
        : (getRole(parsed.data.role)?.title ?? parsed.data.role),
  };
  const file = cv as File;
  const { careers } = mailConfig();
  const team = await sendMail({
    to: careers,
    replyTo: application.email,
    subject: `Application: ${application.role} · ${application.name}`,
    text: applicationText(application, file.name),
    attachments: [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }],
  });
  if (!team.ok) {
    return {
      status: "error",
      message:
        "Error: the application could not be sent. Please try again, or email it to jobs@bxtechnologies.net.",
    };
  }

  await sendMail({
    to: application.email,
    replyTo: careers,
    subject: "We have your application",
    text:
      `Thank you, ${application.name}.\n\n` +
      "A person on the hiring team will read your application, and you will hear back within a week, including if the answer is no.\n\n" +
      "bX Technologies\njobs@bxtechnologies.net\n",
  });
  return { status: "success" };
}
