#!/usr/bin/env node
/**
 * Guard rails for the bX website (task T06). Fails CI when a design or copy rule is broken.
 *
 *   1. raw-colour      No hex, rgb()/hsl()/... or Tailwind default palette classes outside styles/tokens.css
 *   2. status-colour   Green/status colour never on links, buttons or metric numbers (BUSINESS-RULES-V2 §1)
 *   3. dash            No em or en dashes in site copy (BUSINESS-RULES-V2 §8)
 *   4. printed-count   Never print a count: "All 12", "9 articles" (BUSINESS-RULES-V2 §4)
 *   5. blocked-name    No blocked client names in content (BUSINESS-RULES-V2 §2), list in content/blocked-names.json
 *
 * Put `guard-ignore` on a line (in a comment) to skip that line, with a reason.
 * Usage: node scripts/guardrails.mjs            (scans the project)
 *        import { checkSource } from "./guardrails.mjs"  (used by unit tests)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const SCAN_DIRS = ["app", "components", "content", "lib", "styles"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".md", ".mdx", ".json"]);
const TOKEN_FILE = "styles/tokens.css";
const BLOCKED_NAMES_FILE = "content/blocked-names.json";
/** Files exempt from the blocked-name rule (the logo strip is shown by decision). */
const BLOCKED_NAME_EXEMPT = [/^content\/blocked-names\.json$/, /^content\/client-logos\./];

const HEX = /(?<![\w&/-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/;
const COLOUR_FN = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/;
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const PALETTE_CLASS = new RegExp(
  `(?<![\\w-])(?:bg|text|border(?:-[trblxy])?|ring|outline|fill|stroke|from|via|to|decoration|divide|placeholder|caret|accent|shadow)-(?:(?:${PALETTE})-\\d{2,3}|white|black)(?![\\w-])`,
);
const STATUS_CLASS =
  /(?<![\w-])(?:bg|text|border|fill|stroke|decoration|outline|ring)-(?:status|brand-green|success)(?![\w-])/;
const INTERACTIVE_TAG = /<(a|button|Link|Button|TextLink)\b[^>]*>/gs;
const METRIC_TAG = /<\w+\b[^>]*(?:text-metric|data-metric)[^>]*>/gs;
const DASH = /[–—]|&[mn]dash;|\\u201[34]/;
const NUMBER_WORDS =
  "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty";
const COUNTED_THINGS =
  "services|articles|insights|posts|projects|roles|jobs|openings|industries|sectors|case studies|clients";
const PRINTED_COUNT = [
  new RegExp(`\\ball\\s+(?:\\d+|${NUMBER_WORDS})\\b`, "i"),
  new RegExp(`\\b(?:\\d+|${NUMBER_WORDS})\\s+(?:${COUNTED_THINGS})\\b`, "i"),
];

/** Line numbers (1-based) of the match index inside text. */
function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

function isIgnored(lines, lineNo) {
  return (lines[lineNo - 1] ?? "").includes("guard-ignore");
}

/**
 * Check one file's source. Returns a list of { rule, line, message }.
 * @param {string} path project-relative path with forward slashes
 * @param {string} text file contents
 * @param {{ blockedNames?: string[] }} [options]
 */
export function checkSource(path, text, options = {}) {
  const problems = [];
  const lines = text.split("\n");
  const ext = extname(path);
  const isCode = [".ts", ".tsx", ".js", ".mjs"].includes(ext);
  const isMarkup = ext === ".tsx" || ext === ".mdx";
  const isCopy = path.startsWith("content/") || isMarkup;

  const add = (rule, line, message) => {
    if (!isIgnored(lines, line)) problems.push({ rule, line, message });
  };

  // 1. Raw colours
  if (path !== TOKEN_FILE && ext !== ".json") {
    lines.forEach((line, i) => {
      if (/\bhref\s*[=:]/.test(line) || /\bid\s*=/.test(line)) return; // anchors such as "#faq"
      if (HEX.test(line))
        add("raw-colour", i + 1, `Raw hex colour "${line.match(HEX)[0]}". Use a token.`);
      if (COLOUR_FN.test(line)) add("raw-colour", i + 1, "Raw colour function. Use a token.");
      if ((isCode || isMarkup) && PALETTE_CLASS.test(line))
        add(
          "raw-colour",
          i + 1,
          `Tailwind default palette class "${line.match(PALETTE_CLASS)[0]}". Use a bX token.`,
        );
    });
  }

  // 2. Status colour on interactive elements or metric numbers
  if (isMarkup) {
    for (const re of [INTERACTIVE_TAG, METRIC_TAG]) {
      for (const m of text.matchAll(re)) {
        if (STATUS_CLASS.test(m[0])) {
          add(
            "status-colour",
            lineOf(text, m.index),
            "Green/status colour on a link, button or metric. Green is only for status dots beside words.",
          );
        }
      }
    }
  }

  // 3. Dashes and 4. printed counts, in copy only
  if (isCopy) {
    lines.forEach((line, i) => {
      if (DASH.test(line)) add("dash", i + 1, 'Em or en dash in copy. Use a comma, colon or "to".');
      for (const re of PRINTED_COUNT) {
        const m = line.match(re);
        if (m)
          add("printed-count", i + 1, `Printed count "${m[0]}". Say "All services", not a number.`);
      }
    });
  }

  // 5. Blocked client names in content
  const names = options.blockedNames ?? [];
  if (path.startsWith("content/") && !BLOCKED_NAME_EXEMPT.some((re) => re.test(path))) {
    for (const name of names) {
      const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      lines.forEach((line, i) => {
        if (re.test(line))
          add("blocked-name", i + 1, `Blocked client name "${name}". Use "Sector · Region · NDA".`);
      });
    }
  }

  return problems;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(extname(entry)) && !/\.test\.[cm]?[jt]sx?$/.test(entry)) out.push(full);
  }
  return out;
}

function loadBlockedNames(root) {
  const file = join(root, BLOCKED_NAMES_FILE);
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, "utf8"));
  return Array.isArray(data.names) ? data.names.filter(Boolean) : [];
}

function main() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const blockedNames = loadBlockedNames(root);
  const files = SCAN_DIRS.flatMap((d) => walk(join(root, d)));
  let count = 0;
  for (const file of files) {
    const rel = relative(root, file).split(sep).join("/");
    const problems = checkSource(rel, readFileSync(file, "utf8"), { blockedNames });
    for (const p of problems) {
      console.error(`${rel}:${p.line}  [${p.rule}]  ${p.message}`);
      count++;
    }
  }
  if (count > 0) {
    console.error(`\nGuard rails: ${count} problem(s) found.`);
    process.exit(1);
  }
  console.log(`Guard rails: ${files.length} files checked, no problems.`);
}

if (
  import.meta.url.startsWith("file:") &&
  process.argv[1] &&
  fileURLToPath(import.meta.url) === process.argv[1]
) {
  main();
}
