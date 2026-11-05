import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { ogPalette, ogPaletteTokens } from "./og-palette";

const tokens = readFileSync(join(process.cwd(), "styles/tokens.css"), "utf8");

describe("OG image palette", () => {
  it.each(Object.entries(ogPaletteTokens))("%s matches %s in tokens.css", (key, token) => {
    const match = tokens.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`));
    expect(match, `${token} not found in tokens.css`).not.toBeNull();
    expect(ogPalette[key as keyof typeof ogPalette].toLowerCase()).toBe(match![1]!.toLowerCase());
  });
});
