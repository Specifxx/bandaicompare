import type { Metadata } from "next";
import { SITE } from "@/site.config";
import { canon } from "@/lib/site";
import { StaticPage } from "@/components/StaticPage";

export const revalidate = 86400;
export const metadata: Metadata = {
  title: `About ${SITE.name}: who we are`,
  description: `${SITE.name} is a two-person, independent site run by Bill and George. How we track Union Arena, Fusion World and Digimon sealed prices, how we are paid and what it costs.`,
  ...canon("/about"),
};

export default function About() {
  return (
    <StaticPage title={`About ${SITE.name}: who we are`}>
      <p>{SITE.name} is a free price comparison site for {SITE.game}. Every day it collects the price of every {SITE.gameShort} booster box, case, pack and starter deck from TCGplayer, eBay, Amazon and {SITE.stores.length} online game stores in the US, UK, Canada, Australia, Europe and Singapore, and puts them side by side, cheapest first.</p>
      <h2>Who we are</h2>
      <p>Just two people: Bill and George, who started {SITE.name} and still run it. No publisher, distributor or store has a share in it or a say in the order of a price list.</p>
      <p>Three games on one site means three numbering schemes and plenty of look-alike boxes, so the matching is done by a program with strict rules, and a listing it is unsure of is dropped. AI tools help us with the site&rsquo;s code and with first drafts of guides; we read every guide before it is published, and no price is ever typed in by hand.</p>
      {SITE.disclaimer && <p>{SITE.disclaimer}</p>}
      <h2>How we make money</h2>
      <p>Some buy links are affiliate links (eBay Partner Network, TCGplayer, Amazon): if you buy, the store may pay us a small commission at no cost to you. Amazon, eBay and TCGplayer, our affiliate partners, head each price table whatever their price, with &ldquo;Best price&rdquo; still marking the cheapest. The stores below them are ranked by price only — a store that pays us nothing ranks exactly where its price puts it.</p>
      <h2>Running costs</h2>
      <p>{SITE.name} shares hosting, daily price runs, domains and tools with the other price sites we run. The whole group costs about A$790 a month (our books, 30 days to 15 November 2026), and the affiliate commission above is how it is paid for.</p>
      <h2>Contact</h2>
      <p>Spotted a wrong price, or run a store that sells {SITE.gameShort}? <a href="/contact">Get in touch</a> or email <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.</p>
    </StaticPage>
  );
}
