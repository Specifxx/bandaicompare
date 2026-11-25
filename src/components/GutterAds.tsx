"use client";
// The gutter column (owner, 2026-11-25: "there's so much space on the left and the right side of the website"). On a very wide
// desktop the page's 1392px content has empty space beside it inside <main>; the right side now holds one slim, labelled column of the
// import's own TCGplayer tiles (lib/card-ads.ts: no request, no eBay call). BandaiCompare is a light-ad site: TCGplayer only, right only.
//
//   • Only where it fits: from GUTTER_MIN px wide, sized to the empty space (globals.css `.gutter-ads`), never over the content, so
//     the sidebar and the page keep their full width; the card is sticky under the header and ends where <main> ends.
//   • Browser only: nothing in the server HTML (no SEO change), absolutely placed, so nothing moves when it mounts (CLS 0).
//   • Calm and labelled: the site's card, an "Ad" pill, rel sponsored through /go under `gutter-tcg` (and `gutter-tcg-all`).
//   • Never for ad-free members or in the app ([data-adfree], .capacitor-native), never on the ad-free pages (AdRouteGate).
//   • Static: nothing animates, nothing opens, nothing covers anything. Never eBay or Amazon here.
import { useEffect, useState } from "react";
import type { AdTile, CardAds } from "@/lib/card-ads";
import { goHref } from "@/lib/affiliate";
import { money } from "@/lib/format";
import { BANNER_MAX } from "@/lib/inline-ads";
import { useMarket } from "./ClientPrefs";

/** The narrowest window with room for a column of about 100px right of the page's 1392px content beside the 240px sidebar,
 *  14px clear of both, even with a scrollbar: 1900px (a 1920px monitor gets about 116px). */
export const GUTTER_MIN = 1900;
/** Up to this many tiles a column, popular first. */
export const GUTTER_TILES = 8;
const MIN_TILES = 2;

export function GutterAds({ ads, search }: { ads: CardAds; search: { tcgplayerUrl: string } }) {
  const [wide, setWide] = useState(false);
  const { market } = useMarket();
  useEffect(() => {
    if (document.documentElement.matches("[data-adfree], .capacitor-native")) return;
    const mq = window.matchMedia(`(min-width: ${GUTTER_MIN}px)`);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  if (!wide) return null;

  const tcg = pastBanner(ads.tcgplayer.filter((t) => t.image));
  const us = market === "US";

  return (
    <>
      {tcg.length >= MIN_TILES && (
        <Column
          brand="TCGplayer"
          sub="Popular sealed"
          cta="See all"
          ctaHref={goHref({ url: search.tcgplayerUrl, source: "tcgplayer", market: "US" }, undefined, "gutter-tcg-all")}
          tiles={tcg}
          line="Market price"
          price={(t) => (us ? money(t.cents, t.currency) : `US${money(t.cents, t.currency)}`)}
          href={(t) => goHref({ url: t.url, source: "tcgplayer", market: "US" }, t.id, "gutter-tcg")}
        />
      )}
    </>
  );
}

/** The banner pair shows the first BANNER_MAX of each side; the columns start after them when enough are left, so a page never shows
 *  the same product twice side by side. Pure, for the tests. */
export function pastBanner<T>(tiles: T[]): T[] {
  const rest = tiles.slice(BANNER_MAX);
  return (rest.length >= GUTTER_TILES / 2 ? rest : tiles).slice(0, GUTTER_TILES);
}

function Column({ brand, sub, cta, ctaHref, tiles, line, price, href }: {
  brand: string;
  sub: string;
  cta: string;
  ctaHref: string;
  tiles: AdTile[];
  line: string;
  price: (t: AdTile) => string;
  href: (t: AdTile) => string;
}) {
  return (
    <div className="gutter-ads">
      <aside data-ad="gutter" aria-label={`Sponsored: ${brand}`} className="gutter-card card">
        <p className="flex shrink-0 items-center gap-1.5">
          <span className="ad-pill">Ad</span>
          <span className="truncate font-display text-sm font-bold tracking-tight">{brand}</span>
        </p>
        <p className="mt-0.5 shrink-0 truncate text-[11px] leading-4 text-muted">{sub}</p>
        <ul role="list" className="gutter-list">
          {tiles.map((t) => (
            <li key={t.id}>
              <a href={href(t)} rel="sponsored nofollow noopener" target="_blank" className="group block" title={`${t.name} · ${price(t)}`}>
                <span className="plate relative block aspect-[4/3] w-full">
                  <img src={t.image!} alt={t.name} width={160} height={120} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-1" />
                </span>
                <span className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 group-hover:text-brand">{t.name}</span>
                <span className="tabular block truncate text-sm font-bold leading-[18px]">{price(t)}</span>
                <span className="block truncate text-[10px] uppercase leading-[14px] tracking-wide text-muted">{line}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={ctaHref} rel="sponsored nofollow noopener" target="_blank" className="btn-ad mt-2 w-full shrink-0 !px-2 !py-1.5 text-center text-xs">
          {cta} <span aria-hidden="true">→</span><span className="sr-only"> on {brand}</span>
        </a>
      </aside>
    </div>
  );
}
