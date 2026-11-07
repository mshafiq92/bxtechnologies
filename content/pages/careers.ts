/*
 * Careers, Role Detail and Apply page copy
 * (bX v2 - Careers.dc.html, bX v2 - Role Detail.dc.html, bX v2 - Apply.dc.html).
 * Roles live in content/roles.ts.
 */
import type { HeroDiagram } from "@/components/ui/diagram-card";
import type { ContactBandContent } from "@/lib/schemas/content";

export const careersPage = {
  hero: {
    eyebrow: "Careers",
    title: "Work on systems that go into production.",
    intro:
      "Build AI, software and cloud systems that run in production for real clients. You will own components rather than tickets, work directly with the people who use what you build, and grow with a team of 20+ people.",
    metrics: [
      { value: "20+", label: "engineers and specialists" },
      { value: "Hybrid", label: "after probation" },
      { value: "Islamabad", label: "office" },
    ],
    /** Used while at least one role is published. */
    primaryCta: { label: "See open roles", href: "#roles" },
    secondaryCta: { label: "Send a speculative CV", href: "/careers/apply", arrow: false },
    /** Used while no role is published. */
    primaryCtaNoRoles: { label: "Send your CV", href: "/careers/apply" },
    secondaryCtaNoRoles: { label: "How we hire", href: "#process" },
    /** OPEN-DECISIONS #2: real photo of BX people or offices. Until then the card below shows. */
    photo: null as { src: string; alt: string } | null,
    /** Hero card while there is no photo (same style as the About glance card). */
    glance: {
      caption: "Working at BX",
      entry: { t: "Islamabad office", d: "hybrid after probation" },
      core: { t: "Client projects", d: "AI · software · cloud · QA" },
      support: [
        { t: "Teams", d: "4 to 6 people" },
        { t: "Learning", d: "paid budget" },
        { t: "Health", d: "cover · leave" },
      ],
      outcomes: [
        { t: "Hiring", d: "four steps · about two weeks" },
        { t: "Code test", d: "ninety minutes · you keep it" },
      ],
      status: { t: "Every application read by a person", d: "answer within a week" },
    } satisfies HeroDiagram,
  },
  jumpLinks: [
    { href: "#roles", label: "Open roles" },
    { href: "#life", label: "What it is like" },
    { href: "#process", label: "Hiring process" },
    { href: "#apply", label: "Apply" },
  ],
  roles: {
    eyebrow: "Open roles",
    title: "Where we are hiring",
    speculative: {
      before: "Nothing that fits? Send your CV to",
      email: "jobs@bxtechnologies.net",
      after:
        "with a note on what you want to work on. We keep good applications on file and do contact people months later.",
    },
    /** Shown instead of the list while no role is published. */
    empty: {
      title: "No open positions right now",
      text: "We are not hiring for a specific role at the moment, but we always read speculative applications. Send your CV with a note on what you want to work on, and we will get in touch when something fits.",
      cta: { label: "Send a speculative CV", href: "/careers/apply" },
      secondary: {
        label: "Follow us on LinkedIn for new roles",
        href: "https://linkedin.com/company/bx-technologies",
      },
    },
  },
  life: {
    eyebrow: "What it is like",
    title: "Small team, real clients, no layers",
    intro:
      "Four to six people on an engagement, talking directly to the client's team. There is no account manager between you and the person whose problem you are solving, which is the best and hardest part of working here.",
    items: [
      {
        title: "You own something",
        text: "Components and services, not tickets. You decide how something is built, and you keep it running in production, which is why the decision is yours.",
      },
      {
        title: "Sensible working hours",
        text: "Afternoons overlap with client teams and mornings are kept for focused work. No night shifts, and a working day that ends when it is meant to.",
      },
      {
        title: "Learning is budgeted",
        text: "A certification and conference budget, with time inside the working week to use it. Several of our engineers moved into AI work exactly this way.",
      },
      {
        title: "Health and leave",
        text: "Health cover, paid annual leave and flexibility when life needs it. Hybrid working after probation, with the Islamabad office there when you want it.",
      },
    ],
  },
  process: {
    eyebrow: "Hiring process",
    title: "Four steps, about two weeks",
    intro:
      "No unpaid take-home projects that take a weekend. If we ask you to write code, it is ninety minutes and you keep it.",
    steps: [
      {
        number: "01",
        title: "Application review",
        text: "A person reads every application, and you get an answer either way within a week of applying.",
      },
      {
        number: "02",
        title: "Engineer conversation",
        text: "Forty-five minutes on what you have built and how you approach problems. A conversation, not a quiz.",
      },
      {
        number: "03",
        title: "Technical session",
        text: "Ninety minutes working through a realistic problem together, in your own editor and your own language.",
      },
      {
        number: "04",
        title: "Offer conversation",
        text: "Scope, team, compensation and start date, discussed with a director. Feedback whatever the outcome.",
      },
    ],
  },
  contactBand: {
    id: "apply",
    eyebrow: "Apply",
    title: "Apply with a CV and one paragraph",
    text: "Tell us what you built that you are proud of and what you want to be doing in two years. That paragraph matters more to us than the formatting of the CV.",
    cta: "jobs@bxtechnologies.net",
    ctaHref: "mailto:jobs@bxtechnologies.net",
    secondary: "Follow on LinkedIn",
    secondaryHref: "https://linkedin.com/company/bx-technologies",
    secondaryArrow: true,
  } satisfies ContactBandContent & { id: string },
};

