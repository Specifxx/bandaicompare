// The sealed focus (SITE.catalogFocus; BandaiCompare, owner 2026-11-08: "cull it way more … only sealed
// products"): only sealed product stores sell keeps a page, and a culled product's URL 301s to its set.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { demandSlugs } from "@/lib/import/demand";
import { focusCatalog, storesInOneMarket } from "@/lib/import/focus";
import type { Offer, Product, SetInfo } from "@/lib/site-types";
import { SITE } from "@/site.config";

const now = new Date("2026-11-08T00:00:00Z");
const sets = [
  { id: 1, name: "Old", code: "1", slug: "old", releasedOn: "2024-01-01", productCount: 0 },
  { id: 2, name: "New", code: "2", slug: "new", releasedOn: "2026-10-20", productCount: 0 },
] as SetInfo[];
const item = (id: number, slug: string, setId: number, sealedType: string | null, kind: "card" | "sealed" = "sealed") =>
  ({ id, slug, setId, kind, name: slug, sealedType, rarity: null }) as Product;
const offer = (source: string, market: "US" | "UK", inStock = true) => ({ source, market, currency: "USD", cents: 100, inStock, url: "", title: "" }) as Offer;
const rule = { minStores: 2, headlineTypes: ["Booster Box", "Case", "Starter Deck", "Starter Deck Display", "Collection"] };

test("demand is a click or ten impressions on the page itself", () => {
  const s = demandSlugs({ "/card/a": [1, 2, 9], "/card/b": [0, 10, 20], "/card/c": [0, 9, 5], "/sets/old": [5, 100, 3], "/card/d/opengraph-image": [1, 1, 1] });
  assert.deepEqual([...s].sort(), ["a", "b"]);
});

test("stores count per market, never TCGplayer, eBay or Amazon", () => {
  const o = [offer("a", "US"), offer("b", "UK"), offer("ebay", "US"), offer("tcgplayer", "US"), offer("c", "US", false)];
  assert.equal(storesInOneMarket(o, true), 1);
  assert.equal(storesInOneMarket(o, false), 2);
  assert.equal(storesInOneMarket([], true), 0);
});

test("the focus keeps stocked boxes and decks, packs two stores sell, pre-orders and search demand", () => {
  const products = [
    item(1, "box-one-store", 1, "Booster Box"),
    item(2, "box-tcgplayer-only", 1, "Booster Box"),
    item(3, "deck-one-store", 1, "Starter Deck"),
    item(4, "pack-one-store", 1, "Booster Pack"),
    item(5, "pack-two-stores", 1, "Booster Pack"),
    item(6, "pack-two-markets", 1, "Booster Pack"),
    item(7, "sleeves", 1, "Insert"),
    item(8, "new-box-preorder", 2, "Booster Box"),
    item(9, "new-pack-listed", 2, "Booster Pack"),
    item(10, "old-box-listed", 1, "Booster Box"),
    item(11, "searched-pack", 1, "Booster Pack"),
    item(12, "a-card", 1, null, "card"),
    { ...item(13, "loose-single", 1, "Other"), rarity: "Super Rare" } as Product,
  ];
  const offers = new Map<number, Offer[]>([
    [1, [offer("a", "US")]],
    [2, [offer("tcgplayer", "US")]],
    [3, [offer("a", "UK")]],
    [4, [offer("a", "US")]],
    [5, [offer("a", "US"), offer("b", "US")]],
    [6, [offer("a", "US"), offer("b", "UK")]],
    [7, [offer("a", "US"), offer("b", "US")]],
    [8, [offer("a", "US", false)]],
    [9, [offer("a", "US", false)]],
    [10, [offer("a", "US", false)]],
    [12, [offer("a", "US"), offer("b", "US")]],
    [13, [offer("a", "US"), offer("b", "US")]],
  ]);
  const kept = focusCatalog({ products, sets, offers, rule, now, demand: new Set(["searched-pack", "a-card"]) });
  assert.deepEqual(kept.map((p) => p.slug), ["box-one-store", "deck-one-store", "pack-two-stores", "new-box-preorder", "searched-pack"]);
});

test("yesterday's kept product stays while the stores its rule needs still list it", () => {
  const products = [item(1, "pack-flicker", 1, "Booster Pack"), item(2, "pack-gone", 1, "Booster Pack"), item(3, "box-flicker", 1, "Booster Box")];
  const offers = new Map<number, Offer[]>([
    [1, [offer("a", "US", false), offer("b", "US")]],
    [2, [offer("a", "US", false)]],
    [3, [offer("a", "US", false)]],
  ]);
  assert.deepEqual(focusCatalog({ products, sets, offers, rule, now }).map((p) => p.slug), []);
  assert.deepEqual(focusCatalog({ products, sets, offers, rule, now, previous: new Set([1, 2, 3]) }).map((p) => p.slug), ["pack-flicker", "box-flicker"]);
});

test("the site runs the focus, sealed only, before eBay; culled pages 301 to their set or game", () => {
  assert.equal(SITE.sealedOnly, true);
  assert.ok(SITE.catalogFocus);
  const imp = fs.readFileSync("scripts/import-all.ts", "utf8");
  assert.ok(imp.indexOf("focusCatalog(") > 0 && imp.indexOf("focusCatalog(") < imp.indexOf("// 3. eBay"));
  assert.match(imp, /"culled\.json"/);
  const page = fs.readFileSync("src/app/card/[slug]/page.tsx", "utf8");
  assert.match(page, /culledSetSlug\(params\.slug\)/);
  assert.match(fs.readFileSync("src/app/sets/[slug]/page.tsx", "utf8"), /permanentRedirect\(gameHubOfSet\(s\.slug\)\)/);
  assert.match(fs.readFileSync("next.config.js", "utf8"), /\.\/data\/public\/\*\*\/\*/);
});
