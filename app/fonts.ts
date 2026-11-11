import localFont from "next/font/local";

/*
 * Self-hosted fonts (DESIGN-TOKENS-V2: "Self-host both").
 * Variable woff2 files, Latin subset, from Fontsource (SIL Open Font License, see app/fonts/).
 * IBM Plex Sans (100 to 700) for text; JetBrains Mono (400/500) for headings, menus, buttons and
 * labels (owner decision 2026-11-11).
 */

export const ibmPlexSans = localFont({
  src: "./fonts/ibm-plex-sans-latin-wght.woff2",
  weight: "100 700",
  style: "normal",
  display: "swap",
  variable: "--font-ibm-plex-sans",
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
