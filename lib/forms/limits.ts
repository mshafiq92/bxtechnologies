/*
 * CV upload limit, shared by the apply form (client) and the server action.
 * 10 MB by default. Vercel caps a function request at 4.5 MB, so staging and previews set
 * NEXT_PUBLIC_CV_MAX_MB=4 and the form shows its normal size error instead of a failed request.
 */
export const CV_MAX_MB = Number(process.env.NEXT_PUBLIC_CV_MAX_MB) || 10;
export const CV_MAX_BYTES = CV_MAX_MB * 1024 * 1024;

/** Puts the configured limit into copy written for 10 MB ("up to 10 MB"). */
export const withCvLimit = (text: string) => text.replace("10 MB", `${CV_MAX_MB} MB`);
