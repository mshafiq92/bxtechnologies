"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { HONEYPOT_FIELD } from "@/lib/forms/state";

/*
 * Spam protection placed inside every site form (task T40):
 *   - a honeypot field that people never see or reach,
 *   - a Cloudflare Turnstile widget in "interaction-only" mode, so it stays invisible unless
 *     Cloudflare needs the visitor to tick a box. Turnstile adds a hidden
 *     "cf-turnstile-response" input to the form, which the server action verifies.
 * Without NEXT_PUBLIC_TURNSTILE_SITE_KEY the widget is omitted (local development).
 */

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function FormGuard({ resetKey }: { resetKey?: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = () => {
    if (!SITE_KEY || !ref.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: SITE_KEY,
      appearance: "interaction-only",
      theme: "light",
    });
  };

  useEffect(() => {
    render();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  // A token is single-use: reset after each submission so the next attempt gets a fresh one.
  useEffect(() => {
    if (resetKey !== undefined && widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current);
    }
  }, [resetKey]);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      {SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={render}
          />
          <div ref={ref} className="empty:hidden" />
        </>
      )}
    </>
  );
}

/** Whole-form error from the server ("Error: ..."), announced to screen readers. */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-small font-medium text-danger">
      {message}
    </p>
  );
}
