import { describe, expect, it } from "vitest";

import { basicAuthFromEnv, isAuthorized } from "./basic-auth";
import { clientIpFrom } from "./forms/client-ip";
import { resolveNoIndex, resolveSiteUrl } from "./site";

const header = (user: string, password: string) => `Basic ${btoa(`${user}:${password}`)}`;
const creds = { user: "bx", password: "s3cret:with-colon" };

describe("basic auth (staging password)", () => {
  it("is off unless both variables are set", () => {
    expect(basicAuthFromEnv({})).toBeNull();
    expect(basicAuthFromEnv({ BASIC_AUTH_USER: "bx" })).toBeNull();
    expect(basicAuthFromEnv({ BASIC_AUTH_USER: "bx", BASIC_AUTH_PASSWORD: "p" })).toEqual({
      user: "bx",
      password: "p",
    });
  });

  it("accepts only the exact user and password", () => {
    expect(isAuthorized(header("bx", "s3cret:with-colon"), creds)).toBe(true);
    expect(isAuthorized(header("bx", "s3cret"), creds)).toBe(false);
    expect(isAuthorized(header("bx", "s3cret:with-colonX"), creds)).toBe(false);
    expect(isAuthorized(header("BX", "s3cret:with-colon"), creds)).toBe(false);
    expect(isAuthorized(header("", ""), creds)).toBe(false);
  });

  it("rejects missing or malformed headers", () => {
    expect(isAuthorized(null, creds)).toBe(false);
    expect(isAuthorized("Bearer abc", creds)).toBe(false);
    expect(isAuthorized("Basic !!!not-base64", creds)).toBe(false);
    expect(isAuthorized(`Basic ${btoa("no-separator")}`, creds)).toBe(false);
  });
});

describe("site URL", () => {
  it("prefers NEXT_PUBLIC_SITE_URL", () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://bxtechnologies.net", VERCEL_URL: "x" }),
    ).toBe("https://bxtechnologies.net");
  });

  it("uses staging's stable URL and a preview's branch URL on Vercel", () => {
    expect(
      resolveSiteUrl({
        VERCEL_ENV: "production",
        VERCEL_PROJECT_PRODUCTION_URL: "bx-staging.vercel.app",
        VERCEL_URL: "bx-abc123.vercel.app",
      }),
    ).toBe("https://bx-staging.vercel.app");
    expect(
      resolveSiteUrl({
        VERCEL_ENV: "preview",
        VERCEL_BRANCH_URL: "bx-git-feature-x.vercel.app",
        VERCEL_URL: "bx-abc123.vercel.app",
      }),
    ).toBe("https://bx-git-feature-x.vercel.app");
  });

  it("falls back to localhost", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
});

describe("noindex", () => {
  it("is on for SITE_NOINDEX=true and on every Vercel deployment by default", () => {
    expect(resolveNoIndex({ SITE_NOINDEX: "true" })).toBe(true);
    expect(resolveNoIndex({ VERCEL: "1" })).toBe(true);
  });

  it("is off on the VPS and only off on Vercel when explicitly disabled", () => {
    expect(resolveNoIndex({})).toBe(false);
    expect(resolveNoIndex({ SITE_NOINDEX: "false" })).toBe(false);
    expect(resolveNoIndex({ VERCEL: "1", SITE_NOINDEX: "false" })).toBe(false);
  });
});

describe("client IP for rate limiting", () => {
  const h = (values: Record<string, string>) => ({ get: (k: string) => values[k] ?? null });

  it("on Vercel ignores a client-sent cf-connecting-ip and uses Vercel's headers", () => {
    expect(
      clientIpFrom(h({ "cf-connecting-ip": "6.6.6.6", "x-real-ip": "203.0.113.9" }), true),
    ).toBe("203.0.113.9");
    expect(clientIpFrom(h({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" }), true)).toBe(
      "203.0.113.9",
    );
  });

  it("elsewhere prefers Cloudflare's header, then the first forwarded address", () => {
    expect(
      clientIpFrom(h({ "cf-connecting-ip": "198.51.100.7", "x-forwarded-for": "10.0.0.1" }), false),
    ).toBe("198.51.100.7");
    expect(clientIpFrom(h({ "x-forwarded-for": "198.51.100.7, 10.0.0.1" }), false)).toBe(
      "198.51.100.7",
    );
    expect(clientIpFrom(h({}), false)).toBe("unknown");
  });
});
