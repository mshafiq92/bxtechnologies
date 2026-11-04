/*
 * Legal pages: title block, on-this-page navigation and contact band.
 * The prose itself is in content/legal/<slug>.mdx.
 * Copy verbatim from bX v2 - Privacy / Terms / Cookies.dc.html ("carried over from v1 unchanged").
 *
 * OPEN: the Cookies policy describes a consent banner and cookies (bx_session, bx_consent,
 * bx_csrf, bx_stats) that the planned build does not set (cookieless analytics, no banner).
 * Update the legal text to match the real implementation in task T44, with legal review.
 */
import type { ContactBandContent } from "@/lib/schemas/content";

export type LegalSlug = "privacy" | "terms" | "cookies";

type LegalPage = {
  title: string;
  intro: string;
  lastUpdated: string;
  appliesTo: string;
  toc: { id: string; label: string }[];
  related: { label: string; href: string }[];
  contactBand: ContactBandContent;
};

const lastUpdated = "2026-09-17";

export const legalPages: Record<LegalSlug, LegalPage> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "What we collect when you contact us, apply for a job or read this site, why we hold it, and how to have it removed.",
    lastUpdated,
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
    lastUpdated,
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
      "Every cookie this site sets, what it does, how long it lasts, and how to turn the optional ones off.",
    lastUpdated,
    appliesTo: "bxtechnologies.net",
    toc: [
      { id: "what", label: "What a cookie is" },
      { id: "essential", label: "Essential cookies" },
      { id: "analytics", label: "Analytics cookies" },
      { id: "none", label: "What we do not use" },
      { id: "control", label: "Turning them off" },
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
      ctaHref: "#control",
      secondary: "info@bxtechnologies.net",
      secondaryHref: "mailto:info@bxtechnologies.net",
    },
  },
};

export const legalShared = {
  eyebrow: "Legal",
  labels: { lastUpdated: "Last updated", appliesTo: "Applies to", questions: "Questions" },
  onThisPage: "On this page",
};
