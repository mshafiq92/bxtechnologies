"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { useConsent } from "./consent-provider";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

/**
 * Plausible analytics, loaded only after the visitor accepts (and only when a domain is
 * configured). Withdrawing consent reloads the page so the script is gone immediately.
 */
export function Analytics() {
  const { consent } = useConsent();
  const granted = Boolean(consent?.analytics);
  const wasGranted = useRef(granted);

  useEffect(() => {
    if (wasGranted.current && !granted) window.location.reload();
    wasGranted.current = granted;
  }, [granted]);

  if (!domain || !granted) return null;
  return <Script src={src} data-domain={domain} strategy="afterInteractive" />;
}
