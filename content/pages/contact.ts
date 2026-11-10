/* Contact page copy (bX v2 - Contact.dc.html). Contacts and offices live in content/site.ts. */

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact our team",
  intro:
    "A new project, a system that needs work, or simply a question. You'll hear back from an engineer, not a sales team, within one working day.",
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
        "Data or cloud",
        "A dedicated team",
        "General enquiry",
      ],
    },
    message: {
      label: "Your message",
      placeholder: "Write your message",
    },
    submit: "Send and book a call",
    success: "Received. An engineer will reply within one working day.",
    note: "Nothing you send is shared outside our team, and we will sign your NDA before a first call if you prefer.",
  },
  aside: {
    direct: "Direct",
    offices: "Locations",
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
