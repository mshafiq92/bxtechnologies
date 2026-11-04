import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { StatusDot } from "@/components/ui/status";
import { cn } from "@/lib/cn";

/*
 * Form fields (DESIGN-TOKENS-V2: Input / select).
 * 48px, padding 0 16, 1px border-strong, radius 4, white. Label 14/22 500 above, 8px gap.
 * Errors: "Error:" prefix in danger text, border turns red (BUSINESS-RULES-V2 §8).
 */

const control =
  "w-full rounded-sm border bg-surface text-body text-ink placeholder:text-muted transition-colors focus-visible:border-link aria-invalid:border-danger";

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="text-small font-medium">{children}</span>;
}

/** Inline error under a field. The message should start with "Error:". */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} className="text-small text-danger">
      {children}
    </span>
  );
}

type FieldProps = {
  label: ReactNode;
  error?: ReactNode;
  errorId?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A label wrapping its control, with an optional error below. The error sits outside the
 * label so it is not read as part of the field's name; link it with aria-describedby.
 */
export function Field({ label, error, errorId, className, children }: FieldProps) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label className="grid content-start gap-2">
        <FieldLabel>{label}</FieldLabel>
        {children}
      </label>
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(control, "h-12 border-strong px-4", className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(control, "resize-y border-strong px-4 py-3", className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(control, "h-12 border-strong px-4", className)} {...props}>
      {children}
    </select>
  );
}

/** Success state: green dot and words that say what happens next, announced politely. */
export function FormSuccess({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="text-small font-medium text-success">
      <StatusDot>{children}</StatusDot>
    </p>
  );
}

/** Form card: white, hairline border, radius 12, signature rule on top (place it first). */
export function FormCard({ className, children, ...props }: ComponentPropsWithoutRef<"form">) {
  return (
    <form
      className={cn("overflow-hidden rounded-lg border border-hairline bg-surface", className)}
      {...props}
    >
      {children}
    </form>
  );
}
