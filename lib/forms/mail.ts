import { Resend } from "resend";

/*
 * Email delivery through Resend (decided 2026-11-04).
 * Without RESEND_API_KEY the message is logged instead of sent in development, so the forms
 * can be exercised locally; in production a missing key is an error, never a silent success.
 */

export type MailAttachment = { filename: string; content: Buffer };

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

export function mailConfig() {
  return {
    from: process.env.MAIL_FROM || "bX Technologies <website@bxtechnologies.net>",
    enquiries: process.env.MAIL_TO_ENQUIRIES || "info@bxtechnologies.net",
    careers: process.env.MAIL_TO_CAREERS || "jobs@bxtechnologies.net",
  };
}

/**
 * FORMS_DRY_RUN=true logs every email instead of sending it, in any environment. It exists for
 * the end-to-end test server only; never set it on a real deployment.
 */
export function formsDryRun(): boolean {
  return process.env.FORMS_DRY_RUN === "true";
}

export async function sendMail(mail: Mail): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (formsDryRun()) {
    console.info("[mail:dry-run]", { to: mail.to, subject: mail.subject });
    return { ok: true };
  }
  const resend = getClient();
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail:dev] RESEND_API_KEY not set, logging instead of sending", {
        to: mail.to,
        subject: mail.subject,
        attachments: mail.attachments?.map((a) => `${a.filename} (${a.content.byteLength} bytes)`),
      });
      return { ok: true };
    }
    return { ok: false, reason: "RESEND_API_KEY is not configured" };
  }

  const { error } = await resend.emails.send({
    from: mailConfig().from,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    replyTo: mail.replyTo,
    attachments: mail.attachments,
  });
  if (error) {
    console.error("[mail] Resend error", error);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}
