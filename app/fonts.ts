import localFont from "next/font/local";

/*
 * Self-hosted fonts (DESIGN-TOKENS-V2: "Self-host both").
 * Variable woff2 files, Latin subset, from Fontsource (SIL Open Font License, see app/fonts/).
 * Inter covers 400/500/600; JetBrains Mono covers 400/500.
 */

export const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  weight: "400 600",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
});
