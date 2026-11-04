import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitApplication, submitEnquiry, subscribe } from "./actions";
import { sendMail } from "./mail";
import { rateLimit, resetRateLimit } from "./rate-limit";
import { initialFormState } from "./state";
import { verifyTurnstile } from "./turnstile";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));
vi.mock("./mail", async (orig) => ({
  ...(await orig<typeof import("./mail")>()),
  sendMail: vi.fn(async () => ({ ok: true as const })),
}));
vi.mock("./turnstile", () => ({ verifyTurnstile: vi.fn(async () => true) }));

const mockedSend = vi.mocked(sendMail);
const mockedTurnstile = vi.mocked(verifyTurnstile);

function form(data: Record<string, string | File>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

const enquiry = {
  source: "contact",
  name: "Jane Fischer",
  company: "Fischer GmbH",
  email: "jane@fischer.de",
  need: "An AI pilot",
  message: "Claims triage is slow.",
  "cf-turnstile-response": "token",
};

beforeEach(() => {
  resetRateLimit();
  mockedSend.mockClear();
  mockedSend.mockResolvedValue({ ok: true });
  mockedTurnstile.mockResolvedValue(true);
});

describe("submitEnquiry", () => {
  it("emails the team (reply-to the sender) and acknowledges the sender", async () => {
    const state = await submitEnquiry(initialFormState, form(enquiry));
    expect(state).toEqual({ status: "success" });
    expect(mockedSend).toHaveBeenCalledTimes(2);
    const team = mockedSend.mock.calls[0]![0];
    expect(team.to).toBe("info@bxtechnologies.net");
    expect(team.replyTo).toBe("jane@fischer.de");
    expect(team.subject).toBe("Website enquiry: Jane Fischer (Fischer GmbH)");
    expect(team.text).toContain("Needs: An AI pilot");
    expect(mockedSend.mock.calls[1]![0].to).toBe("jane@fischer.de");
  });

  it("rejects an invalid email with the design's error", async () => {
    const state = await submitEnquiry(initialFormState, form({ ...enquiry, email: "nope" }));
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBe("Error: enter a work email address so we can reply.");
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const state = await submitEnquiry(initialFormState, form({ ...enquiry, website: "spam" }));
    expect(state).toEqual({ status: "success" });
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("blocks when Turnstile fails", async () => {
    mockedTurnstile.mockResolvedValueOnce(false);
    const state = await submitEnquiry(initialFormState, form(enquiry));
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/^Error: /);
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("reports an error, starting with Error:, when the team email fails", async () => {
    mockedSend.mockResolvedValueOnce({ ok: false, reason: "down" });
    const state = await submitEnquiry(initialFormState, form(enquiry));
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/^Error: .*info@bxtechnologies\.net/);
  });

  it("rate-limits repeated submissions from one address", async () => {
    for (let i = 0; i < 5; i++) {
      expect((await submitEnquiry(initialFormState, form(enquiry))).status).toBe("success");
    }
    const blocked = await submitEnquiry(initialFormState, form(enquiry));
    expect(blocked.message).toMatch(/too many attempts/);
  });
});

describe("subscribe", () => {
  it("notifies the team of a new subscriber", async () => {
    const state = await subscribe(initialFormState, form({ email: "reader@example.com" }));
    expect(state).toEqual({ status: "success" });
    expect(mockedSend.mock.calls[0]![0].subject).toBe("Insights digest: new subscriber");
  });
});

describe("submitApplication", () => {
  const application = {
    role: "ai-engineer",
    name: "Ali Khan",
    email: "ali@example.com",
    experience: "2 to 4",
    proud: "A retrieval pipeline.",
    future: "Agents in production.",
    consent: "on",
  };
  const pdf = () => new File(["%PDF-1.7"], "ali-khan-cv.pdf", { type: "application/pdf" });

  it("emails the careers inbox with the CV attached and the role title", async () => {
    const state = await submitApplication(initialFormState, form({ ...application, cv: pdf() }));
    expect(state).toEqual({ status: "success" });
    const team = mockedSend.mock.calls[0]![0];
    expect(team.to).toBe("jobs@bxtechnologies.net");
    expect(team.subject).toBe("Application: AI Engineer · Ali Khan");
    expect(team.attachments?.[0]?.filename).toBe("ali-khan-cv.pdf");
    expect(team.attachments?.[0]?.content.byteLength).toBe(8);
  });

  it("requires a CV, the right file type and consent", async () => {
    const noCv = await submitApplication(initialFormState, form(application));
    expect(noCv.fieldErrors?.cv).toBe("Error: add your CV so the team can read it.");

    const png = await submitApplication(
      initialFormState,
      form({ ...application, cv: new File(["x"], "cv.png", { type: "image/png" }) }),
    );
    expect(png.fieldErrors?.cv).toBe("Error: upload your CV as a PDF or DOCX file.");

    const { consent: _consent, ...withoutConsent } = application;
    const noConsent = await submitApplication(
      initialFormState,
      form({ ...withoutConsent, cv: pdf() }),
    );
    expect(noConsent.fieldErrors?.consent).toMatch(/^Error: /);
    expect(mockedSend).not.toHaveBeenCalled();
  });
});

describe("rateLimit", () => {
  it("allows the limit within the window, then blocks, then recovers", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimit("k", { limit: 3, windowMs: 1000 }, t)).toBe(true);
    expect(rateLimit("k", { limit: 3, windowMs: 1000 }, t + 10)).toBe(false);
    expect(rateLimit("k", { limit: 3, windowMs: 1000 }, t + 2000)).toBe(true);
  });
});
