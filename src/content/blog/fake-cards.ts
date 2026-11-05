import type { Post } from "./types";

export const post: Post = {
  slug: "how-to-spot-fake-digimon-union-arena-fusion-world-cards",
  title: "How to spot fake Digimon, Union Arena and Fusion World cards",
  description:
    "Counterfeit Bandai cards fail the same checks whichever game they are from: the card number and rarity against a real printing, the foil, the back, the stock, the price and the seller. How to run each in a minute.",
  date: "2026-11-05",
  keywords: ["fake digimon cards", "how to spot fake digimon cards", "fake union arena cards", "fake fusion world cards", "counterfeit dragon ball super card game", "are my digimon cards real"],
  image: { src: "/blog/how-to-spot-fake-digimon-union-arena-fusion-world-cards.jpg", alt: "How to spot fake Digimon, Union Arena and Fusion World cards" },
  html: `
<p>Bandai's card games share a printer, a card stock and a counterfeit problem. The fakes are the same whichever game they come from: the Secret Rares, the alternate arts and the star parallels, sold one at a time at a price just low enough to tempt, or in a "complete set" that would be a bargain if any card in it were real. The six checks below catch almost all of them, and they are the same for the Digimon Card Game, Union Arena and Dragon Ball Super Fusion World.</p>

<h2>Which cards get faked</h2>
<p>The expensive ones. This is today's top ten across the three games by TCGplayer market price, rebuilt every morning. A listing for any of these at a fraction of the Market figure is a fake until the card proves otherwise.</p>
{{topall:10}}

<h2>1. The card number and rarity must exist</h2>
<p>Every card carries a number along the bottom: <b>BT25-104</b> in Digimon, <b>FB11-084</b> in Fusion World, <b>REZ-1-053</b> in Union Arena (our <a href="/blog/union-arena-fusion-world-digimon-card-numbers">card-number guide</a> explains each). The number identifies the exact printing, and this site lists every printing with its rarity. Search the name, open the result whose number matches and compare. If the number is not in that set, or the rarity on the card was never printed with that number, the card is not real. In Union Arena, one number exists in up to four star versions (SR, SR*, SR**, SR***), and fakes often show a star count that was never printed for that card; our <a href="/blog/union-arena-star-rarities-explained">star rarities guide</a> lists which exist.</p>

<h2>2. The foil must match the rarity</h2>
<p>Each rarity has a specific finish, and a real foil has a fine, even pattern that shifts as the card tilts while the text stays crisp on top of it. Fakes most often show a flat rainbow sheen over the whole card, text and borders included, or are glossy with no shift at all. Tilt a known-real foil beside the suspect card. Bandai also prints a small holographic mark on the front of its cards; on a fake it is often a flat silver square with no image inside, or missing altogether.</p>

<h2>3. The back</h2>
<p>Each game has one card back, and any common from a pack you opened is a perfect reference. Fakes are paler or more saturated, slightly blurred, or cut off-centre so one border is thicker than the other. Real printing is sharp to the edge.</p>

<h2>4. The stock</h2>
<p>A real card is stiff and dense with a slight matte feel, bends back flat and barely glows in front of a bright light. Fakes are thinner, glossier or laminated-feeling, and often slightly the wrong size: sleeve one with a real card and the edges tell you.</p>

<h2>5. The price</h2>
<p>Counterfeiters price to sell. Every card page here shows TCGplayer's market price, every store we track and the eBay listings for that exact printing, so a price can be judged in seconds. A Secret Rare at a third of market from a new seller, or a seller who has every chase card in the game in perfect condition, is a warning. A "complete SR set" for the price of two real cards is a box of fakes.</p>

<h2>6. The seller</h2>
<p>Buy from <a href="/stores">the stores we list</a>, each a real card shop, or from marketplace sellers with a long record and photos of the actual card, front and back. Stock images, shipping from a country the English game is not distributed in, and lots of twenty chase cards together are the usual signs. Japanese-language cards are a separate, legitimate product, but they are not the English printing and should not be priced as one.</p>

<h2>If you already have one</h2>
<p>Marketplaces refund counterfeits: open a case with photos beside a real card and point to the number check. Do not pass it on. A proxy among friends is one thing; a fake in a trade or a sale is fraud.</p>
`,
  faq: [
    { q: "How can I tell if a Digimon card is fake?", a: "Check the card number and rarity against a real printing on this site, the foil against a known-real foil, the back against a common, and the price against the market. Most fakes fail at least two of those." },
    { q: "Do fake Union Arena cards have the wrong number of stars?", a: "Often. One Union Arena number exists in a fixed set of star versions; a star count that was never printed for that card is a fake." },
    { q: "Are Japanese Digimon or Fusion World cards fake?", a: "No, they are the Japanese printing, a legitimate product. They are a different printing from the English card and are priced separately." },
  ],
};
