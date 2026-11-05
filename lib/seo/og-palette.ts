/*
 * Colours for generated images (OG cards, icons). ImageResponse renders outside the page, so it
 * cannot read the CSS variables in styles/tokens.css; these mirror them, and og-palette.test.ts
 * fails if they drift.
 */
export const ogPalette = {
  bg: "#f4f8fb", // guard-ignore: mirrors --bg for ImageResponse
  surface: "#fff", // guard-ignore: mirrors --surface for ImageResponse
  hairline: "#dce6ef", // guard-ignore: mirrors --hairline for ImageResponse
  text: "#0a1f33", // guard-ignore: mirrors --text for ImageResponse
  textMuted: "#4a5b6c", // guard-ignore: mirrors --text-muted for ImageResponse
  link: "#006ea3", // guard-ignore: mirrors --link for ImageResponse
  brandCyan: "#00aeef", // guard-ignore: mirrors --brand-cyan for ImageResponse
  brandGreen: "#79bb42", // guard-ignore: mirrors --brand-green for ImageResponse
} as const;

/** Token name in styles/tokens.css for each palette key. */
export const ogPaletteTokens: Record<keyof typeof ogPalette, string> = {
  bg: "--bg",
  surface: "--surface",
  hairline: "--hairline",
  text: "--text",
  textMuted: "--text-muted",
  link: "--link",
  brandCyan: "--brand-cyan",
  brandGreen: "--brand-green",
};
