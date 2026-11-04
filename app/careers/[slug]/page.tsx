import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/layout/contact-band";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { ChipList } from "@/components/ui/chip";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getPage, getRole, getRoles, getRolesWithDetail, roleHref } from "@/lib/content";
import { renderInline } from "@/lib/inline";

type Params = { slug: string };

/** One page per role with written detail; other roles link straight to the application. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getRolesWithDetail().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role?.detail) return {};
  return {
    title: `${role.title} · Careers`,
    description: role.detail.intro,
    alternates: { canonical: `/careers/${slug}` },
  };
}

function ProseList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-disc flex-col gap-2.5 pl-[22px]">
      {items.map((item) => (
        <li key={item}>{renderInline(item)}</li>
      ))}
    </ul>
  );
}

function ProseHeading({ children, first = false }: { children: string; first?: boolean }) {
  return (
    <h2 className={`text-[28px] leading-9 font-semibold tracking-[-0.02em] ${first ? "" : "mt-6"}`}>
      {children}
    </h2>
  );
}

export default async function RoleDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const role = getRole(slug);
  const detail = role?.detail;
  if (!role || !detail) notFound();

  const page = getPage("roleDetail");
  const applyHref = `/careers/apply?role=${role.slug}`;
  const askHref = `mailto:jobs@bxtechnologies.net?subject=${encodeURIComponent(`Question about the ${role.title} role`)}`;
  const others = getRoles().filter((r) => r.slug !== role.slug);

  return (
    <>
      {/* Title block ------------------------------------------------------------------ */}
      <Section
        id="top"
        spacing="hero"
        aria-labelledby="page-title"
        containerClassName="flex flex-col gap-7"
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
            { label: role.title },
          ]}
        />
        <div className="flex max-w-[780px] flex-col gap-6">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <Heading id="page-title" as="h1" size="h1">
            {role.title}
          </Heading>
          <p className="max-w-[62ch] text-body-lg text-muted">{detail.intro}</p>
          <ChipList items={detail.chips} />
          <dl className="flex flex-wrap gap-x-12 gap-y-4 border-t border-hairline pt-5">
            {detail.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-0.5">
                <dt className="order-2 text-small text-muted">{fact.label}</dt>
                <dd className="text-body-lg font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={applyHref}>{page.applyLabel}</ButtonLink>
            <ButtonLink href={page.allRolesLink.href} variant="secondary" arrow>
              {page.allRolesLink.label}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Role detail -------------------------------------------------------------------- */}
      <Section id="detail" tone="surface" aria-label="Role detail">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,720px)_320px] xl:justify-between">
          <article className="flex flex-col gap-5 text-legal">
            <ProseHeading first>{page.sections.work}</ProseHeading>
            {detail.work.map((para) => (
              <p key={para}>{renderInline(para)}</p>
            ))}
            <ProseHeading>{page.sections.whatYouWillDo}</ProseHeading>
            <ProseList items={detail.whatYouWillDo} />
            <ProseHeading>{page.sections.lookingFor}</ProseHeading>
            <ProseList items={detail.lookingFor} />
            <ProseHeading>{page.sections.niceToHave}</ProseHeading>
            <ProseList items={detail.niceToHave} />
            <ProseHeading>{page.sections.offer}</ProseHeading>
            <ProseList items={detail.offer} />
            <ProseHeading>{page.sections.hiring}</ProseHeading>
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {detail.hiringSteps.map((step) => (
                <li key={step.number} className="flex flex-col gap-2 border-t border-ink pt-5">
                  <span className="eyebrow text-link normal-case">{step.number}</span>
                  <h3 className="text-[18px] leading-[26px] font-semibold">{step.title}</h3>
                  <p className="text-[15px] leading-6 text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside>
            <div className="flex flex-col gap-6 xl:sticky xl:top-[104px]">
              <div className="flex flex-col gap-5 rounded-lg border border-hairline bg-ground p-6">
                <Eyebrow as="h2">{page.glanceTitle}</Eyebrow>
                <dl className="flex flex-col">
                  {detail.glance.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-4 border-t border-hairline py-2.5 text-[15px] leading-[22px]"
                    >
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="text-right font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <SmartLink
                  href={applyHref}
                  className={buttonClasses({ variant: "secondary", size: "block" })}
                >
                  {page.applyLabel}
                </SmartLink>
                <SmartLink
                  href={askHref}
                  className="flex min-h-11 items-center justify-center text-[15px] font-semibold text-link transition-colors hover:text-ink"
                >
                  {page.askQuestion}
                </SmartLink>
              </div>
              <div className="flex flex-col gap-2.5 border-t border-ink pt-4">
                <span className="text-body leading-6 font-semibold">{detail.firstWork.title}</span>
                <p className="text-[15px] leading-6 text-muted">{detail.firstWork.text}</p>
                <TextLink href={detail.firstWork.link.href} className="self-start text-[15px]">
                  {detail.firstWork.link.label}
                </TextLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Also hiring ------------------------------------------------------------------ */}
      {others.length > 0 && (
        <Section id="more" aria-labelledby="more-title" containerClassName="flex flex-col gap-8">
          <SectionHeader
            eyebrow={page.alsoHiring.eyebrow}
            title={<span id="more-title">{page.alsoHiring.title}</span>}
            action={<TextLink href={page.allRolesLink.href}>{page.allRolesLink.label}</TextLink>}
          />
          <ul className="border-b border-hairline">
            {others.map((other) => (
              <li key={other.slug} className="border-t border-hairline">
                <SmartLink
                  href={roleHref(other)}
                  className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 text-ink transition-colors hover:text-link"
                >
                  <span className="text-[18px] leading-[26px] font-semibold">{other.title}</span>
                  <span className="flex items-center gap-4 text-small text-muted">
                    {other.location} · {other.employmentType}
                    <ArrowRightIcon size={18} className="text-link" />
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ContactBand {...detail.contactBand} />
    </>
  );
}
