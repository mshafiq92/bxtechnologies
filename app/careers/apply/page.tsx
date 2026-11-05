import type { Metadata } from "next";
import { Suspense } from "react";

import { ApplyForm, ApplyFormFromUrl } from "@/components/sections/apply-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Section } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getPage, getRoles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Apply · Careers",
  description:
    "A CV and one honest paragraph. A person reads every application and you get an answer either way within a week.",
  path: "/careers/apply",
});

export default function ApplyPage() {
  const page = getPage("apply");
  // AI Engineer first, as in the design's role list.
  const roles = [...getRoles()]
    .sort((a, b) => Number(Boolean(b.detail)) - Number(Boolean(a.detail)))
    .map((r) => ({ slug: r.slug, title: r.title }));
  const formProps = { copy: page.form, roles };

  return (
    <Section id="top" aria-labelledby="page-title" containerClassName="flex flex-col gap-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: "Apply" },
        ]}
      />
      <div className="flex max-w-[720px] flex-col gap-6">
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <Heading id="page-title" as="h1" size="h1">
          {page.title}
        </Heading>
        <p className="text-body-lg text-muted">{page.intro}</p>
      </div>
      <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ?role= is read in the browser; the static HTML starts on the first role. */}
        <Suspense fallback={<ApplyForm {...formProps} />}>
          <ApplyFormFromUrl {...formProps} />
        </Suspense>

        <aside className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow as="h2">{page.aside.next.title}</Eyebrow>
            <ol className="border-b border-hairline">
              {page.aside.next.steps.map((step) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-hairline py-4"
                >
                  <span className="font-mono text-[13px] leading-6 text-link">{step.number}</span>
                  <span className="text-body leading-6 font-semibold">{step.title}</span>
                  <p className="col-start-2 text-small text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-body leading-6 font-semibold">{page.aside.accommodations.title}</h2>
            <p className="text-small text-muted">
              {page.aside.accommodations.before}{" "}
              <SmartLink
                href={`mailto:${page.aside.accommodations.email}`}
                className="text-link underline decoration-1 underline-offset-2 transition-colors hover:text-ink"
              >
                {page.aside.accommodations.email}
              </SmartLink>{" "}
              {page.aside.accommodations.after}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-body leading-6 font-semibold">{page.aside.data.title}</h2>
            <p className="text-small text-muted">{page.aside.data.text}</p>
            <TextLink href={page.aside.data.link.href} className="self-start text-[15px]">
              {page.aside.data.link.label}
            </TextLink>
          </div>
        </aside>
      </div>
    </Section>
  );
}
