import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SignatureRule } from "@/components/ui/signature-rule";
import { SmartLink } from "@/components/ui/smart-link";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getContactBandDefaults, type ContactBandContent } from "@/lib/content";

export type ContactBandProps = Partial<ContactBandContent> & {
  /** Anchor id: "contact" by default, "apply" on Careers. */
  id?: string;
};

/**
 * Contact band (BxContactBand.dc.html): navy band with the 3px signature rule, eyebrow,
 * H2, paragraph, primary CTA and a secondary link. Used near the end of most pages.
 * Pass the page's copy from lib/content; anything omitted falls back to the default band.
 */
export function ContactBand({ id = "contact", ...props }: ContactBandProps) {
  const d = { ...getContactBandDefaults(), ...props };
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} data-tone="deep" className="bg-deep text-on-deep">
      <SignatureRule />
      <div className="mx-auto flex max-w-wide flex-wrap items-end justify-between gap-x-12 gap-y-8 px-(--gutter) py-(--section)">
        <div className="flex max-w-[680px] flex-col gap-4">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <Heading as="h2" size="h2" id={headingId} className="text-on-deep">
            {d.title}
          </Heading>
          {d.text && <p className="text-body-lg text-on-deep-muted">{d.text}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href={d.ctaHref}>{d.cta}</ButtonLink>
          {d.secondary && d.secondaryHref && (
            <SmartLink
              href={d.secondaryHref}
              className="inline-flex min-h-11 items-center gap-2 font-medium whitespace-nowrap text-on-deep-accent transition-colors hover:text-on-deep"
            >
              {d.secondary}
              {d.secondaryArrow && <ArrowRightIcon size={16} />}
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}
