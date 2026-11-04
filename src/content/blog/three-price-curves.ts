import type { Post } from "./types";

// Facts: TCGplayer market prices in this site's catalogue on 2026-11-04 (the
// prices below are live tokens, so they move with the daily import). Release
// dates are TCGplayer's set dates. Set totals and medians quoted in prose were
// computed from the same snapshot that day.
export const post: Post = {
  slug: "bandai-tcg-market-three-price-curves-november-2026",
  title: "Three Bandai card games, three price curves: where Union Arena, Fusion World and Digimon are heading",
  description:
    "What box and chase-card prices say about Union Arena, Dragon Ball Super Fusion World and the Digimon Card Game in November 2026, how each got here, and what the December releases are likely to do.",
  date: "2026-11-04",
  keywords: [
    "union arena market",
    "fusion world prices",
    "digimon card game prices",
    "union arena booster box prices",
    "fusion world booster box",
    "bandai tcg trends 2026",
  ],
  image: {
    src: "/blog/bandai-tcg-market-three-price-curves-november-2026.jpg",
    alt: "Bar chart of booster box prices: Union Arena Kagurabachi, Fusion World Manga Booster 02, Digimon Chivalrous XIII",
  },
  html: `
<p>Bandai runs three English card games with almost nothing in common except the publisher. Union Arena sells a new anime licence every month. Dragon Ball Super Fusion World sells one licence, over and over, with ever rarer alternate arts. The Digimon Card Game is the oldest of the three and the cheapest to play. We track every store price for all three, so this is a look at what the market is actually paying for each game right now, how each got there, and where the next few months are likely to go.</p>

<p>Every price below is a live TCGplayer market price from our catalogue, so it updates with the daily import. The totals and medians quoted in the text were computed on 4 November 2026.</p>

<h2>Union Arena: the licence is the price</h2>
<p>Union Arena is the clearest case we track of a game whose sealed value is set by what is printed on the box, not what is in it. The booster boxes have the same structure set after set. The prices do not:</p>
<ul>
<li><b>KAGURABACHI</b> (Feb 2026): {{card:660060}} at {{price:660060}}. The most expensive Union Arena box on the market, from a manga with no anime yet.</li>
<li><b>Demon Slayer</b> (Jan 2025): {{card:603544}} at {{price:603544}}.</li>
<li><b>SOLO LEVELING</b> first edition (Mar 2026): {{card:660067}} at {{price:660067}}. The second edition reprint sits at {{price:709842}}.</li>
<li><b>Black Clover</b> (May 2025): {{card:607857}} at {{price:607857}}.</li>
<li><b>CHAINSAW MAN</b> (Jul 2026): {{card:685552}} at {{price:685552}}.</li>
<li><b>Yu Yu Hakusho</b> (Oct 2025): {{card:635348}} at {{price:635348}}.</li>
<li><b>GODDESS OF VICTORY: NIKKE</b> (Nov 2025): {{card:638096}} at {{price:638096}}.</li>
</ul>
<p>That is a six-to-one spread between boxes that cost the same at release. The pattern behind it is simple: a licence with a current, popular anime (or a manga the shonen crowd is reading now) holds or climbs, and a legacy licence sells through its first wave and settles near its release price. Two sets a month also means every set competes with the next one for the same collectors, so a box that is not the "hot" set at release rarely becomes one later.</p>

<p>The single cards follow the same rule, concentrated at the top. Union Arena's star rarities (SR*, SR**, SR***) are the whole value of a set: the median card in most recent sets is under a dollar, while the three-star chase sits in four figures. The <b>Evangelion</b> set's serialized {{card:684545}} is {{price:684545}}; <b>CHAINSAW MAN</b>'s {{card:706480}} is {{price:706480}}; <b>KAGURABACHI</b>'s {{card:674632}} is {{price:674632}}. If you are new to the game, read <a href="/blog/union-arena-star-rarities-explained">how the star rarities work</a> before you chase one, because an SR and an SR*** share a card number.</p>

<p>The most valuable Union Arena set by total card value in our data is CHAINSAW MAN, at about US$8,180 across 125 priced cards, ahead of Evangelion (US$7,160) and Sword Art Online Vol.2 (US$6,290). KAGURABACHI is the set whose <em>typical</em> card is worth most: a median of nearly US$40, against under US$1 for Re:ZERO, Inuyasha and Attack on Titan Vol. 2. KAGURABACHI was a small print run of a licence that turned out to be far bigger than Bandai expected. That is unlikely to repeat with the next sets, which are being printed for the demand the game has now.</p>

<h3>What is coming</h3>
<p><a href="/sets/uex08bt-bleach-thousand-year-blood-war-vol-3">BLEACH Vol.3</a> lands on 13 November, <a href="/sets/ue25bt-my-hero-academia-special-booster">My Hero Academia Special Booster</a> on 11 December (its box is already listed at {{price:714370}} on pre-order), <a href="/sets/ue26bt-gurren-lagann">GURREN LAGANN</a> on 22 January 2027 and <a href="/sets/ue27bt-umamusume-pretty-derby">Umamusume: Pretty Derby</a> on 12 February. Our read: My Hero Academia is the one that could repeat the Demon Slayer curve, because it is a "Special Booster" (a bigger, more expensive product) on a licence that has just finished its anime. BLEACH Vol.3 arrives with Vol.1 and Vol.2 boxes still near {{price:552230}} and {{price:607851}}, which is the sign of a licence whose fans keep buying. Gurren Lagann and Umamusume are the legacy-and-niche pattern, and we would expect their boxes to sit near release price unless the Umamusume game's audience turns up in force.</p>

<h2>Fusion World: fewer sets, bigger numbers</h2>
<p>Dragon Ball Super Fusion World releases a main set every three months and sells each one hard. It has the highest box prices of the three games by a distance:</p>
<ul>
<li><b>Manga Booster 01</b> (Jun 2025): {{card:637462}} at {{price:637462}}.</li>
<li><b>Manga Booster 02</b> (Nov 2025): {{card:647779}} at {{price:647779}}.</li>
<li><b>Rivals Clash</b> (May 2025): {{card:624223}} at {{price:624223}}.</li>
<li><b>Story Booster 01</b> (Aug 2026): {{card:692391}} at {{price:692391}}.</li>
<li><b>Dual Evolution</b> (Mar 2026): {{card:670183}} at {{price:670183}}.</li>
<li><b>Brightness of Hope</b> (Oct 2026, the newest main set): {{card:695727}} at {{price:695727}}.</li>
</ul>
<p>The game's value sits in the Super Alternate Art secret rares, one or two per set, and in the Manga Booster line, whose black-and-white manga-panel cards made it the one Fusion World product that collectors outside the game buy. {{card:682123}} from Dual Evolution is {{price:682123}}, {{card:539435}} from the first set is {{price:539435}}, and {{card:695871}} from Cross Force is {{price:695871}}. The two Manga Boosters have the highest median card prices of any sets we track in any of the three games: about US$77 for Manga Booster 01 (23 of its 42 priced cards are over US$50) and US$52 for Manga Booster 02.</p>

<p>Historically Fusion World boxes have risen rather than fallen after release. The first set, Awakened Pulse, is at {{price:535546}} two and a half years on, and no 2024 main-set box is under US$150. The exception is the newest set at any time, which trades low while it is being opened and then climbs once the print run is sold through. Brightness of Hope at {{price:695727}} is that set now.</p>

<h3>What is coming</h3>
<p><a href="/sets/reach-the-god">Reach the God</a> is the next main set, on 11 December. Its box is listed at {{price:707521}} on pre-order, which is already more than double what Brightness of Hope's box trades for, and tells you what sellers expect: a December set with the Super Saiyan God storyline is the kind of release the game's buyers turn out for. We think the more interesting number to watch is the Manga Booster 02 box. At {{price:647779}} it has become the game's bellwether; if it keeps rising while Reach the God is being opened, Fusion World's collector demand is still growing. If it slips, the game is starting to see the same "newest set only" pattern as Union Arena.</p>

<h2>Digimon: the cheap game with expensive mistakes</h2>
<p>The Digimon Card Game is the one of the three you can actually play for pocket money. Most booster boxes sit between US$50 and US$120, including the two newest: <b>Chivalrous XIII</b> at {{price:711381}} and <b>Timeless Bonds</b> at {{price:679250}}. Old boxes do not climb much: Great Legend from 2021 is {{price:233993}}, and Battle of Omni {{price:240965}}.</p>

<p>What is expensive in Digimon is the Rare Pull: a textured or alternate-art card seeded at very low odds. {{card:623931}} is {{price:623931}}, {{card:615763}} is {{price:615763}}, and the Chivalrous XIII chase, {{card:718662}}, is {{price:718662}}. Those are the Union Arena three-star prices, inside boxes that cost a third as much. That is why the game's sealed prices stay flat while its top singles do not: a player who wants the card buys it rather than gambling a box on it, and a collector who wants the box can get one any time.</p>

<p>The most valuable Digimon set in our data by total card value is World Convergence, at about US$6,950, almost entirely from the Omnimon Rare Pull above. Chivalrous XIII, five weeks old, is already at US$3,570 across 164 priced cards with 13 over US$50, which is more than any 2025 set. That is the healthiest launch the game has had in a year and a half.</p>

<h3>What is coming</h3>
<p>Two starter decks on 4 December and <a href="/sets/ignition-of-x">Ignition of X</a>, the next booster, on 11 December, whose box is pre-ordering at {{price:714850}}. That is in line with every other recent Digimon box, and we would expect it to stay there. The thing to watch is which card becomes its Rare Pull: in the last four sets that single card has carried a quarter to a half of the whole set's value.</p>

<h2>Where this leaves a buyer</h2>
<ul>
<li><b>Union Arena:</b> buy the licence, not the game. A box of a set you like is fine at release; a box you are holding is a bet on the anime's popularity, and the spread between winners and losers is six to one.</li>
<li><b>Fusion World:</b> the newest main set is usually the cheapest it will be while it is being opened. The Manga Boosters are collector products with a different, steeper curve.</li>
<li><b>Digimon:</b> boxes are a consumable, singles are the asset. If you want a Rare Pull, price the single against a case first.</li>
</ul>
<p>Whichever game you buy, the store spread on a box is often US$20 to US$40 across the stores we track, which is more than most of these boxes move in a month. The <a href="/sealed">sealed price guide</a> shows every box and case with every store's price, and each set page lists its cards most valuable first.</p>
`,
  faq: [
    {
      q: "Which Bandai card game holds its value best?",
      a: "On our data, Fusion World: every 2024 main-set box is above its release price, and the Manga Booster boxes are the most expensive Bandai sealed product we track. Union Arena depends on the licence, and Digimon boxes stay flat while a few Rare Pull singles carry the value.",
    },
    {
      q: "Why are some Union Arena boxes so much dearer than others?",
      a: "The box contents are the same; the licence is not. A set tied to an anime that is airing now, or a manga the shonen audience is reading now, keeps selling after the first wave. A legacy licence sells through and settles near release price.",
    },
    {
      q: "What Bandai sets release in December 2026?",
      a: "Union Arena's My Hero Academia Special Booster, Fusion World's Reach the God and the Digimon Card Game's Ignition of X all release on 11 December 2026, with BLEACH Vol.3 for Union Arena on 13 November.",
    },
  ],
};
