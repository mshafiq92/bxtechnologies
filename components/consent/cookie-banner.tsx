"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SignatureRule } from "@/components/ui/signature-rule";
import { SmartLink } from "@/components/ui/smart-link";
import type { ConsentCopy } from "@/content/consent";

import { useConsent } from "./consent-provider";

const textButton =
  "inline-flex min-h-11 items-center font-semibold text-link transition-colors hover:text-ink";

/**
 * Cookie banner: a bottom-left card (a bottom sheet under 560px) with two equal choices.
 * Non-modal: the page stays usable and focus is not trapped. It is only moved into the card
 * when the visitor opens the settings themselves; the first-visit notice never steals focus.
 */
export function CookieBanner({ copy }: { copy: ConsentCopy }) {
  const { consent, view, setConsent, openSettings, closeSettings } = useConsent();
  const titleId = useId();
  const switchId = useId();
  const headingRef = useRef<HTMLParagraphElement>(null);
  const [analytics, setAnalytics] = useState(false);

  // Opening the settings starts from the current choice and moves focus into the card.
  useEffect(() => {
    if (view !== "settings") return;
    // Syncing the form with the stored choice each time the panel opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnalytics(consent?.analytics ?? false);
    headingRef.current?.focus();
  }, [view, consent]);

  // Escape closes the settings panel when there is already a choice to fall back to.
  useEffect(() => {
    if (view !== "settings" || !consent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [view, consent, closeSettings]);

  if (!view) return null;

  return (
    <section
      aria-labelledby={titleId}
      data-cookie-banner={view}
      className="fixed bottom-4 left-4 z-40 flex w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border border-hairline bg-surface text-ink shadow-card max-sm:inset-x-0 max-sm:bottom-0 max-sm:w-full max-sm:rounded-none max-sm:border-x-0 max-sm:border-b-0"
    >
      <SignatureRule />
      <div className="flex flex-col gap-4 p-6 max-sm:px-4 max-sm:pb-5">
        {view === "notice" ? (
          <>
            <div className="flex flex-col gap-2">
              <p id={titleId} className="text-body font-semibold">
                {copy.notice.title}
              </p>
              <p className="text-small text-muted">{copy.notice.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="block"
                onClick={() => setConsent({ analytics: false })}
              >
                {copy.notice.decline}
              </Button>
              <Button
                variant="secondary"
                size="block"
                onClick={() => setConsent({ analytics: true })}
              >
                {copy.notice.accept}
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 text-small">
              <button type="button" className={textButton} onClick={() => openSettings()}>
                {copy.notice.settings}
              </button>
              <SmartLink href={copy.notice.policy.href} className={textButton}>
                {copy.notice.policy.label}
              </SmartLink>
            </div>
          </>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setConsent({ analytics });
            }}
          >
            <p
              id={titleId}
              ref={headingRef}
              tabIndex={-1}
              className="text-body font-semibold focus:outline-none"
            >
              {copy.settings.title}
            </p>
            <div className="flex flex-col border-t border-hairline">
              <div className="flex items-start justify-between gap-4 border-b border-hairline py-3">
                <div className="flex flex-col gap-1">
                  <span className="text-small font-semibold">{copy.settings.essential.name}</span>
                  <span className="text-small text-muted">{copy.settings.essential.text}</span>
                </div>
                <span className="flex-none text-small text-muted">
                  {copy.settings.essential.status}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-hairline py-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor={switchId} className="cursor-pointer text-small font-semibold">
                    {copy.settings.analytics.name}
                  </label>
                  <span id={`${switchId}-text`} className="text-small text-muted">
                    {copy.settings.analytics.text}
                  </span>
                </div>
                <input
                  id={switchId}
                  type="checkbox"
                  role="switch"
                  name="analytics"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-describedby={`${switchId}-text`}
                  className="size-6 flex-none cursor-pointer accent-link"
                />
              </div>
            </div>
            <div className={consent ? "grid grid-cols-2 gap-3" : "grid grid-cols-1"}>
              {consent && (
                <Button variant="secondary" size="block" onClick={closeSettings}>
                  {copy.settings.cancel}
                </Button>
              )}
              <Button type="submit" variant="secondary" size="block">
                {copy.settings.save}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
