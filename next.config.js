/** @type {import('next').NextConfig} */
// Cost notes (mirrors Rift Compare, DECISIONS.md "Cached pages refresh every 6
// to 24 hours"): public pages read committed JSON under data/, never the
// database, so the data files must ship with every server function.
// One CDN copy per catalogue URL (owner, 2026-11-04, the engine port; MTG Compare and OP Compare did the same on
// 2026-10-17, when ISR writes were the largest line of the bill): the card, kit, set, sealed, hub and pre-order pages are
// `dynamic = "force-dynamic"` and Vercel's CDN keeps each rendered copy for a day, serving it stale for another day while one
// render refreshes it. No ISR write, no data-cache entry per page, nothing prerendered at build. The header never covers
// /go (a redirect per click) or /api.
const CDN_CACHE = "public, s-maxage=86400, stale-while-revalidate=86400";
const CDN_PAGES = ["/card/:slug", "/kit/:slug", "/sets/:slug", "/sealed/:type", "/games/:slug", "/kits/grade/:grade", "/preorders/:slug"];

// Sealed only (owner, 2026-11-08; YGO Compare's 2026-11-06 rule): the card hubs and card tools are gone; each old URL is a 301 to the nearest sealed
// page, so links and search results keep working. A single card's own URL (/card/<slug>) is redirected by its page
// (lib/card-redirects.ts), because the same route still serves every sealed product.
const RETIRED = [
  { source: "/cards", destination: "/sealed" },
  { source: "/cards/rarity/:path*", destination: "/blog/union-arena-star-rarities-explained" },
  { source: "/cards/series/:path*", destination: "/games/union-arena" },
  { source: "/cards/:path*", destination: "/sealed" },
  { source: "/tools/rising", destination: "/tools" },
  { source: "/tools/demand", destination: "/tools" },
  { source: "/tools/best-basket", destination: "/tools" },
  { source: "/tools/trade", destination: "/tools" },
  { source: "/list", destination: "/sealed" },
  // Guides that were card price tables go to the game's sealed page or the booster box hub.
  { source: "/blog/most-expensive-union-arena-cards", destination: "/games/union-arena" },
  { source: "/blog/bandai-tcg-market-three-price-curves-november-2026", destination: "/sealed/booster-box" },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Card art is served straight from TCGplayer's CDN at the size we ask for;
    // Vercel image optimisation is billed per source image, so it stays off.
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      // data/amazon: ASINs from the daily refresh; data/amazon-live: the prices this build fetched (lib/amazon-live.ts).
      "/**": ["./data/public/**/*", "./data/history/**/*", "./data/amazon/*.json", "./data/amazon-live/*.json", "./data/redirects/*.json"],
    },
  },
  async redirects() {
    return [{ source: "/deals", destination: "/tools/deal-finder", permanent: true }, ...RETIRED.map((r) => ({ ...r, statusCode: 301 }))];
  },
  async headers() {
    return [
      ...CDN_PAGES.map((source) => ({ source, headers: [{ key: "Vercel-CDN-Cache-Control", value: CDN_CACHE }] })),
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
