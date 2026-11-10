"use client";

import { useActionState } from "react";

import { Field, FormCard, FormSuccess, Input, Textarea } from "@/components/forms/fields";
import { FormError, FormGuard } from "@/components/forms/form-guard";
import { Button } from "@/components/ui/button";
import { SignatureRule } from "@/components/ui/signature-rule";
import { submitEnquiry } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";

type Copy = {
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  message: { label: string; placeholder: string };
  submit: string;
  success: string;
  /** Small line under the submit button; Home leaves it out. */
  note?: string;
};

/** Home contact form card (name, email, message): sends an enquiry through the submitEnquiry server action. The Contact page has the full form. */
export function HomeContactForm({ copy }: { copy: Copy }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialFormState);
  const firstFieldError = state.fieldErrors ? Object.values(state.fieldErrors)[0] : undefined;

  return (
    <FormCard action={formAction} aria-label="Request a technical call" aria-busy={pending}>
      <SignatureRule />
      <div className="relative flex flex-col gap-5 p-[clamp(20px,3vw,32px)]">
        <input type="hidden" name="source" value="home" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-5">
          <Field label={copy.name.label}>
            <Input name="name" autoComplete="name" required placeholder={copy.name.placeholder} />
          </Field>
          <Field label={copy.email.label}>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={copy.email.placeholder}
            />
          </Field>
        </div>
        <Field label={copy.message.label}>
          <Textarea name="message" required placeholder={copy.message.placeholder} />
        </Field>
        <FormGuard resetKey={state} />
        {state.status === "success" && <FormSuccess>{copy.success}</FormSuccess>}
        <FormError message={state.message ?? firstFieldError} />
        <Button type="submit" size="block" disabled={pending}>
          {copy.submit}
        </Button>
        {copy.note && <span className="text-small text-muted">{copy.note}</span>}
      </div>
    </FormCard>
  );
}
