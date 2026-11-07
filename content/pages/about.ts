/* About page copy (bX v2 - About.dc.html). Offices live in content/site.ts. */
import type { ContactBandContent } from "@/lib/schemas/content";

export const aboutPage = {
  hero: {
    eyebrow: "About BX",
    title: "An engineering company that stayed an engineering company.",
    intro:
      "BX Technologies was incorporated in Pakistan in September 2019 and has been building software for European and Asian clients since. We are engineers first: the people who scope your work are the people who write it.",
    metrics: [
      { value: "2019", label: "incorporated" },
      { value: "2", label: "locations, one team" },
      { value: "94%", label: "on-time delivery", placeholder: true },
    ],
    primaryCta: { label: "Talk to an engineer", href: "#contact" },
    secondaryCta: { label: "Meet the team", href: "#people" },
    /** OPEN-DECISIONS #2: real photo of bX people or offices. Null renders a text-only hero. */
    photo: null as { src: string; alt: string } | null,
  },
  jumpLinks: [
    { href: "#why", label: "Why us" },
    { href: "#principles", label: "How we work" },
    { href: "#people", label: "People" },
    { href: "#story", label: "Story" },
    { href: "#offices", label: "Offices" },
  ],
  why: {
    eyebrow: "Why us",
    title: "Three reasons clients give when they stay",
    intro:
      "We are not the cheapest offshore option and we do not pretend to be. What we offer is a team you can reach, in a timezone that overlaps yours, that ships.",
    items: [
      {
        number: "01",
        title: "Senior people on the work",
        text: "No bait-and-switch between the pitch and the delivery. The engineer in your kickoff call is on your sprints.",
      },
      {
        number: "02",
        title: "European hours, Asian cost base",
        text: "Duisburg for contracting and client contact, Islamabad for delivery, with a working day that overlaps CET by five hours.",
      },
      {
        number: "03",
        title: "We hand over what we build",
        text: "Documentation, repository access and a walkthrough are part of the price. Nothing is written so that you have to keep us.",
      },
    ],
  },
  principles: {
    eyebrow: "How we work",
    title: "Five things we hold to, including when it costs us",
    items: [
      {
        number: "01",
        title: "We scope before we quote",
        text: "A fixed price given before anyone has read the existing system is a guess someone will pay for later. We run a short paid discovery on anything substantial, and you own the output whether or not you continue with us.",
      },
      {
        number: "02",
        title: "Small teams, direct contact",
        text: "Four to six people on an engagement, talking to your team without an account manager relaying messages. Escalation goes to a director, not a ticket queue.",
      },
      {
        number: "03",
        title: "Production from week one",
        text: "Pipelines, environments and monitoring go in before features do. It slows the first demo and saves the last month.",
      },
      {
        number: "04",
        title: "We say when something is a bad idea",
        text: "Several of our engagements started by talking a client out of the thing they asked for. We have also turned down work we were not the right team for.",
      },
      {
        number: "05",
        title: "Measured, not claimed",
        text: "Every metric on this site carries a number we agreed with the client on how to measure, with the baseline stated. Where we could not measure it, we say so.",
      },
    ],
  },
  people: {
    eyebrow: "People",
    title: "Who you will actually be working with",
    // Design notes addressed to bX (OPEN-DECISIONS #6); replace once real names arrive.
    intro:
      "Names and roles come from your current team page. Initials stand in until a real portrait is supplied.",
    note: "Send us the real names, titles and photographs and this section fills in without any further design work. We would rather show five people honestly than a grid of stock portraits.",
    members: [
      {
        name: "[Name]",
        initials: "LD",
        role: "Leadership",
        text: "Director, delivery and client contracting",
      },
      {
        name: "[Name]",
        initials: "EL",
        role: "Engineering lead",
        text: "Architecture, code review, technical escalation",
      },
      {
        name: "[Name]",
        initials: "AI",
        role: "AI engineering",
        text: "Agents, retrieval, model evaluation",
      },
      {
        name: "[Name]",
        initials: "DC",
        role: "Data & cloud",
        text: "Pipelines, platform, infrastructure as code",
      },
      {
        name: "[Name]",
        initials: "QE",
        role: "Quality engineering",
        text: "Automation, performance, release validation",
      },
    ],
  },
  story: {
    eyebrow: "Story",
    title: "From a contract team to a German-partnered firm",
    // Design note addressed to bX; replace once the public wording is confirmed.
    intro:
      "Dates are accurate; the detail under each is a placeholder until you confirm what you want stated publicly.",
    entries: [
      {
        year: "2019",
        title: "Incorporated in Islamabad",
        text: "Registered with the SECP in March, starting with custom software for regional clients.",
      },
      {
        year: "2021",
        title: "First European engagements",
        text: "Automotive and insurance work in Germany, run on CET overlap rather than handover notes.",
      },
      {
        year: "2023",
        title: "Duisburg presence, Vis Group partnership",
        text: "A German contracting entity and a delivery partnership that puts a local counterpart in front of EU clients.",
      },
      {
        year: "2024",
        title: "AI engineering as a practice",
        text: "Retrieval and agent work moved from experiments inside other projects to a standing team with its own evaluation practice.",
      },
    ],
  },
  offices: {
    eyebrow: "Offices",
    title: "Two locations, one team",
    registrations: {
      kind: "Registrations",
      title: "Where we are registered",
      text: "Securities and Exchange Commission of Pakistan · Pakistan Software Export Board member · partnered with Vis Group, Germany.",
      link: { label: "Request our company documents", href: "#contact" },
    },
  },
  contactBand: {
    eyebrow: "Start a project",
    title: "Want to know whether we are the right team?",
    text: "Thirty minutes with the engineers who would do the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
    cta: "Book a technical call",
    ctaHref: "/contact",
    secondary: "Read our insights",
    secondaryHref: "/insights",
    secondaryArrow: true,
  } satisfies ContactBandContent,
};
