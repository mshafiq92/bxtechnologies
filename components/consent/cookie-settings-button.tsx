"use client";

import { useConsent } from "./consent-provider";

/** Footer "Cookie settings": reopens the banner's settings panel. */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" className={className} onClick={(e) => openSettings(e.currentTarget)}>
      {label}
    </button>
  );
}
