/*
 * Company identity, real contact details and offices (BUSINESS-RULES-V2 §9).
 * Mirrors SiteSettings in DATA-MODEL.md.
 */
import type { ContactBandContent, Office } from "@/lib/schemas/content";

export const site = {
  name: "BX Technologies",
  legalName: "BX Technologies Pvt Ltd",
  incorporated: "September 2019",
  /** Footer brand blurb */
  blurb:
    "AI-first engineering company. We build AI agents, machine learning and custom software, and run them on secure cloud platforms with DevOps, cybersecurity and managed IT services.",
  email: "info@bxtechnologies.net",
  careersEmail: "jobs@bxtechnologies.net",
  phone: { display: "+49 203 34689340", href: "tel:+4920334689340" },
  linkedin: {
    display: "linkedin.com/company/bx-technologies",
    href: "https://linkedin.com/company/bx-technologies",
  },
  locations: "Islamabad · Duisburg",
  /** Footer legal bar */
  registrations: "Registered with SECP · Member, Pakistan Software Export Board",
  /** Home hero trust line */
  registrationsShort: "SECP registered · PSEB member",
  /*
   * OPEN (docs/01 G5): Facebook and X point to the generic sites in the design.
   * Replace with the real profile URLs before launch.
   */
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/bx-technologies", icon: "linkedin" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "X", href: "https://x.com", icon: "x" },
  ],
} as const;

/*
 * Imprint (Impressum, § 5 DDG). Details from the SECP certificate of incorporation and the owner
 * (2026-11-07). A `null` value shows as "To be supplied" on dev and noindex previews and is left
 * out on the live site.
 */
export const imprint: Imprint = {
  /** Exact name on the SECP certificate of incorporation. */
  registeredName: "BX Technologies (Private) Limited",
  legalForm: "Private limited company, limited by shares, under the Companies Act 2017 of Pakistan",
  registeredOffice:
    "Office No. 2, Lower Ground Floor, Roshan Center, Blue Area, Islamabad 44000, Pakistan",
  /** Not a registered German branch: the office of our EU representative, Vision-ps GmbH. */
  germanAddress: "c/o Vision-ps GmbH, Hansastraße 3, 47058 Duisburg, Germany",
  representedBy: "Muhammad Shafiq, Director",
  /** Representative in the EU under Art. 27 GDPR (BX has no EU establishment). */
  euRepresentative: "Vision-ps GmbH, Hansastraße 3, 47058 Duisburg, Germany",
  register:
    "Securities and Exchange Commission of Pakistan (SECP), Company Registration Office Islamabad",
  /** SECP Corporate Universal Identification Number. */
  registrationNumber: "CUIN 0139549",
  incorporated: "20 September 2019, Islamabad",
  /** No German VAT ID. Pakistani National Tax Number (Federal Board of Revenue). */
  taxNumber: "NTN 6403841 (Federal Board of Revenue, Pakistan)",
  /** Person responsible for editorial content (§ 18 (2) MStV): name and postal address. */
  contentResponsible:
    "Muhammad Shafiq, Office No. 2, Lower Ground Floor, Roshan Center, Blue Area, Islamabad 44000, Pakistan",
};

export type Imprint = {
  registeredName: string;
  legalForm: string;
  registeredOffice: string | null;
  germanAddress: string | null;
  representedBy: string | null;
  euRepresentative: string | null;
  register: string;
  registrationNumber: string | null;
  incorporated: string | null;
  taxNumber: string | null;
  contentResponsible: string | null;
};

export type SocialIcon = (typeof site.social)[number]["icon"];

/** Offices (About "Two locations, one team"; Contact aside uses `contactBody`). */
export const offices: Office[] = [
  {
    kind: "Delivery",
    city: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
    body: "Our engineering centre and home to the AI, software, data, cloud and QA teams. The working day overlaps CET by five hours and US Eastern by two.",
    contactBody: "Engineering, data, QA and AI teams. Working day overlaps CET by five hours.",
    chips: ["AI", "Software", "Cloud", "QA"],
  },
  {
    kind: "Europe",
    city: "Duisburg",
    country: "Germany",
    countryCode: "DE",
    body: "Our address for clients in the EU. Workshops, project kick-offs and handovers can be held on site, arranged from here whenever a project needs them.",
    contactBody: "Client contact for EU engagements. On-site visits arranged from here.",
    chips: ["Client contact", "Workshops", "On-site"],
  },
];

/** Default copy for the contact band (BxContactBand.dc.html). Pages override per context. */
export const contactBandDefaults: ContactBandContent = {
  eyebrow: "Start a project",
  title: "Tell us what is slow, manual or breaking.",
  text: "A 30-minute call with the engineers who would do the work. You leave with an approach, whether or not you hire us.",
  cta: "Book a technical call",
  ctaHref: "/contact",
  secondary: "info@bxtechnologies.net",
  secondaryHref: "mailto:info@bxtechnologies.net",
};
