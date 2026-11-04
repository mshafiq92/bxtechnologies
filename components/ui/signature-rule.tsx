import { cn } from "@/lib/cn";

/**
 * Signature rule: 3px cyan to green gradient.
 * Only on the top edge of diagram cards, form cards and the contact band.
 * Never as text fill, background wash or button (DESIGN-TOKENS-V2).
 */
export function SignatureRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-signature-rule=""
      className={cn("h-[3px] w-full bg-signature", className)}
    />
  );
}
