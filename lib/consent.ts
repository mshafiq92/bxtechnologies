/*
 * Cookie consent: one first-party cookie, `bx_consent`, records the visitor's choice.
 * It is strictly necessary (it stores the choice itself), so it needs no consent of its own.
 *
 * Value format: `v<version>.<analytics>` where analytics is "granted" or "denied", e.g. "v1.denied".
 * Bump CONSENT_VERSION when a new optional category is added: older choices then count as unset
 * and the banner asks again (as the cookies policy promises).
 */

export const CONSENT_COOKIE = "bx_consent";
export const CONSENT_VERSION = 1;
/** Twelve months, as stated in the cookies policy. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type Consent = { analytics: boolean };

/** Hash that opens the cookie settings from any link (`<a href="#cookie-settings">`). */
export const COOKIE_SETTINGS_HASH = "#cookie-settings";

export function serializeConsent(consent: Consent): string {
  return `v${CONSENT_VERSION}.${consent.analytics ? "granted" : "denied"}`;
}

/** Parses a stored value; anything unknown or from an older version counts as "no choice yet". */
export function parseConsent(value: string | undefined | null): Consent | null {
  const match = /^v(\d+)\.(granted|denied)$/.exec(value ?? "");
  if (!match || Number(match[1]) !== CONSENT_VERSION) return null;
  return { analytics: match[2] === "granted" };
}

/** Reads the consent cookie from a `document.cookie` style string. */
export function readConsentCookie(cookieString: string): Consent | null {
  for (const part of cookieString.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === CONSENT_COOKIE) return parseConsent(decodeURIComponent(rest.join("=")));
  }
  return null;
}

/** Cookie string for `document.cookie`. Secure on https; Lax so it is sent on normal navigation. */
export function consentCookieString(consent: Consent, secure: boolean): string {
  return [
    `${CONSENT_COOKIE}=${serializeConsent(consent)}`,
    "Path=/",
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}

/** Global Privacy Control: a browser-level "do not sell or share" signal, treated as a decline. */
export function hasGlobalPrivacyControl(nav: Navigator | undefined): boolean {
  return Boolean(
    (nav as (Navigator & { globalPrivacyControl?: boolean }) | undefined)?.globalPrivacyControl,
  );
}

/**
 * Inline <head> script: before first paint, marks <html data-consent="set"> when a current choice
 * is stored or Global Privacy Control is on, so CSS hides the server-rendered notice and returning
 * visitors never see it flash.
 */
export function consentPrePaintScript(): string {
  return `try{if(/(?:^|; )${CONSENT_COOKIE}=v${CONSENT_VERSION}\.(?:granted|denied)(?:;|$)/.test(document.cookie)||navigator.globalPrivacyControl===true)document.documentElement.dataset.consent="set"}catch(e){}`;
}
