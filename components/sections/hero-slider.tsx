"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const ADVANCE_MS = 10000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const assumeMotion = () => false;

/**
 * Home hero slider: whole banners that fade on a timer, with no visible controls (owner decision
 * 2026-11-09). The slides share one grid cell, so the page never jumps. It holds while the pointer
 * or focus is inside, and after a tap until the next tap elsewhere. A Pause button appears only on
 * keyboard focus (WCAG 2.2.2). Under reduced motion there is no timer.
 */
export function HeroSlider({
  label,
  slides,
  pauseLabel,
  playLabel,
}: {
  label: string;
  slides: { label: string; content: ReactNode }[];
  pauseLabel: string;
  playLabel: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [tapHeld, setTapHeld] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, assumeMotion);

  useEffect(() => {
    if (!playing || held || tapHeld || reducedMotion) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % slides.length), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, playing, held, tapHeld, reducedMotion, slides.length]);

  // A tap holds the banner until the next touch outside it.
  useEffect(() => {
    if (!tapHeld) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setTapHeld(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [tapHeld]);

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
  };

  return (
    // Delegated handlers only hold the timer; the links and the button inside are native controls.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      data-paused={playing ? undefined : "true"}
      className="group/slider flex flex-col gap-4"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={onBlur}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      // Click, not pointer down: scrolling the page past the banner should not hold it.
      onClick={() => {
        if (pointerType.current === "touch") setTapHeld(true);
      }}
    >
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="sr-only min-h-11 self-start rounded-md border border-strong px-3 text-small font-medium text-ink focus-visible:not-sr-only"
        >
          {playing ? pauseLabel : playLabel}
        </button>
      )}
      <div className="grid">
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            role="group"
            aria-roledescription="slide"
            aria-label={slide.label}
            aria-hidden={i === active ? undefined : true}
            className={cn(
              "col-start-1 row-start-1 min-w-0 transition-[opacity,visibility]",
              i === active ? "visible opacity-100" : "invisible opacity-0",
            )}
          >
            {slide.content}
          </div>
        ))}
      </div>
    </div>
  );
}