export const roleDetailPage = {
  eyebrow: "Open role",
  allRolesLink: { label: "All roles", href: "/careers#roles" },
  sections: {
    work: "The work",
    whatYouWillDo: "What you will do",
    lookingFor: "What we are looking for",
    niceToHave: "Nice to have",
    offer: "What we offer",
    hiring: "How we hire",
  },
  glanceTitle: "Role at a glance",
  applyLabel: "Apply for this role",
  askQuestion: "Ask a question first",
  alsoHiring: { eyebrow: "Other roles", title: "Also hiring" },
};

export const applyPage = {
  eyebrow: "Apply",
  title: "A CV and one honest paragraph.",
  intro:
    "Ten minutes to fill in. A person reads every application and you get an answer either way within a week, including if the answer is no.",
  form: {
    role: {
      legend: "01 · The role",
      applyingFor: "Applying for",
      speculativeOption: "Speculative, no specific role",
      start: {
        label: "Earliest start",
        options: ["Immediately", "Two weeks' notice", "One month's notice", "Two months or more"],
      },
    },
    about: {
      legend: "02 · About you",
      name: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@email.com" },
      phone: { label: "Phone", placeholder: "+92 …" },
      location: { label: "Currently based in", placeholder: "City, country" },
      linkedin: { label: "LinkedIn", placeholder: "linkedin.com/in/…" },
      portfolio: { label: "GitHub or portfolio (optional)", placeholder: "github.com/…" },
      experience: {
        legend: "Years of relevant experience",
        options: ["Under 2", "2 to 4", "5 to 8", "8+"],
      },
    },
    cv: {
      legend: "03 · Your CV",
      dropLabel: "Drop your CV here or choose a file",
      hint: "PDF or DOCX, up to 10 MB",
      errors: {
        missing: "Error: add your CV so the team can read it.",
        type: "Error: upload your CV as a PDF or DOCX file.",
        size: "Error: the CV is larger than 10 MB. Send a smaller file.",
      },
    },
    words: {
      legend: "04 · In your words",
      proud: {
        label: "What have you built that you are proud of?",
        placeholder: "One project, what your part in it was, and what made it hard. Links welcome.",
      },
      future: {
        label: "What do you want to be doing in two years?",
        placeholder: "This matters to us more than the formatting of your CV.",
      },
      source: {
        label: "How did you hear about us? (optional)",
        placeholder: "LinkedIn, a friend, our insights page…",
      },
      consent:
        "I agree that BX Technologies may store my application for up to twelve months so the team can contact me about this and future roles.",
    },
    submit: "Send application",
    success: "Application received. You will hear back within a week.",
    preferEmail: {
      before: "Prefer email? Send the same things to",
      email: "jobs@bxtechnologies.net",
    },
  },
  aside: {
    next: {
      title: "What happens next",
      steps: [
        {
          number: "01",
          title: "A person reads it",
          text: "An answer either way within a week. No silent rejections.",
        },
        {
          number: "02",
          title: "A call with an engineer",
          text: "Forty-five minutes on what you have built. Not a quiz.",
        },
        {
          number: "03",
          title: "Ninety-minute technical session",
          text: "A realistic problem in your own editor. No unpaid weekend project, and you keep what you write.",
        },
        {
          number: "04",
          title: "Offer conversation",
          text: "Scope, team, compensation and start date, with a director. Feedback given whatever the outcome.",
        },
      ],
    },
    accommodations: {
      title: "Accommodations",
      before:
        "If anything about this process would be difficult for you (timing, format, accessibility) write to",
      email: "jobs@bxtechnologies.net",
      after: "and we will adjust it. Asking does not count against you.",
    },
    data: {
      title: "Your data",
      text: "Applications are visible to the hiring team only, kept for twelve months, and deleted on request. We do not pass them to third parties.",
      link: { label: "Privacy policy", href: "/privacy" },
    },
  },
};
