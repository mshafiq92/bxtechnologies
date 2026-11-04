/* Contact page copy (bX v2 - Contact.dc.html). Contacts and offices live in content/site.ts. */

export const contactPage = {
  eyebrow: "Contact",
  title: "Tell us what is slow, manual or breaking.",
  intro:
    "Thirty minutes with the engineers who would do the work. You leave with an approach and a rough shape of effort, whether or not you hire us.",
  form: {
    name: { label: "Your name", placeholder: "Jane Fischer" },
    company: { label: "Company", placeholder: "Company name" },
    email: {
      label: "Work email",
      placeholder: "you@company.com",
      error: "Error: enter a work email address so we can reply.",
    },
    phone: { label: "Phone (optional)", placeholder: "+49 …" },
    need: {
      legend: "What do you need?",
      options: [
        "A new build",
        "An AI pilot",
        "Data or cloud work",
        "A dedicated team",
        "Not sure yet",
      ],
    },
    companySize: {
      label: "Company size",
      options: [
        "Startup, pre-revenue",
        "Startup, funded",
        "Small or mid-sized business",
        "Enterprise",
        "Public sector or other",
      ],
    },
    budget: {
      label: "Rough budget",
      options: ["Not established yet", "Under €25k", "€25k to €75k", "€75k to €200k", "Over €200k"],
    },
    message: {
      label: "What are you trying to do?",
      placeholder:
        "The process that is costing you time, the system that needs replacing, or the thing you want to find out whether AI can help with. A paragraph is plenty.",
    },
    submit: "Send and book a call",
    success: "Received. An engineer will reply within one working day.",
    note: "We reply within one working day. Nothing you send is shared outside the team, and we will sign your NDA before a first call if you prefer.",
  },
  aside: {
    direct: "Direct",
    hiring: {
      before: "Hiring enquiries go to",
      email: "jobs@bxtechnologies.net",
      rolesLink: "open roles",
    },
    offices: "Offices",
  },
  next: {
    eyebrow: "What happens next",
    title: "From message to proposal in about a week",
    intro:
      "No sales sequence. One reply from a person, then a call with whoever would actually lead the work.",
    steps: [
      {
        number: "01",
        title: "A reply within one working day",
        text: "From an engineer or a director, with a time proposal and anything we need to read first.",
      },
      {
        number: "02",
        title: "A thirty-minute technical call",
        text: "We ask about the current process, the constraints and what success would be measured by.",
      },
      {
        number: "03",
        title: "An approach in writing",
        text: "Shape of the work, team, rough effort and the engagement model we would recommend, including when that is a smaller one than you expected.",
      },
      {
        number: "04",
        title: "Discovery or start",
        text: "A short paid discovery for anything substantial, or straight into the first sprint where the scope is already clear.",
      },
    ],
  },
};
