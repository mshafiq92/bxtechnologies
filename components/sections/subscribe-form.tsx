"use client";

import { useActionState, useId } from "react";

import { FormSuccess, Input } from "@/components/forms/fields";
import { FormError, FormGuard } from "@/components/forms/form-guard";
import { Button } from "@/components/ui/button";
import { subscribe } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";

type Copy = { label: string; placeholder: string; submit: string; success: string };

/**
 * Insights digest subscribe form (hero aside), sent through the subscribe server action.
 */
export function SubscribeForm({ copy }: { copy: Copy }) {
  const id = useId();
  const [state, formAction, pending] = useActionState(subscribe, initialFormState);

  return (
    <form
      action={formAction}
      aria-busy={pending}
      aria-label="Subscribe to the insights digest"
      className="relative flex flex-col gap-3 border-t border-hairline pt-6"
    >
      <label htmlFor={id} className="text-body text-muted">
        {copy.label}
      </label>
      <div className="flex flex-wrap gap-3">
        <Input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={copy.placeholder}
          className="flex-[1_1_220px]"
        />
        <Button type="submit" disabled={pending}>
          {copy.submit}
        </Button>
      </div>
      <FormGuard resetKey={state} />
      {state.status === "success" && <FormSuccess>{copy.success}</FormSuccess>}
      <FormError message={state.message ?? state.fieldErrors?.email} />
    </form>
  );
}
