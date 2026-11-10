# BandaiCompare

Free price comparison for three Bandai card games on one site
(bandaicompare.com): **Union Arena**, **Dragon Ball Super Fusion World** and
the **Digimon Card Game**. **Sealed only** (owner, 2026-11-08): the booster
boxes, cases, packs and starter decks stores actually sell, compared across
TCGplayer, eBay, Amazon and card stores in the US, UK, Canada, Australia,
Europe and Singapore, updated daily. No single cards. Not affiliated with Bandai.

Built on the Rift Compare playbook (riftcompare.com, repo `Specifxx/TCGEmpire`),
with the Dex / MTG Compare engine's look, taken from YGO Compare's sealed-only
port (2026-11-08; DECISIONS.md). Its own repo: nothing syncs with a sister.
Site-specific facts live in `src/site.config.ts` and `src/content/` (stores,
blog posts, pre-order copy, logo, game colours), plus icons, share images,
workflows and docs.

## How it works

```
GitHub Actions, daily 03:17 UTC (refresh-prices.yml)
  TCGCSV (TCGplayer catalogue + prices, categories 81, 80 and 63: SITE.lines)
  + every Shopify store in src/content/stores.ts  (products.json)
  + eBay Browse API, budgeted (Cyberpunk's app, 1,000 calls/day, every kept sealed product;
    a no-op until EBAY_CLIENT_ID / EBAY_CLIENT_SECRET exist)
  → data/public/*.json, data/history/<set>.json, data/state/*.json
  → commit to main with "[deploy]" in the subject  → one Vercel build a day
  → IndexNow ping
```

* **Public pages never touch a database** (there is none). They read the
  committed JSON (`src/lib/data.ts`), shipped with the deployment.
* **No accounts, no Premium, no email**: the site compares prices and earns
  through affiliate links (eBay, TCGplayer, Amazon).
* **Deploys are gated** (`scripts/vercel-ignore-build.sh`): production builds
  only when the commit subject has `[deploy]`; previews need `[preview]`;
  `claude/*` branches never deploy.

## Three games, one catalogue

* **`SITE.lines`** lists the three TCGplayer categories. Each set carries its
  game; each game has a hub at `/games/<slug>`, a homepage tile and a menu
  link, and eBay and TCGplayer links use the game's own words (`src/lib/lines.ts`).
* **Card numbers** (`numberStyle: "series"`): FB11-084 (Fusion World),
  BT25-104 (Digimon) and REZ-1-053 (Union Arena, written UE24BT/REZ-1-053 by
  TCGplayer).
* **Star rarities**: Union Arena's SR, SR*, SR** and SR*** share a number; a
  listing that names one never prices another.
* **Sealed only, culled** (`sealedOnly`, `catalogFocus`, `src/lib/import/focus.ts`):
  boxes, cases and starter decks in stock at a store (or a new set's pre-order),
  packs at 2 stores in one market, plus anything people search for; about 190
  products. Every old card URL 301s to its set (`data/redirects/cards.json`).

## Run locally

```
npm install
cp .env.example .env
npx tsx scripts/import-all.ts   # fetch data (EBAY_REFRESH=false to skip eBay)
npm run dev
```

Checks: `npm run typecheck`, `npm run lint`, `npm test`.

## Going live

See `docs/SETUP.md` (and the Claude in Chrome prompt in `docs/CHROME-SETUP-PROMPT.md`).
