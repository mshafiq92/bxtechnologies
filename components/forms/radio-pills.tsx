"use client";

import { useId, useRef, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";

/**
 * Radio pills (README: Forms). Buttons with role="radio" inside a radiogroup.
 * Selected: link-colour border + selected fill. Min 44px high, radius 8.
 * Keyboard: one tab stop (roving tabindex); arrow keys move and select, like native radios.
 * The value is submitted through a hidden input when `name` is given.
 */
export function RadioPills({
  legend,
  options,
  value,
  onChange,
  name,
  className,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}) {
  const legendId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(0, options.indexOf(value));

  const select = (index: number) => {
    const i = (index + options.length) % options.length;
    onChange(options[i] as string);
    refs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(options.length - 1);
    }
  };

  return (
    <fieldset className={cn("m-0 grid gap-2 border-0 p-0", className)}>
      <legend id={legendId} className="mb-2 p-0 text-small font-medium">
        {legend}
      </legend>
      <div role="radiogroup" aria-labelledby={legendId} className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          const checked = i === selectedIndex;
          return (
            <button
              key={option}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => onChange(option)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "min-h-11 rounded-md border px-4 text-[15px] font-medium text-ink transition-colors hover:border-link",
                checked ? "border-link bg-selected" : "border-strong bg-surface",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {name && <input type="hidden" name={name} value={options[selectedIndex]} />}
    </fieldset>
  );
}
