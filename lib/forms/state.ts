/** Result of a form server action (shared by the actions and the client forms). */
export type FormState = {
  status: "idle" | "success" | "error";
  /** Error message for the whole form (starts with "Error:"). */
  message?: string;
  /** Field-level errors keyed by input name. */
  fieldErrors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

/** Hidden field that only bots fill in. */
export const HONEYPOT_FIELD = "website";
