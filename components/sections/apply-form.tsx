"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useId, useState, type FormEvent, type ReactNode } from "react";

import {
  Field,
  FieldError,
  FormCard,
  FormSuccess,
  Input,
  Select,
  Textarea,
} from "@/components/forms/fields";
import { FormError, FormGuard } from "@/components/forms/form-guard";
import { RadioPills } from "@/components/forms/radio-pills";
import { Button } from "@/components/ui/button";
import { SignatureRule } from "@/components/ui/signature-rule";
import { SmartLink } from "@/components/ui/smart-link";
import { submitApplication } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/state";

type FieldCopy = { label: string; placeholder: string };

export type ApplyCopy = {
  role: {
    legend: string;
    applyingFor: string;
    speculativeOption: string;
    start: { label: string; options: string[] };
  };
  about: {
    legend: string;
    name: FieldCopy;
    email: FieldCopy;
    phone: FieldCopy;
    location: FieldCopy;
    linkedin: FieldCopy;
    portfolio: FieldCopy;
    experience: { legend: string; options: string[] };
  };
  cv: {
    legend: string;
    dropLabel: string;
    hint: string;
    errors: { missing: string; type: string; size: string };
  };
  words: {
    legend: string;
    proud: FieldCopy;
    future: FieldCopy;
    source: FieldCopy;
    consent: string;
  };
  submit: string;
  success: string;
  preferEmail: { before: string; email: string };
};

type Props = { copy: ApplyCopy; roles: { slug: string; title: string }[] };

const SPECULATIVE = "speculative";
const MAX_CV_BYTES = 10 * 1024 * 1024;

/** Reads ?role=slug so "Apply for this role" preselects it (needs a Suspense boundary). */
export function ApplyFormFromUrl(props: Props) {
  const fromUrl = useSearchParams().get("role");
  const initialRole = props.roles.some((r) => r.slug === fromUrl) ? (fromUrl as string) : undefined;
  return <ApplyForm {...props} initialRole={initialRole} />;
}

