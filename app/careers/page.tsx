import type { Metadata } from "next";

import { ContactBand } from "@/components/layout/contact-band";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { PhotoHero } from "@/components/sections/photo-hero";
import { ChipList } from "@/components/ui/chip";
import { ArrowRightIcon } from "@/components/ui/icons";
import { JumpBar } from "@/components/ui/jump-bar";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { SectionHeader } from "@/components/ui/typography";
import { getPage, getRoles, roleHref } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Work on systems that go into production. A small engineering team in Islamabad working with European clients: own components, talk to users, see your work run against real load.",
  path: "/careers",
});

export default function CareersPage() {
  const page = getPage("careers");
  const { id: bandId, ...band } = page.contactBand;

  return (
    <>
      <PhotoHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        metrics={page.hero.metrics}
        primary={page.hero.primaryCta}
        secondary={page.hero.secondaryCta}
        photo={page.hero.photo}
      />

      <JumpBar links={page.jumpLinks} showLabel={false} />

      {/* Open roles ------------------------------------------------------------------ */}
      <Section id="roles" aria-labelledby="roles-title" containerClassName="flex flex-col gap-8">
        <SectionHeader
          eyebrow={page.roles.eyebrow}
          title={<span id="roles-title">{page.roles.title}</span>}
          // Design note addressed to bX; replace once the live roles arrive.
          aside={page.roles.note}
          asideSize="small"
        />
        <ul className="border-b border-hairline">
          {getRoles().map((role) => (
            <li key={role.slug}>
              <SmartLink
                href={roleHref(role)}
                className="grid grid-cols-[minmax(0,1fr)_24px] items-start gap-x-8 gap-y-3 border-t border-hairline py-6 text-ink transition-colors hover:bg-surface nav:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_180px_24px]"
              >
                <span className="col-start-1 flex flex-col gap-1.5">
                  <span className="text-h4">{role.title}</span>
                  <span className="text-body text-muted">{role.summary}</span>
                </span>
                <ChipList
                  items={role.chips}
                  className="col-start-1 content-start nav:col-start-auto"
                />
                <span className="col-start-1 text-small leading-7 text-muted nav:col-start-auto">
                  {role.location} · {role.employmentType}
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-2 row-start-1 flex h-7 items-center justify-end text-link nav:col-start-4"
                >
                  <ArrowRightIcon size={18} />
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
        <p className="max-w-[72ch] text-body text-muted">
          {page.roles.speculative.before}{" "}
          <SmartLink
            href={`mailto:${page.roles.speculative.email}`}
            className="font-medium text-link transition-colors hover:text-ink"
          >
            {page.roles.speculative.email}
          </SmartLink>{" "}
          {page.roles.speculative.after}
        </p>
      </Section>

      {/* What it is like --------------------------------------------------------------- */}
      <Section
        id="life"
        tone="surface"
        aria-labelledby="life-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.life.eyebrow}
          title={<span id="life-title">{page.life.title}</span>}
          intro={page.life.intro}
        />
        <NumberedGrid items={page.life.items} />
      </Section>

      {/* Hiring process ---------------------------------------------------------------- */}
      <Section
        id="process"
        aria-labelledby="process-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow={page.process.eyebrow}
          title={<span id="process-title">{page.process.title}</span>}
          intro={page.process.intro}
        />
        <NumberedGrid items={page.process.steps} ordered />
      </Section>

      <ContactBand id={bandId} {...band} />
    </>
  );
}
