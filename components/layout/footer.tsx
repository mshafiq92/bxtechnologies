import type { ComponentType } from "react";

import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/smart-link";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { getConsentCopy, getNavigation, getSiteSettings, type SocialIcon } from "@/lib/content";

import { Logo } from "./logo";

const socialIcons: Record<SocialIcon, ComponentType<{ size?: number }>> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  x: XIcon,
};

const footerLink = "text-small text-on-deep transition-colors hover:text-on-deep-accent";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow as="h2" tone="deep">
        {title}
      </Eyebrow>
      {children}
    </div>
  );
}

const legalLink = "text-on-deep-muted transition-colors hover:text-on-deep";

/** Navy footer: brand, Services, Company, Contact, Follow us, then the legal bar. */
export function Footer() {
  const nav = getNavigation();
  const site = getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer data-tone="deep" className="bg-deep text-on-deep-muted">
      <div className="mx-auto flex max-w-wide flex-col gap-12 px-(--gutter) pt-16 pb-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 min-[1080px]:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col gap-4 sm:col-span-2 min-[1080px]:col-span-1">
            <Logo tone="deep" />
            <p className="max-w-[30ch] text-small">{site.blurb}</p>
          </div>

          {nav.footerColumns.map((col) => (
            <Column key={col.title} title={col.title}>
              <ul className="flex flex-col gap-3 text-small">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink href={link.href} className={footerLink}>
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Column>
          ))}

          <Column title="Contact">
            <ul className="flex flex-col gap-3 text-small">
              <li>
                <SmartLink href={nav.headerCta.href} className={footerLink}>
                  {nav.headerCta.label}
                </SmartLink>
              </li>
              <li>
                <SmartLink href={`mailto:${site.email}`} className={footerLink}>
                  {site.email}
                </SmartLink>
              </li>
              <li>
                <SmartLink href={site.phone.href} className={footerLink}>
                  {site.phone.display}
                </SmartLink>
              </li>
              <li className="text-small">{site.locations}</li>
            </ul>
          </Column>

          <Column title="Follow us">
            <ul className="flex gap-2">
              {site.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <SmartLink
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-md border border-deep-hairline text-on-deep transition-colors hover:border-on-deep-accent hover:text-on-deep-accent"
                    >
                      <Icon size={16} />
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
          </Column>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-deep-hairline pt-6 text-small">
          <span>
            © {year} {site.legalName}
          </span>
          <span>{site.registrations}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
            {nav.legalLinks.map((link) => (
              <li key={link.label}>
                <SmartLink href={link.href} className={legalLink}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <CookieSettingsButton
                label={getConsentCopy().footerButton}
                className={cn(legalLink, "cursor-pointer")}
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
