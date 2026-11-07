/*
 * Legal pages: title block, on-this-page navigation and contact band.
 * The prose itself is in content/legal/<slug>.mdx.
 * Copy verbatim from bX v2 - Privacy / Terms / Cookies.dc.html ("carried over from v1 unchanged").
 *
 * Privacy and Cookies were rewritten on 2026-11-05 to match the real build (one cookie, Plausible
 * after consent, Turnstile, Resend). Imprint was added the same day (not in the design handoff).
 * Every legal page was revised with the owner on 2026-11-07 (company details, governing law,
 * GDPR and TDDDG legal bases). Legal review before launch: see the checklist comment at the top of each MDX file.
 */
import type { ContactBandContent } from "@/lib/schemas/content";

export type LegalSlug = "privacy" | "terms" | "cookies" | "imprint";

type LegalPage = {
  title: string;
  intro: string;
  lastUpdated: string;
  appliesTo: string;
  toc: { id: string; label: string }[];
  related: { label: string; href: string }[];
  contactBand: ContactBandContent;
};

/** Every legal page was revised with the owner. */
const revised2 = "2026-11-07";

export const legalPages: Record<LegalSlug, LegalPage> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "What we collect when you contact us, apply for a job or read this site, why we hold it, and how to have it removed.",
    lastUpdated: revised2,
    appliesTo: "bxtechnologies.net",
    toc: [
      { id: "who", label: "Who we are" },
      { id: "what", label: "What we collect" },
      { id: "why", label: "Why we hold it" },
      { id: "keep", label: "How long we keep it" },
      { id: "share", label: "Who else sees it" },
      { id: "transfer", label: "Where it is processed" },
      { id: "rights", label: "Your rights" },
      { id: "security", label: "Security" },
      { id: "changes", label: "Changes" },
    ],
    related: [
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookies policy", href: "/cookies" },
    ],
    contactBand: {
      eyebrow: "Legal",
      title: "Want your record removed, or have a question about this?",
      text: "One email to the team, answered by a person within thirty days and usually within two working days.",
      cta: "info@bxtechnologies.net",
      ctaHref: "mailto:info@bxtechnologies.net",
      secondary: "Contact page",
      secondaryHref: "/contact",
      secondaryArrow: true,
    },
  },
  terms: {
    title: "Terms & conditions",
    intro:
      "The terms for using this website, and the ground rules that sit underneath every engagement before a contract is signed.",
    lastUpdated: revised2,
    appliesTo: "bxtechnologies.net",
    toc: [
      { id: "who", label: "Who you are contracting with" },
      { id: "site", label: "Using this website" },
      { id: "content", label: "Our content" },
      { id: "yours", label: "Material you send us" },
      { id: "eng", label: "Engagements and quotes" },
      { id: "ip", label: "Ownership of what we build" },
      { id: "conf", label: "Confidentiality" },
      { id: "liability", label: "Liability" },
      { id: "law", label: "Governing law" },
      { id: "changes", label: "Changes" },
    ],
    related: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookies policy", href: "/cookies" },
    ],
    contactBand: {
      eyebrow: "Legal",
      title: "Need our NDA, or a copy of the standard contract?",
      text: "We will send the master services agreement and our mutual NDA before a first call if you prefer to read them early.",
      cta: "info@bxtechnologies.net",
      ctaHref: "mailto:info@bxtechnologies.net",
      secondary: "Contact page",
      secondaryHref: "/contact",
      secondaryArrow: true,
    },
  },
  cookies: {
    title: "Cookies policy",
    intro:
      "The cookie this site sets, how our analytics works without cookies, and how to change your choice.",
    lastUpdated: revised2,
    appliesTo: "bxtechnologies.net",
    toc: [
      { id: "what", label: "What a cookie is" },
      { id: "essential", label: "Essential cookie" },
      { id: "analytics", label: "Analytics" },
      { id: "forms", label: "Spam protection on forms" },
      { id: "none", label: "What we do not use" },
      { id: "control", label: "Changing your choice" },
      { id: "browser", label: "Browser controls" },
      { id: "changes", label: "Changes" },
    ],
    related: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
    contactBand: {
      eyebrow: "Legal",
      title: "Change your cookie choice",
      text: "Reopen the settings and decline analytics, or write to us if something on this page does not match what your browser shows.",
      cta: "Cookie settings",
      ctaHref: "#cookie-settings",
      secondary: "info@bxtechnologies.net",
      secondaryHref: "mailto:info@bxtechnologies.net",
    },
  },
  imprint: {
    title: "Imprint",
    intro:
      "Who is behind this website, how to reach us and where the company is registered (Impressum).",
    lastUpdated: revised2,
    appliesTo: "bxtechnologies.net",
    toc: [
      { id: "provider", label: "Provider" },
      { id: "responsible", label: "Responsible for content" },
      { id: "disputes", label: "Consumer dispute resolution" },
      { id: "more", label: "Privacy and terms" },
    ],
    related: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
    contactBand: {
      eyebrow: "Legal",
      title: "A legal or registration question?",
      text: "One email to the team, answered by a person, usually within two working days.",
      cta: "info@bxtechnologies.net",
      ctaHref: "mailto:info@bxtechnologies.net",
      secondary: "Contact page",
      secondaryHref: "/contact",
      secondaryArrow: true,
    },
  },
};

export const legalShared = {
  eyebrow: "Legal",
  labels: { lastUpdated: "Last updated", appliesTo: "Applies to", questions: "Questions" },
  onThisPage: "On this page",
};
