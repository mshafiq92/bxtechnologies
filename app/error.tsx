"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry is added in T44; until then the error goes to the browser console.
    console.error(error);
  }, [error]);

  return (
    <Section tone="ground">
      <div className="flex max-w-[720px] flex-col gap-6 py-8">
        <Eyebrow>Something went wrong</Eyebrow>
        <Heading as="h1" size="h1">
          This page did not load.
        </Heading>
        <p className="text-body-lg text-muted">
          Error: the page hit a problem on our side. Try again, and if it keeps happening, email
          info@bxtechnologies.net and we will look into it.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Go to the home page
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
