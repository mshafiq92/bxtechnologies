import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { Eyebrow, Heading, SectionHeader } from "@/components/ui/typography";
import { getOffices, getPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what is slow, manual or breaking. Thirty minutes with the engineers who would do the work. info@bxtechnologies.net · +49 203 34689340.",
  alternates: { canonical: "/contact" },
};

const directLink = "flex min-h-11 items-center text-link transition-colors hover:text-ink";

export default function ContactPage() {
  const page = getPage("contact");
  const site = getSiteSettings();
  // Contact lists Europe first, then delivery (design order).
  const offices = [...getOffices()].reverse();

  return (
    <>
      <Section id="top" aria-labelledby="page-title" containerClassName="flex flex-col gap-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="flex max-w-[720px] flex-col gap-6">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <Heading id="page-title" as="h1" size="h1">
            {page.title}
          </Heading>
          <p className="text-body-lg text-muted">{page.intro}</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
          <ContactForm copy={page.form} />
          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 border-t border-ink pt-5">
              <Eyebrow as="h2">{page.aside.direct}</Eyebrow>
              <SmartLink
                href={`mailto:${site.email}`}
                className={`${directLink} text-body-lg font-semibold`}
              >
                {site.email}
              </SmartLink>
              <SmartLink href={site.phone.href} className={`${directLink} font-medium`}>
                {site.phone.display}
              </SmartLink>
              <SmartLink href={site.linkedin.href} className={`${directLink} font-medium`}>
                {site.linkedin.display}
              </SmartLink>
              <p className="text-small text-muted">
                {page.aside.hiring.before}{" "}
                <SmartLink
                  href={`mailto:${page.aside.hiring.email}`}
                  className="text-link underline decoration-1 underline-offset-2 transition-colors hover:text-ink"
                >
                  {page.aside.hiring.email}
                </SmartLink>
                . See{" "}
                <SmartLink
                  href="/careers"
                  className="text-link underline decoration-1 underline-offset-2 transition-colors hover:text-ink"
                >
                  {page.aside.hiring.rolesLink}
                </SmartLink>
                .
              </p>
            </div>
            <div className="flex flex-col gap-5 border-t border-ink pt-5">
              <Eyebrow as="h2">{page.aside.offices}</Eyebrow>
              {offices.map((office, i) => (
                <div
                  key={office.city}
                  className={`flex flex-col gap-1.5 ${i > 0 ? "border-t border-hairline pt-5" : ""}`}
                >
                  <span className="text-[13px] leading-[18px] text-muted">{office.kind}</span>
                  <Heading as="h3" size="h4">
                    {office.city}, {office.country}
                  </Heading>
                  <p className="text-[15px] leading-6 text-muted">
                    {office.contactBody ?? office.body}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section
        id="next"
        tone="deep"
        aria-labelledby="next-title"
        containerClassName="flex flex-col gap-12"
      >
        <SectionHeader
          narrow
          tone="deep"
          eyebrow={page.next.eyebrow}
          title={<span id="next-title">{page.next.title}</span>}
          intro={page.next.intro}
        />
        <NumberedGrid items={page.next.steps} tone="deep" ordered />
      </Section>
    </>
  );
}
