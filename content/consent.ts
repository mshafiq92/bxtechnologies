/*
 * Cookie banner copy. Not in the design handoff (added after it, with the client's approval);
 * written to the same copy rules: plain, short, no dashes, both choices equally easy.
 */
export const consentCopy = {
  label: "Cookie consent",
  notice: {
    title: "Cookies and analytics",
    text: "We would like to count page views with Plausible, an EU analytics service that sets no cookies and builds no profile of you. It only runs if you accept. Declining changes nothing else on this site.",
    accept: "Accept",
    decline: "Decline",
    settings: "Settings",
    policy: { label: "Cookies policy", href: "/cookies" },
  },
  settings: {
    title: "Cookie settings",
    essential: {
      name: "Essential",
      text: "One cookie, bx_consent, remembers this choice for twelve months.",
      status: "Always on",
    },
    analytics: {
      name: "Analytics",
      text: "Plausible counts page views, referring sites and approximate country, in aggregate. No cookies and no profile of you.",
    },
    save: "Save choices",
    cancel: "Cancel",
  },
  footerButton: "Cookie settings",
} as const;

export type ConsentCopy = typeof consentCopy;
