import { describe, expect, it } from "vitest";

import {
  CONSENT_MAX_AGE_SECONDS,
  consentCookieString,
  consentPrePaintScript,
  hasGlobalPrivacyControl,
  parseConsent,
  readConsentCookie,
  serializeConsent,
} from "./consent";

describe("consent cookie", () => {
  it("round-trips a choice", () => {
    for (const analytics of [true, false]) {
      expect(parseConsent(serializeConsent({ analytics }))).toEqual({ analytics });
    }
  });

  it("treats unknown, malformed or older-version values as no choice", () => {
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("yes")).toBeNull();
    expect(parseConsent("v0.granted")).toBeNull();
    expect(parseConsent("v1.maybe")).toBeNull();
  });

  it("reads bx_consent among other cookies", () => {
    expect(readConsentCookie("a=1; bx_consent=v1.granted; b=2")).toEqual({ analytics: true });
    expect(readConsentCookie("a=1")).toBeNull();
  });

  it("writes a twelve-month, site-wide, Lax cookie (Secure on https)", () => {
    const http = consentCookieString({ analytics: false }, false);
    expect(http).toBe(
      `bx_consent=v1.denied; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax`,
    );
    expect(CONSENT_MAX_AGE_SECONDS).toBe(365 * 24 * 60 * 60);
    expect(consentCookieString({ analytics: true }, true)).toMatch(/; Secure$/);
  });

  it("detects Global Privacy Control", () => {
    expect(hasGlobalPrivacyControl({ globalPrivacyControl: true } as unknown as Navigator)).toBe(
      true,
    );
    expect(hasGlobalPrivacyControl({} as Navigator)).toBe(false);
    expect(hasGlobalPrivacyControl(undefined)).toBe(false);
  });
});

describe("pre-paint script", () => {
  const run = (cookie: string, gpc = false) => {
    const doc = { cookie, documentElement: { dataset: {} as Record<string, string> } };
    new Function("document", "navigator", consentPrePaintScript())(doc, {
      globalPrivacyControl: gpc,
    });
    return doc.documentElement.dataset.consent;
  };

  it("marks a current stored choice or GPC, and nothing else", () => {
    expect(run("a=1; bx_consent=v1.denied")).toBe("set");
    expect(run("bx_consent=v1.granted; b=2")).toBe("set");
    expect(run("")).toBeUndefined();
    expect(run("bx_consent=v0.denied")).toBeUndefined();
    expect(run("xbx_consent=v1.denied")).toBeUndefined();
    expect(run("", true)).toBe("set");
  });
});
