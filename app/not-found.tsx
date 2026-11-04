import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { HeroGridBackdrop } from "@/components/ui/hero-grid-backdrop";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone="ground" className="relative isolate overflow-hidden">
      <HeroGridBackdrop />
      <div className="flex max-w-[720px] flex-col gap-6 py-8">
        <Eyebrow>Error 404</Eyebrow>
        <Heading as="h1" size="h1">
          We could not find that page.
        </Heading>
        <p className="text-body-lg text-muted">
          The link may be old, or the page may have moved during our redesign. Try the services
          overview, or tell us what you were looking for.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <ButtonLink href="/">Go to the home page</ButtonLink>
          <ButtonLink href="/services" variant="secondary" arrow>
            All services
          </ButtonLink>
        </div>
        <TextLink href="/contact">Contact us</TextLink>
      </div>
    </Section>
  );
}
