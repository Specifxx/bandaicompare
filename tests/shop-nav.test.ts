import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { navGroups } from "@/lib/nav";
import { shopNav } from "@/lib/shop-nav";
import { GAME_TYPE_MIN, gameTypeHubs } from "@/lib/game-hubs";
import { sealedHubs } from "@/lib/hubs";
import { LINES } from "@/lib/lines";
import { products, sets } from "@/lib/data";

// Navigation by game, then product type and set (owner, 2026-11-09): three games on one site, so each gets its own header dropdown,
// sidebar group and type pages. Every link is a hub that exists.
test("every game has a header item and a sidebar group, and every shop link is a real hub", () => {
  const s = shopNav();
  assert.equal(s.menus.games.length, LINES.length);
  const hubs = new Set<string>(["/sealed", "/sets", "/preorders"]);
  for (const l of LINES) {
    hubs.add(`/games/${l.slug}`);
    for (const h of gameTypeHubs(l)) hubs.add(`/games/${l.slug}/${h.slug}`);
  }
  for (const h of sealedHubs()) hubs.add(`/sealed/${h.slug}`);
  const setSlugs = new Set(sets().map((x) => `/sets/${x.slug}`));
  const rail = navGroups({ shop: s.groups }).flatMap((g) => g.links).map((l) => l.href);
  const menu = [...s.menus.games.flatMap((g) => g.columns), ...s.menus.sealed].flatMap((g) => g.links);
  for (const l of [...menu, ...s.groups.flatMap((g) => g.links)]) assert.ok(hubs.has(l.href) || setSlugs.has(l.href), `${l.href} is not a hub`);
  for (const l of menu) assert.ok(rail.includes(l.href) || l.href === "/preorders", `${l.href} is in a dropdown but not the sidebar`);
  assert.equal(new Set(rail).size, rail.length, "the sidebar repeats a link");
  assert.deepEqual(navGroups({ shop: s.groups }).slice(0, LINES.length).map((g) => g.title), LINES.map((l) => l.name), "the games come first");
});

test("a game's type page holds only that game's products, and a thin one stays out of the menus", () => {
  const byId = new Map(sets().map((x) => [x.id, x]));
  const own = (id: string) => new Set(products().filter((p) => p.kind === "sealed" && byId.get(p.setId)?.line === id).map((p) => p.id));
  for (const l of LINES) {
    const mine = own(l.id);
    for (const h of gameTypeHubs(l)) for (const p of h.items) assert.ok(mine.has(p.id), `${l.id}/${h.slug} holds another game's product`);
  }
  const s = shopNav();
  for (const g of s.menus.games) for (const c of g.columns) for (const l of c.links) {
    const m = /^\/games\/([a-z-]+)\/([a-z-]+)$/.exec(l.href);
    if (!m) continue;
    const line = LINES.find((x) => x.slug === m[1])!;
    assert.ok(gameTypeHubs(line).find((h) => h.slug === m[2])!.items.length >= GAME_TYPE_MIN, `${l.href} is thin`);
  }
});

test("the type pages are noindex when thin, in the sitemap and the CDN rules, and the dropdowns are server HTML", () => {
  assert.match(readFileSync("src/app/games/[slug]/[type]/page.tsx", "utf8"), /GAME_TYPE_MIN[\s\S]*index: false/);
  assert.match(readFileSync("src/app/sitemap.ts", "utf8"), /gameTypeHubs/);
  assert.match(readFileSync("next.config.js", "utf8"), /"\/games\/:slug\/:type"/);
  assert.doesNotMatch(readFileSync("src/components/HeaderNav.tsx", "utf8"), /useState/);
  assert.match(readFileSync("src/app/api/search/route.ts", "utf8"), /setById\(p\.setId\)\?\.code/);
});
