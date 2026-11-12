// The ONE game-specific configuration file. BandaiCompare, Cyberpunk Compare,
// YGO Compare, Lorcana Compare and Gundam Compare run the same engine (the
// Rift Compare playbook, rebuilt lean); everything that differs between them —
// names, colours, data sources, stores, copy — lives here or in src/content/.
// Keep engine code free of game names.
//
// BandaiCompare is the engine's first multi-game site (SITE.lines): Union
// Arena, Dragon Ball Super Fusion World and the Digimon Card Game, three
// TCGplayer categories in one catalogue (owner, 2026-11-03).
import type { SiteConfig } from "@/lib/site-types";
import { STORES } from "@/content/stores";

export const SITE: SiteConfig = {
  key: "bandai",
  name: "BandaiCompare",
  shortName: "BandaiCompare",
  wordmark: ["BANDAI", "COMPARE"],
  game: "Union Arena, Dragon Ball Super Fusion World and Digimon",
  gameShort: "Union Arena, DBS & Digimon",
  domain: "bandaicompare.com",
  // The bare domain is the address (owner, 2026-11-03: bandaicompare.com).
  apexHost: true,
  // Three games with many boxes and starter decks: the homepage opens with the big sealed hero.
  homeSealedHero: true,
  tagline: "Compare Union Arena, Fusion World and Digimon booster box prices across every store",
  description:
    "Free sealed price comparison for Union Arena, Dragon Ball Super Fusion World and Digimon Card Game booster boxes, cases and starter decks, across TCGplayer, eBay, Amazon and card stores in the US, UK, Canada, Australia, Europe and Singapore.",
  keywords: [
    "union arena booster box",
    "union arena booster box price",
    "fusion world booster box",
    "dragon ball super fusion world booster box price",
    "digimon booster box",
    "digimon booster box price",
    "digimon starter deck",
    "where to buy union arena",
  ],
  adminEmails: ["bill.jyang101@gmail.com"],
  supportEmail: "compareempire@gmail.com",
  ownerEmail: "bill.jyang101@gmail.com",

  // The brand names a company: say plainly we are not it (owner, 2026-11-03; WargameCompare's rule for Games Workshop).
  disclaimer:
    "BandaiCompare is not affiliated with, endorsed by or sponsored by Bandai, Bandai Namco or any of their companies. Union Arena, Dragon Ball Super, Digimon and related names are trademarks of their owners, used only to describe the products stores sell.",
  priceAlerts: true,
  // Amazon AU: this site's own tracking ID in the owner's AU account (the US stays the engine default).
  amazonAuTag: "bandaicompare-22",
  // The first game; with `lines` set, each game's own category, slug and eBay words win.
  tcgcsvCategoryId: 81,
  tcgplayerSlug: "union-arena",
  lines: [
    {
      id: "ua",
      name: "Union Arena",
      short: "Union Arena",
      slug: "union-arena",
      tcgcsvCategoryId: 81,
      tcgplayerSlug: "union-arena",
      ebayQuery: "union arena",
      blurb: "Bandai's anime crossover card game: Jujutsu Kaisen, Demon Slayer, Chainsaw Man, Solo Leveling and dozens more series, each its own set.",
      color: "#d4557f",
    },
    {
      id: "fw",
      name: "Dragon Ball Super Fusion World",
      short: "Fusion World",
      slug: "dragon-ball-super-fusion-world",
      tcgcsvCategoryId: 80,
      tcgplayerSlug: "dragon-ball-super-fusion-world",
      ebayQuery: "dragon ball super fusion world",
      blurb: "The Dragon Ball Super Card Game's 2024 reboot: FB booster sets, FS starter decks and the Manga Boosters collectors chase.",
      color: "#e08a3c",
    },
    {
      id: "dg",
      name: "Digimon Card Game",
      short: "Digimon",
      slug: "digimon-card-game",
      tcgcsvCategoryId: 63,
      tcgplayerSlug: "digimon-card-game",
      ebayQuery: "digimon card game",
      blurb: "Bandai's Digimon TCG since 2020: BT and EX booster sets, starter decks and Rare Pull alternate arts.",
      color: "#4a8fd6",
    },
  ],
  // Booster boxes in one Booster Box Case (eBay titles and store listings, 2026-11-07): a listing stating another count is another product.
  caseUnits: { ua: 16, fw: 12, dg: 12 },
  ebay: {
    // Each game's own words (lines[].ebayQuery) start every search; this is the fallback.
    query: "bandai card game",
    singlesCategoryId: "183454",
    sealedCategoryId: "183456",
    minPriceUsd: 10,
    // Cyberpunk Compare's eBay app (owner, 2026-11-03), shared three ways since 2026-11-10 (owner):
    // MotorCompare 3,300, BandaiCompare 1,000, Cyberpunk Compare 600. The 191 kept sealed products
    // spend 764. Off until EBAY_CLIENT_ID / EBAY_CLIENT_SECRET (Cyberpunk's values) exist. Raise only with the owner.
    dailyBudget: 1000,
    runHourUtc: 3,
  },

  // Fusion World and Digimon number cards "FB11-084" and "BT25-104"; Union
  // Arena "UE24BT/REZ-1-053", which stores write "REZ-1-053". "series" reads all three.
  numberStyle: "series",
  // Three games and over 21,000 TCGplayer products: cards under US$1 in every
  // printing stay out, except in sets from the last 120 days (data and build size).
  // The low-traction cull (owner, 2026-11-07): cards under $5 leave the catalogue (was $1); new sets and
  // any card page Search Console shows people finding stay. ~2,500 bulk cards out of ~10,000.
  catalogMinCardCents: 500,
  sitemapMinCardCents: 300,
  // Sealed only (owner, 2026-11-08: "we should not have cards at all … only sealed products"): no single
  // cards in the catalogue; every old card URL 301s to its set (data/redirects/cards.json, DECISIONS.md 2026-11-08).
  sealedOnly: true,
  // The sealed focus (owner, 2026-11-08: "cull it way more"): a box, case, starter deck, starter deck display or
  // collection stays when any store has it in stock (or lists a new set's pre-order); a loose pack or anything
  // else needs 2 stores in one market; inserts never. Search demand always stays. ~2,600 products -> ~190 on the
  // 2026-11-08 data (lib/import/focus.ts).
  catalogFocus: { minStores: 2, headlineTypes: ["Booster Box", "Case", "Starter Deck", "Starter Deck Display", "Collection"] },
  // One Union Arena number exists as SR, SR* and SR***, at very different prices.
  rarityMustAgree: true,
  rarityAliases: {
    "Super Rare 3-Star": ["SR***", "SR3"],
    "Super Rare 2-Star": ["SR**", "SR2"],
    "Super Rare 1-Star": ["SR*", "SR1"],
    "Super Rare": ["SR"],
    "Rare 2-Star": ["R**"],
    "Rare 1-Star": ["R*"],
    "Uncommon 1-Star": ["U*", "UC*"],
    "Secret Rare": ["SEC", "SCR"],
    "Ultimate Rare": ["UR"],
  },
  extraAttrs: ["Color", "CardType", "SeriesName", "Affinities", "Cost", "Power", "PlayCost", "LevelLv", "DigimonType", "Character Traits"],
  sealedTypes: [
    [/\b(sleeves?|playmat|deck box|binder|dice|energy markers?|tokens?|token card|code card)\b/i, "Insert"],
    [/\bcase\b/i, "Case"],
    [/starter deck display/i, "Starter Deck Display"],
    [/starter deck|advanced deck|\bdeck set\b/i, "Starter Deck"],
    [/release event pack|pre-?release|event pack/i, "Prerelease"],
    [/booster (box|display)/i, "Booster Box"],
    [/booster pack|promotion pack|\bpack\b/i, "Booster Pack"],
    [/premium card collection|set bundle|anniversary set|collection/i, "Collection"],
  ],
  // Every rarity TCGplayer used across the three games on 2026-11-03, rarest first.
  rarityOrder: [
    "Super Rare 3-Star", "Secret Rare", "Ultimate Rare", "Super Rare 2-Star", "Super Rare 1-Star", "Super Rare", "Leader",
    "Rare 2-Star", "Rare 1-Star", "Rare", "Uncommon 2-Star", "Uncommon 1-Star", "Uncommon", "Common 2-Star", "Common 1-Star", "Common",
    "Action Point 1-Star", "Action Point", "Promo",
  ],
  featureMinCents: 3000,
  chaseRarities: ["Super Rare 3-Star", "Secret Rare", "Ultimate Rare", "Super Rare 2-Star"],
  cardHubs: [
    // Union Arena's sets are anime series: a hub per series ("Jujutsu Kaisen Union Arena cards").
    { facet: "series", attr: "SeriesName", noun: ["series", "series"], title: "{v} Union Arena cards", blurb: "Every Union Arena set is one anime or game series. These are all its cards, most valuable first." },
    { facet: "color", attr: "Color", noun: ["colour", "colours"], titleCase: true, title: "{v} Fusion World and Digimon cards", blurb: "Fusion World and Digimon decks are built around colours." },
  ],

  theme: {
    brand: "#e8893a",
    brandLight: "#f2b36b",
    brandDark: "#b4601a",
    accent: "#4a8fd6",
    pageDark: "#10122a",
    inkDark: ["#0b0c1f", "#151834", "#1d2142", "#272c52", "#3a4070", "#545b8c"],
    wordmarkGradient: "linear-gradient(90deg, #f2b36b 0%, #e8893a 100%)",
    // Dark by default like every engine site (owner, 2026-11-03 11:17); the bright light theme
    // (content/site.css) stays one tap away.
    displayFont: "Plus Jakarta Sans",
    pageLight: "#fff8f0",
  },
  halloween: {
    headline: "Spooky season pulls",
    blurb: "Find the cheapest Union Arena, Fusion World and Digimon boxes before the next drop.",
  },
  christmas: {
    headline: "Gift a box",
    blurb: "Union Arena, Fusion World and Digimon boxes and starter decks to gift, cheapest store first",
  },

  stores: STORES,
  // The whole Compare Empire family, card games first (DECISIONS.md "Every
  // site links the whole family"). `anchor` is the link text.
  sisterSites: [
    { name: "Rift Compare", url: "https://riftcompare.com", game: "Riftbound", anchor: "Riftbound card prices", search: "https://riftcompare.com/browse?q={q}" },
    { name: "OP Compare", url: "https://opcompare.app", game: "One Piece", anchor: "One Piece card prices", search: "https://opcompare.app/browse?q={q}" },
    { name: "DexCompare", url: "https://dexcompare.app", game: "Pokémon", anchor: "Pokémon sealed prices", search: "https://dexcompare.app/us/sealed?q={q}" },
    { name: "MTG Compare", url: "https://mtgcompare.app", game: "Magic", anchor: "Magic: The Gathering sealed prices", search: "https://mtgcompare.app/us/sealed?q={q}" },
    { name: "Gundam Compare", url: "https://gundamcompare.com", game: "Gundam", anchor: "Gundam Card Game prices", search: "https://gundamcompare.com/cards?q={q}" },
    { name: "Lorcana Compare", url: "https://lorcanacompare.com", game: "Disney Lorcana", anchor: "Disney Lorcana card prices", search: "https://lorcanacompare.com/cards?q={q}" },
    { name: "YGO Compare", url: "https://ygocompare.com", game: "Yu-Gi-Oh!", anchor: "Yu-Gi-Oh! card prices", search: "https://ygocompare.com/cards?q={q}" },
    { name: "Cyberpunk Compare", url: "https://cyberpunkcompare.com", game: "Cyberpunk TCG", anchor: "Cyberpunk TCG prices", search: "https://cyberpunkcompare.com/cards?q={q}" },
    { name: "WargameCompare", url: "https://wargamecompare.com", game: "Wargames", anchor: "Miniature wargame prices" },
    { name: "FigureCompare", url: "https://figurecompare.com", game: "Anime figures", anchor: "Anime figure prices" },
    { name: "CamCompare", url: "https://www.camcompare.app", game: "Cameras", anchor: "Camera and lens prices" },
    { name: "Compare Empire", url: "https://compareempire.com", game: "Tech", anchor: "Tech and appliance prices" },
  ],
  family: { id: "bandai" },
  social: {},
};