function Fieldset({
  legend,
  first = false,
  children,
}: {
  legend: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset
      className={`m-0 flex min-w-0 flex-col gap-5 border-0 p-0 ${first ? "" : "border-t border-hairline pt-8"}`}
    >
      {/* Design: only the later legends float (so they sit inside the flex column). */}
      <legend className={`mb-5 p-0 eyebrow text-link ${first ? "" : "float-left w-full"}`}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

/**
 * Application form: four numbered fieldsets (role and start; about you and experience; CV;
 * two long answers, source and consent). Validation is client-side for now; delivery (Resend,
 * CV as an attachment) is wired in task T40.
 */
export function ApplyForm({ copy, roles, initialRole }: Props & { initialRole?: string }) {
  const cvId = useId();
  const cvErrorId = useId();
  const [experience, setExperience] = useState(copy.about.experience.options[1] ?? "");
  const [cvName, setCvName] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(submitApplication, initialFormState);
  const shownCvError = cvError ?? state.fieldErrors?.cv ?? null;
  const otherFieldError = state.fieldErrors
    ? Object.entries(state.fieldErrors).find(([k]) => k !== "cv")?.[1]
    : undefined;

  const onFile = (file: File | undefined) => {
    setCvError(null);
    if (!file) return setCvName(null);
    if (!/\.(pdf|docx?)$/i.test(file.name)) {
      setCvName(null);
      return setCvError(copy.cv.errors.type);
    }
    if (file.size > MAX_CV_BYTES) {
      setCvName(null);
      return setCvError(copy.cv.errors.size);
    }
    setCvName(file.name);
  };

  // Runs before the server action; preventDefault stops it when something is missing.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!e.currentTarget.reportValidity()) {
      e.preventDefault();
      return;
    }
    if (!cvName) {
      e.preventDefault();
      setCvError(copy.cv.errors.missing);
    }
  };

  return (
    <FormCard
      action={formAction}
      onSubmit={onSubmit}
      aria-label="Send application"
      aria-busy={pending}
    >
      <SignatureRule />
      <div className="relative flex flex-col gap-10 p-[clamp(20px,3vw,40px)]">
        <Fieldset legend={copy.role.legend} first>
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2">
            <Field label={copy.role.applyingFor}>
              <Select name="role" defaultValue={initialRole ?? roles[0]?.slug}>
                {roles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.title}
                  </option>
                ))}
                <option value={SPECULATIVE}>{copy.role.speculativeOption}</option>
              </Select>
            </Field>
            <Field label={copy.role.start.label}>
              <Select name="start">
                {copy.role.start.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Fieldset>

        <Fieldset legend={copy.about.legend}>
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2">
            <Field label={copy.about.name.label}>
              <Input
                name="name"
                autoComplete="name"
                required
                placeholder={copy.about.name.placeholder}
              />
            </Field>
            <Field label={copy.about.email.label}>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={copy.about.email.placeholder}
              />
            </Field>
            <Field label={copy.about.phone.label}>
              <Input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={copy.about.phone.placeholder}
              />
            </Field>
            <Field label={copy.about.location.label}>
              <Input
                name="location"
                autoComplete="address-level2"
                placeholder={copy.about.location.placeholder}
              />
            </Field>
            <Field label={copy.about.linkedin.label}>
              <Input
                name="linkedin"
                type="text"
                inputMode="url"
                placeholder={copy.about.linkedin.placeholder}
              />
            </Field>
            <Field label={copy.about.portfolio.label}>
              <Input
                name="portfolio"
                type="text"
                inputMode="url"
                placeholder={copy.about.portfolio.placeholder}
              />
            </Field>
          </div>
          <RadioPills
            legend={copy.about.experience.legend}
            options={copy.about.experience.options}
            value={experience}
            onChange={setExperience}
            name="experience"
          />
        </Fieldset>

        <Fieldset legend={copy.cv.legend}>
          <label
            htmlFor={cvId}
            className="relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-strong bg-ground p-6 text-center transition-colors focus-within:border-link hover:border-link"
          >
            <span className="text-body leading-6 font-semibold">{cvName ?? copy.cv.dropLabel}</span>
            <span className="text-small text-muted">{copy.cv.hint}</span>
            <input
              id={cvId}
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              aria-describedby={shownCvError ? cvErrorId : undefined}
              aria-invalid={shownCvError ? true : undefined}
              onChange={(e) => onFile(e.target.files?.[0])}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
          {shownCvError && <FieldError id={cvErrorId}>{shownCvError}</FieldError>}
        </Fieldset>

        <Fieldset legend={copy.words.legend}>
          <Field label={copy.words.proud.label}>
            <Textarea
              name="proud"
              required
              className="min-h-32"
              placeholder={copy.words.proud.placeholder}
            />
          </Field>
          <Field label={copy.words.future.label}>
            <Textarea
              name="future"
              required
              className="min-h-32"
              placeholder={copy.words.future.placeholder}
            />
          </Field>
          <Field label={copy.words.source.label}>
            <Input name="source" placeholder={copy.words.source.placeholder} />
          </Field>
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-6 text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 size-5 flex-none accent-link"
            />
            {copy.words.consent}
          </label>
        </Fieldset>

        <FormGuard resetKey={state} />
        {state.status === "success" && <FormSuccess>{copy.success}</FormSuccess>}
        <FormError message={state.message ?? otherFieldError} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button type="submit" className="px-7" disabled={pending}>
            {copy.submit}
          </Button>
          <span className="text-small text-muted">
            {copy.preferEmail.before}{" "}
            <SmartLink
              href={`mailto:${copy.preferEmail.email}`}
              className="text-link transition-colors hover:text-ink"
            >
              {copy.preferEmail.email}
            </SmartLink>
            .
          </span>
        </div>
      </div>
    </FormCard>
  );
}
