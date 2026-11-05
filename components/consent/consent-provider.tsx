"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  consentCookieString,
  COOKIE_SETTINGS_HASH,
  hasGlobalPrivacyControl,
  readConsentCookie,
  type Consent,
} from "@/lib/consent";

type View = "notice" | "settings";

type ConsentState = {
  /** null until read in the browser (the server never knows), then the stored or implied choice. */
  consent: Consent | null;
  /** True once the browser state has been read. */
  ready: boolean;
  /** Which panel is showing, or null when the banner is closed. */
  view: View | null;
  setConsent: (consent: Consent) => void;
  /** Opens the settings panel; focus returns to the opener when it closes. */
  openSettings: (opener?: HTMLElement | null) => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentState | null>(null);

export function useConsent(): ConsentState {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

/**
 * Holds the visitor's cookie choice. The banner shows on the first visit (no stored choice and no
 * Global Privacy Control signal); the footer button or any `#cookie-settings` link reopens it.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  // The notice is in the server HTML so it paints with the page (it is often the largest text on a
  // phone, so a late paint would delay LCP). Returning visitors never see it: the inline script
  // from consentPrePaintScript() hides it before first paint, and the effect below removes it.
  const [view, setView] = useState<View | null>("notice");
  const opener = useRef<HTMLElement | null>(null);

  const openSettings = useCallback((from?: HTMLElement | null) => {
    opener.current = from ?? (document.activeElement as HTMLElement | null);
    setView("settings");
  }, []);

  const close = useCallback(() => {
    setView(null);
    // Return focus to whatever opened the settings (footer button, page link).
    const el = opener.current;
    opener.current = null;
    if (el && el.isConnected) el.focus();
  }, []);

  const setConsent = useCallback(
    (next: Consent) => {
      document.cookie = consentCookieString(next, window.location.protocol === "https:");
      setConsentState(next);
      close();
    },
    [close],
  );

  // Read the stored choice once in the browser.
  useEffect(() => {
    const stored = readConsentCookie(document.cookie);
    const gpc = hasGlobalPrivacyControl(navigator);
    // Reading browser-only state after hydration is the point of this effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    setConsentState(stored ?? (gpc ? { analytics: false } : null));
    if (stored || gpc) setView(null);
    if (window.location.hash === COOKIE_SETTINGS_HASH) setView("settings");
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // `#cookie-settings` links (cookies policy contact band) open the settings panel. Clicks are
  // caught directly because Next's <Link> changes the hash without a `hashchange` event.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link || link.getAttribute("href") !== COOKIE_SETTINGS_HASH) return;
      e.preventDefault();
      openSettings(link as HTMLElement);
    };
    const onHash = () => {
      if (window.location.hash !== COOKIE_SETTINGS_HASH) return;
      openSettings();
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, [openSettings]);

  const value = useMemo(
    () => ({ consent, ready, view, setConsent, openSettings, closeSettings: close }),
    [consent, ready, view, setConsent, openSettings, close],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
