// The sealed focus (SITE.catalogFocus; BandaiCompare, owner 2026-11-08: "cull it way more … only sealed
// products"). Runs after the store pass, on what the stores actually sell, so only sealed product people
// can buy and compare keeps a page:
//
// - a headline product (booster box, case, starter deck, starter deck display, premium collection): in stock
//   at any store, or a store lists it and its set is new or not out yet (the pre-order a buyer is waiting for);
// - anything else (loose packs, prerelease packs, odd bundles): in stock at `minStores` stores in one market;
// - an insert (sleeves, playmats, code cards): never;
// - any page Search Console shows people finding (the demand branch), whatever the rule says.
//
// Hysteresis: a product the last focused import kept stays while it still has the stores its rule needs
// LISTING it (in stock or not), so a page doesn't flap between a 301 and a 200 with one store's stock.
// Matching ran on the whole catalogue first, so a listing never lands on the wrong product because its own
// product was culled. Slugs were settled before the cull, so a kept page's URL never changes.
import type { Offer, Product, SetInfo, SiteConfig } from "@/lib/site-types";

export type FocusRule = NonNullable<SiteConfig["catalogFocus"]>;

const NOT_STORES = new Set(["tcgplayer", "ebay", "amazon"]);
const DAY = 86_400_000;

/** The most distinct stores in any one market, counting only in-stock offers or every listing. */
export function storesInOneMarket(offers: readonly Offer[], inStockOnly: boolean): number {
  const per = new Map<string, Set<string>>();
  for (const o of offers) {
    if (NOT_STORES.has(o.source) || (inStockOnly && !o.inStock)) continue;
    if (!per.has(o.market)) per.set(o.market, new Set());
    per.get(o.market)!.add(o.source);
  }
  return Math.max(0, ...[...per.values()].map((s) => s.size));
}

export function focusCatalog(args: {
  products: Product[];
  sets: SetInfo[];
  offers: ReadonlyMap<number, readonly Offer[]>;
  rule: FocusRule;
  now: Date;
  /** Slugs with Search Console demand (lib/import/demand.ts). */
  demand?: ReadonlySet<string>;
  /** Ids the last focused import kept; empty on the first run, so hysteresis starts from today. */
  previous?: ReadonlySet<number>;
}): Product[] {
  const { products, sets, offers, rule, now, demand = new Set(), previous = new Set() } = args;
  const headline = new Set(rule.headlineTypes);
  const fresh = new Set(
    sets.filter((s) => s.upcoming || (s.releasedOn && now.getTime() - new Date(s.releasedOn).getTime() < 120 * DAY)).map((s) => s.id),
  );
  return products.filter((p) => {
    if (p.kind !== "sealed") return false;
    if (demand.has(p.slug)) return true;
    // An insert, or a single TCGplayer filed among the sealed (it carries a rarity; lib/data.ts isLooseSingle).
    if (p.sealedType === "Insert" || p.rarity) return false;
    const o = offers.get(p.id) ?? [];
    const inStock = storesInOneMarket(o, true);
    const listed = storesInOneMarket(o, false);
    const need = headline.has(p.sealedType ?? "") ? 1 : rule.minStores;
    if (inStock >= need) return true;
    if (previous.has(p.id) && listed >= need) return true;
    return headline.has(p.sealedType ?? "") && fresh.has(p.setId) && listed >= 1;
  });
}
