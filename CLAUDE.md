# Working in this repo

Read `README.md` first. This is BandaiCompare (Union Arena, Dragon Ball Super
Fusion World and the Digimon Card Game on one site, `SITE.lines`); Lorcana
Compare, YGO Compare and Cyberpunk Compare run the same engine (Gundam Compare
left it for the Dex / MTG Compare engine on 2026-11-04). Engine code (`src/lib`,
`src/app`, `src/components`, `scripts`) must stay game-agnostic: anything
game-specific goes in `src/site.config.ts` or `src/content/`. When you change
the engine, make the same change in the other three repos.

## One engine, four repos

Lorcana Compare, YGO Compare, Cyberpunk Compare and BandaiCompare run ONE
engine (Gundam Compare ran it until 2026-11-04, when the owner moved it onto
the Dex / MTG Compare engine; `Specifxx/GundamCompare` is no longer a sister).
`engine.json` lists its files (the code, tests and build config; never
`src/site.config.ts`, `src/content/`, icons, share images, workflows or
`data/`), and they must be byte-identical in all four repos. After an engine
change here, copy it with `scripts/engine-sync.sh ../<sister> ../<sister> ../<sister>`,
run the checks in each and open the PRs together; `npx tsx scripts/engine-drift.ts ../<sister>…`
shows what still differs. The weekly *Engine drift* workflow fails (and
emails the owner) if `main` differs from a sister's `main`. Anything one game
needs is an option in `site.config.ts`, off by default.

## Deploys are gated — do not add `[deploy]` to commit subjects

**One production build per 12 hours, and production only (owner, 2026-11-02: Vercel spend capped at $5–6 a
day).** `scripts/vercel-ignore-build.sh` skips a `[deploy]` commit within 12 hours of the last production
deployment (it rides the next release); `[urgent]` in the subject overrides that, only when the owner says
so. `vercel.json` disables every branch except production (`"**": false`), so no preview is ever built.
Never dispatch a manual release just to ship a merge. DECISIONS.md, 2026-11-02.

Production builds only when the commit SUBJECT carries `[deploy]`
(`scripts/vercel-ignore-build.sh`). The daily data commit from
`refresh-prices.yml` carries it; that is the one build a day. Never put
`[deploy]` in a subject on your own initiative. "Push to prod" means land on
`main` and ride the next daily release, unless the owner says it is urgent.
Previews build only with `[preview]` in the subject, when the owner asks.

## No accounts, no database, no email

The site is price comparison only: no sign-in, no Premium, no
email service and no database. Everything it serves is the committed JSON
under `data/` (`src/lib/data.ts`).

**Price alerts are the one exception (owner, 2026-11-02):** the card page's
"Email me when the price drops" form (`PriceAlertForm.tsx`, `SITE.priceAlerts`)
posts to RiftCompare's shared alert service, which keeps the address, emails
and reads this site's static `/alert-feed.json` (`src/lib/alert-feed.ts`) once
a day. This site still stores no address and holds no mail key; never add one.
Keep the feed's price the lowest in-stock store price, never eBay or converted.

## The name

"Bandai" is the company's own trademark; the owner chose the domain anyway
(2026-11-03, after the risk was explained). Keep `SITE.disclaimer` (not
affiliated with, endorsed by or sponsored by Bandai or Bandai Namco) in the
footer, `/about` and `/terms`. Never use Bandai, Bandai Namco, Union Arena,
Dragon Ball or Digimon logos, card art, characters or key art as decoration:
card and product images are TCGplayer's and the stores' own, hotlinked. Never
write copy that reads as official ("the official", "Bandai's store").

## Cost rules (from Rift Compare, where breaking them exhausted Neon projects)

1. Public data stays in committed files under `data/`; don't add a database
   read to any page or route.
2. No `generateStaticParams` that prerenders data-heavy pages at build. Card
   and set pages use an empty list (cached on first visit).
3. No page or route handler revalidates under 21600 seconds (six hours);
   86400 for slow content. A route handler caches through its CDN header.
4. Never write anything private to `data/` — it is public with the source.

## eBay

BandaiCompare shares Cyberpunk Compare's eBay app (owner, 2026-11-03), a
5,000-call app split 2,500 each: `SITE.ebay.dailyBudget` 2,500 calls a day,
counted in `data/state/ebay-usage.json`, the run at 03:17 UTC (Cyberpunk's is
00:17) so the two never overlap. Cards under $10 get no call; every sealed
product does; the plan spreads the calls for coverage (`planEbayRefresh`). The
pass is a no-op until `EBAY_CLIENT_ID` / `EBAY_CLIENT_SECRET` (the same values
as cyberpunkcompare's secrets) exist. Never raise the cap or point it at any
other keyset without the owner. Cyberpunk's `/api/ebay/account-deletion` is the
keyset's registered endpoint; this site's stays deployed too.

## Amazon's price on sealed pages (owner, 2026-11-05)

`scripts/amazon-asins.ts` (daily refresh) finds each sealed product's ASIN on each market's own Amazon, kept only when
`matchSealed` lands on that product; `scripts/fetch-amazon-prices.ts` (first in every build) fetches those prices into the
git-ignored `data/amazon-live/`; `lib/amazon-live.ts` gives the card page its Amazon row's link and 24-hour price. Prices
are never committed, never a sort, cheapest, deal, feed or quick view. Credentials `AMAZON_CREATORS_AU_*` (GitHub + Vercel)
serve every store; a store without API access is skipped. `tests/amazon-api.test.ts`; the ops monitor reads the status.

## Matching

`src/lib/import/match.ts`: a wrong match is worse than none. Every card match
needs the number AND the name (or an exact name inside a named set); ties are
no match; foreign-language products are never matched; a store price under a
quarter or over four times TCGplayer's is dropped. **Three numbering schemes in
one index** (`numberStyle: "series"`): Fusion World FB11-084, Digimon BT25-104,
Union Arena REZ-1-053 (the volume is part of the key). **Star rarities**: one
Union Arena number exists as SR, SR*, SR** and SR***; a title that names a
rarity must name the card's own (`rarityMustAgree`, star spellings in
`rarityAliases`). Add a test in `tests/match.test.ts` or
`tests/series-numbers.test.ts` for every new title format.

## The site watches itself

`ops-monitor.yml` runs `scripts/ops-monitor.ts` every three hours; a failing
check fails the run, and GitHub emails the owner. When you add a scheduled job,
external API or anything with a limit, add a check there.

## Checks

```
npm run typecheck
npm run lint
npm test
```

Record non-obvious decisions in `DECISIONS.md` (newest at the bottom).
