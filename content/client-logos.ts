/*
 * Home "Clients & partners" strip, in the order of bX v2 - Home.dc.html.
 *
 * BUSINESS-RULES-V2 §2: only logos with `cleared: true` render; the strip hides when none are.
 * Decision (2026-11-04): the current logos are shown, so they ship marked cleared.
 * Set a logo to `cleared: false` to hide it without a code change.
 *
 * This file is exempt from the blocked-names guard rail (scripts/guardrails.mjs).
 */
import type { ClientLogo } from "@/lib/schemas/content";

export const clientLogos: ClientLogo[] = [
  {
    name: "Braintime",
    src: "/clients/braintime.png",
    monoSrc: "/clients/mono/braintime.png",
    width: 220,
    height: 110,
    cleared: true,
  },
  {
    name: "ILED",
    src: "/clients/iled.png",
    monoSrc: "/clients/mono/iled.png",
    width: 200,
    height: 60,
    cleared: true,
  },
  {
    name: "MetaKlouds",
    src: "/clients/metacloud.png",
    monoSrc: "/clients/mono/metacloud.png",
    width: 302,
    height: 34,
    cleared: true,
  },
  {
    name: "HydroSensing",
    src: "/clients/hydro.png",
    monoSrc: "/clients/mono/hydro.png",
    width: 250,
    height: 46,
    cleared: true,
  },
  {
    name: "Jabtco",
    src: "/clients/jabtco.png",
    monoSrc: "/clients/mono/jabtco.png",
    width: 140,
    height: 130,
    cleared: true,
  },
  {
    name: "Hausmeisterservice Münsterland",
    src: "/clients/gardening.png",
    monoSrc: "/clients/mono/gardening.png",
    width: 1280,
    height: 284,
    cleared: true,
  },
  {
    name: "Perform Engineering Services",
    src: "/clients/pes.gif",
    monoSrc: "/clients/mono/pes.png",
    width: 200,
    height: 67,
    cleared: true,
  },
  {
    name: "Client",
    src: "/clients/client-logo.png",
    monoSrc: "/clients/mono/client-logo.png",
    width: 448,
    height: 97,
    cleared: true,
  },
];
