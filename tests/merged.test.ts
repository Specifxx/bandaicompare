import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import merge from "../data/redirects/tcgprices.json";
import { mergedUrl } from "@/lib/merged";

// BandaiCompare merged into TCG Prices (owner, 2026-11-26; DECISIONS.md): every page 301s, in one hop, to its twin
// on tcgprices.app; the endpoints the network still reads (the price-alert feed, the eBay deletion hook, robots and
// the sitemap) stay on this host.
const NEXT_CONFIG = path.join(process.cwd(), "next.config.js");
type Rule = { source: string; destination: string; statusCode?: number };
const rules = async (): Promise<Rule[]> => ((await import(NEXT_CONFIG)).default as { redirects: () => Promise<Rule[]> }).redirects();

test("the frozen map covers the site's pages, each to a TCG Prices path", () => {
  assert.equal(merge.host, "https://tcgprices.app");
  const paths = merge.paths as Record<string, string>;
  assert.ok(Object.keys(paths).length >= 500);
  for (const [from, to] of Object.entries(paths)) {
    assert.ok(from.startsWith("/") && to.startsWith("/"), from);
    assert.doesNotMatch(to, /bandaicompare/);
  }
  for (const g of ["union-arena", "dragon-ball-super-fusion-world", "digimon-card-game"]) assert.equal(paths[`/games/${g}`], `/games/${g}`);
  assert.equal(paths["/"], "/");
});

test("every mapped page and every other path 301s to tcgprices.app; the kept endpoints stay", async () => {
  const all = await rules();
  for (const r of all) {
    assert.equal(r.statusCode, 301, r.source);
    assert.ok(r.destination.startsWith("https://tcgprices.app/"), `${r.source} -> ${r.destination}`);
  }
  for (const [from, to] of Object.entries(merge.paths as Record<string, string>)) {
    assert.ok(all.some((r) => r.source === from && r.destination === `https://tcgprices.app${to}`), from);
  }
  const rest = all.at(-1)!;
  assert.equal(rest.destination, "https://tcgprices.app/:path");
  const body = rest.source.match(/^\/:path\((.*)\)$/)![1];
  const re = new RegExp(`^${body}$`);
  for (const p of ["sealed/booster-box", "games/union-arena/case", "stores", "blog", "embed/card/x", "llms.txt"]) assert.ok(re.test(p), p);
  for (const p of ["card/some-old-single", "api/ebay/account-deletion", "alert-feed.json", "robots.txt", "sitemap.xml", "go", "_next/static/x.js"]) assert.ok(!re.test(p), p);
});

test("the card page sends what it resolves through the same map", () => {
  assert.equal(mergedUrl("/sets/across-time"), `https://tcgprices.app${(merge.paths as Record<string, string>)["/sets/across-time"] ?? "/sets/across-time"}`);
  assert.equal(mergedUrl("/games/digimon-card-game?x=1"), "https://tcgprices.app/games/digimon-card-game");
});
