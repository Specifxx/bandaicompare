// Lighthouse's SEO check ("Links do not have descriptive text") and a screen reader's list of links read a link's text alone.
// "More" → /tools failed it on every page until 2026-11-13 (ported from YGO Compare): the label stays "More" to the eye, and
// words that are read but never drawn finish it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test('the header\'s "More" link is finished in words that are read, never drawn', () => {
  const header = readFileSync(new URL("../src/components/Header.tsx", import.meta.url), "utf8");
  const nav = readFileSync(new URL("../src/components/HeaderNav.tsx", import.meta.url), "utf8");
  assert.match(header, /\{ href: "\/tools", label: "More", rest: "tools and guides",/);
  assert.match(nav, /\{n\.rest && <span className="sr-only"> \{n\.rest\}<\/span>\}/);
  // No other header label says nothing alone without its rest.
  for (const [, label, rest] of header.matchAll(/label: "([^"]+)"(, rest: "[^"]+")?/g)) {
    if (["more", "here", "read more", "see more", "learn more", "go"].includes(label.toLowerCase())) assert.ok(rest, `"${label}" has words to finish it`);
  }
});
