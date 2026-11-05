/*
 * Server-side validation for the four site forms. Field names match the inputs in
 * components/sections/*-form.tsx; payload shapes follow Enquiry / Application / Subscriber
 * in DATA-MODEL.md so a future console can store them without changing the forms.
 * Messages follow BUSINESS-RULES-V2 §8: errors start with "Error:".
 */
import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const emailSchema = z
  .string()
  .trim()
  .max(254)
  .regex(/.+@.+\..+/, "Error: enter a work email address so we can reply.");

/** Home quick form and the Contact page form share one enquiry shape. */
export const enquirySchema = z.object({
  source: z.enum(["home", "contact"]),
  name: optionalText(120),
  company: optionalText(160),
  email: emailSchema,
  phone: optionalText(40),
  /** Home: "Where are you starting from?" */
  stage: optionalText(60),
  /** Contact: "What do you need?" */
  need: optionalText(60),
  companySize: optionalText(60),
  budget: optionalText(60),
  message: optionalText(5000),
});

export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .max(254)
    .regex(/.+@.+\..+/, "Error: enter an email address for the digest."),
});

export { CV_MAX_BYTES } from "./limits";
export const CV_EXTENSIONS = /\.(pdf|docx?)$/i;

export const applicationSchema = z.object({
  role: text(80).min(1),
  start: optionalText(60),
  name: text(120).min(1, "Error: enter your full name."),
  email: z
    .string()
    .trim()
    .max(254)
    .regex(/.+@.+\..+/, "Error: enter an email address so we can reply."),
  phone: optionalText(40),
  location: optionalText(120),
  linkedin: optionalText(300),
  portfolio: optionalText(300),
  experience: optionalText(20),
  proud: text(5000).min(1, "Error: tell us about something you have built."),
  future: text(5000).min(1, "Error: tell us what you want to be doing in two years."),
  source: optionalText(200),
  consent: z.literal("on", { error: "Error: we need your consent to store the application." }),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type Application = z.infer<typeof applicationSchema>;
