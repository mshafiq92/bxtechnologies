import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/layout/contact-band";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { GroupDetail } from "@/components/sections/group-detail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DiagramCard } from "@/components/ui/diagram-card";
import { Faq } from "@/components/ui/faq";
import { ArrowRightIcon } from "@/components/ui/icons";
import { JumpBar } from "@/components/ui/jump-bar";
import { MetricInlineList, MetricLarge } from "@/components/ui/metric";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getGroupPage, getGroupPages, getService, getServicesWithDetail } from "@/lib/content";
import { JsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd } from "@/lib/seo/structured-data";

type Params = { slug: string };

/** Service group pages and single services with written detail content; everything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return [
    ...getGroupPages().map((p) => ({ slug: p.slug })),
    ...getServicesWithDetail().map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const group = getGroupPage(slug);
  if (group) {
    return pageMetadata({
      title: group.eyebrow,
      description: group.intro,
      path: `/services/${slug}`,
    });
  }
  const service = getService(slug);
  if (!service?.detail) return {};
  return pageMetadata({
    title: service.name,
    description: service.detail.intro,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const group = getGroupPage(slug);
  if (group) return <GroupDetail page={group} />;
  const service = getService(slug);
  const detail = service?.detail;
  if (!service || !detail) notFound();

  const jumpLinks = [
    { href: "#build", label: "What we build" },
    { href: "#architecture", label: "Architecture" },
    { href: "#delivery", label: detail.engagement.jumpLabel },
    { href: "#fit", label: "Where it fits" },
    { href: "#faq", label: "Questions" },
    { href: "#related", label: "Related" },
  ];

  return (
    <>
      <JsonLd data={serviceLd({ ...service, detail })} />
      {/* 1. Hero ---------------------------------------------------------------- */}
      <Section
        id="top"
        spacing="hero"
        aria-labelledby="page-title"
        containerClassName="flex flex-col gap-8"
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <Eyebrow>{detail.eyebrow}</Eyebrow>
              <Heading id="page-title" as="h1" size="h1">
                {detail.title}
              </Heading>
              <p className="max-w-[62ch] text-body-lg text-muted">{detail.intro}</p>
            </div>
            <MetricInlineList items={detail.metrics} className="border-t border-hairline pt-6" />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#contact">{detail.primaryCta}</ButtonLink>
              <ButtonLink href="#architecture" variant="secondary" arrow>
                See the architecture
              </ButtonLink>
            </div>
          </div>
          <DiagramCard diagram={detail.heroDiagram} layout="stack" />
        </div>
      </Section>

      <JumpBar links={jumpLinks} />

      {/* 2. What we build ------------------------------------------------------- */}
      <Section id="build" aria-labelledby="build-title" containerClassName="flex flex-col gap-12">
        <SectionHeader
          narrow
          eyebrow="What we build"
          title={<span id="build-title">{detail.build.title}</span>}
          intro={detail.build.intro}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 2xl:grid-cols-4">
          {detail.build.patterns.map((pattern) => (
            <article key={pattern.number} className="flex flex-col gap-4 border-t border-ink pt-6">
              <Eyebrow as="span" className="normal-case">
                {pattern.number}
              </Eyebrow>
              <Heading as="h3" size="h3">
                {pattern.title}
              </Heading>
              <p className="text-body text-muted">{pattern.text}</p>
              {pattern.items && (
                <ul className="mt-auto">
                  {pattern.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-hairline py-2.5 text-[15px] leading-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* 3. Architecture ---------------------------------------------------------- */}
      <Section
        id="architecture"
        tone="surface"
        aria-labelledby="architecture-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          eyebrow="Architecture"
          title={<span id="architecture-title">{detail.architecture.title}</span>}
          intro={detail.architecture.intro}
        />
        <ArchitectureDiagram architecture={detail.architecture} />
        <p className="max-w-[72ch] text-body text-muted">{detail.architecture.note}</p>
      </Section>

      {/* 4. Engagement / pilot (navy) --------------------------------------------- */}
      <Section
        id="delivery"
        tone="deep"
        aria-labelledby="delivery-title"
        containerClassName="flex flex-col gap-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex max-w-[680px] flex-col gap-4">
            <Eyebrow>{detail.engagement.eyebrow}</Eyebrow>
            <Heading id="delivery-title" as="h2" size="h2" className="text-on-deep">
              {detail.engagement.title}
            </Heading>
            <p className="text-body text-on-deep-muted">{detail.engagement.intro}</p>
          </div>
          <TextLink href="#contact" tone="deep">
            {detail.engagement.cta}
          </TextLink>
        </div>
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 2xl:grid-cols-4">
          {detail.engagement.steps.map((step) => (
            <li key={step.label} className="flex flex-col gap-3 border-t border-deep-hairline pt-6">
              <span className="eyebrow text-on-deep-accent normal-case">{step.label}</span>
              <Heading as="h3" size="h4" className="text-on-deep">
                {step.title}
              </Heading>
              <p className="text-[15px] leading-6 text-on-deep-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. In production --------------------------------------------------------- */}
      <Section
        id="proof"
        spacing="top"
        aria-labelledby="proof-title"
        containerClassName="flex flex-col gap-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex flex-col gap-4">
            <Eyebrow>In production</Eyebrow>
            <Heading id="proof-title" as="h2" size="h2">
              {detail.proof.title}
            </Heading>
          </div>
          {/* Design note addressed to bX; replace once figures are signed off. */}
          <p className="max-w-[46ch] text-small text-muted">{detail.proof.note}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {detail.proof.metrics.map((metric) => (
            <MetricLarge
              key={metric.value + metric.label}
              value={metric.value}
              description={metric.label}
              sector={metric.sector}
            />
          ))}
        </div>
      </Section>

      {/* 6. Where it fits --------------------------------------------------------- */}
      <Section id="fit" aria-labelledby="fit-title" containerClassName="flex flex-col gap-10">
        <SectionHeader
          narrow
          eyebrow="Where it fits"
          title={<span id="fit-title">{detail.fit.title}</span>}
          intro={detail.fit.intro}
        />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {detail.fit.items.map((item) => (
            <li key={item.title} className="flex">
              <Card gap="sm" className="w-full">
                <Eyebrow as="span">{item.sector}</Eyebrow>
                <Heading as="h3" size="h4">
                  {item.title}
                </Heading>
                <p className="text-[15px] leading-6 text-muted">{item.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Questions ------------------------------------------------------------- */}
      <Section id="faq" spacing="flush" aria-labelledby="faq-title">
        <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
          <div className="flex flex-[1_1_280px] flex-col gap-4">
            <Eyebrow>Questions</Eyebrow>
            <Heading id="faq-title" as="h2" size="h2">
              {detail.faq.title}
            </Heading>
            <p className="text-body text-muted">{detail.faq.intro}</p>
          </div>
          <Faq items={detail.faq.items} className="flex-[2_1_520px]" />
        </div>
      </Section>

      {/* 8. Related --------------------------------------------------------------- */}
      <Section
        id="related"
        tone="surface"
        aria-labelledby="related-title"
        className="border-b-0"
        containerClassName="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow="Related"
          title={<span id="related-title">{detail.related.title}</span>}
          action={<TextLink href="/services">All services</TextLink>}
        />
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {detail.related.items.map((item) => (
            <li key={item.title} className="flex">
              <SmartLink
                href={item.href}
                className="group flex w-full flex-col gap-3 border-t border-ink pt-6 text-ink transition-colors hover:text-link"
              >
                <span className="text-h4">{item.title}</span>
                <span className="text-body text-muted">{item.text}</span>
                <span className="inline-flex items-center gap-2 font-semibold text-link">
                  Explore <ArrowRightIcon size={16} />
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Section>

      <ContactBand {...detail.contactBand} />
    </>
  );
}
