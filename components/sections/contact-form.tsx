"use client";

import { useActionState, useId, useState, type FormEvent } from "react";

import { Field, FormCard, FormSuccess, Input, Textarea } from "@/components/forms/fields";
import { FormError, FormGuard } from "@/components/forms/form-guard";
import { RadioPills } from "@/components/forms/radio-pills";
import { Button } from "@/components/ui/button";
import { SignatureRule } from "@/components/ui/signature-rule";
import { submitEnquiry } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";

type Copy = {
  name: { label: string; placeholder: string };
  company: { label: string; placeholder: string };
  email: { label: string; placeholder: string; error: string };
  phone: { label: string; placeholder: string };
  need: { legend: string; options: string[] };
  message: { label: string; placeholder: string };
  submit: string;
  success: string;
  /** Small line under the submit button (optional). */
  note?: string;
};

/** Same check as the design: something@something.something. */
export function isLikelyEmail(value: string): boolean {
  return /.+@.+\..+/.test(value.trim());
}

/**
 * Contact page form card. Validates the work email on submit and shows the design's error
 * ("Error: enter a work email address so we can reply.") with the field border turning red.
 * A valid submit goes to the submitEnquiry server action (Resend, Turnstile-protected).
 */
export function ContactForm({ copy }: { copy: Copy }) {
  const errorId = useId();
  const [need, setNeed] = useState(copy.need.options[0] ?? "");
  const [email, setEmail] = useState("");
  const [tried, setTried] = useState(false);
  const [state, formAction, pending] = useActionState(submitEnquiry, initialFormState);
  const emailBad = (tried && !isLikelyEmail(email)) || Boolean(state.fieldErrors?.email);
  const otherFieldError = state.fieldErrors
    ? Object.entries(state.fieldErrors).find(([k]) => k !== "email")?.[1]
    : undefined;

  // Runs before the server action; preventDefault stops it when the email is not valid.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setTried(true);
    if (!isLikelyEmail(email)) {
      e.preventDefault();
      e.currentTarget.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
    }
  };

  return (
    <FormCard
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Send and book a call"
      aria-busy={pending}
    >
      <SignatureRule />
      <div className="relative flex flex-col gap-6 p-[clamp(20px,3vw,40px)]">
        <input type="hidden" name="source" value="contact" />
        <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2">
          <Field label={copy.name.label}>
            <Input name="name" autoComplete="name" placeholder={copy.name.placeholder} />
          </Field>
          <Field label={copy.company.label}>
            <Input
              name="company"
              autoComplete="organization"
              placeholder={copy.company.placeholder}
            />
          </Field>
          <Field
            label={copy.email.label}
            errorId={errorId}
            error={emailBad ? copy.email.error : undefined}
          >
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailBad || undefined}
              aria-describedby={emailBad ? errorId : undefined}
              placeholder={copy.email.placeholder}
            />
          </Field>
          <Field label={copy.phone.label}>
            <Input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={copy.phone.placeholder}
            />
          </Field>
        </div>
        <RadioPills
          legend={copy.need.legend}
          options={copy.need.options}
          value={need}
          onChange={setNeed}
          name="need"
        />
        <Field label={copy.message.label}>
          <Textarea
            name="message"
            className="min-h-[140px]"
            placeholder={copy.message.placeholder}
          />
        </Field>
        <FormGuard resetKey={state} />
        {state.status === "success" && <FormSuccess>{copy.success}</FormSuccess>}
        <FormError message={state.message ?? otherFieldError} />
        <Button type="submit" size="block" disabled={pending}>
          {copy.submit}
        </Button>
        {copy.note && <span className="text-small text-muted">{copy.note}</span>}
      </div>
    </FormCard>
  );
}
