import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { SITE } from "@/site.config";
import { abs, canon } from "@/lib/site";
import { lineBySlug } from "@/lib/lines";
import { GAME_TYPE_MIN, gameTypeHub, gameTypeHubs } from "@/lib/game-hubs";
import { setById } from "@/lib/data";
import { TileGrid } from "@/components/ProductTile";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic"; // one CDN copy per URL (next.config.js CDN_PAGES), never ISR

// One game's booster boxes, starter decks and so on (owner, 2026-11-09): the page a Fusion World player opens instead of /sealed/booster-box,
// which holds every game. Only a type the game has products in exists; under GAME_TYPE_MIN products it is noindex and out of the sitemap.
export function generateMetadata({ params }: { params: { slug: string; type: string } }): Metadata {
  const line = lineBySlug(params.slug);
  const h = line ? gameTypeHub(line, params.type) : null;
  if (!line || !h) return {};
  return {
    title: `${line.name} ${h.label.toLowerCase()} — prices for every set`,
    description: `Compare prices for all ${h.items.length} ${line.name} ${h.label.toLowerCase()} across TCGplayer, eBay and ${SITE.stores.length} stores, newest set first.`,
    ...canon(`/games/${line.slug}/${h.slug}`),
    ...(h.items.length >= GAME_TYPE_MIN ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function GameTypeHub({ params }: { params: { slug: string; type: string } }) {
  const line = lineBySlug(params.slug);
  const h = line ? gameTypeHub(line, params.type) : null;
  if (!line || !h) notFound();
  const items = h.items.slice().sort((a, b) => (setById(b.setId)?.releasedOn ?? "").localeCompare(setById(a.setId)?.releasedOn ?? ""));
  return (
    <div className="flex flex-col gap-6" style={{ ["--game" as string]: line.color }}>
      <Breadcrumbs items={[{ name: "Games", href: "/games" }, { name: line.name, href: `/games/${line.slug}` }, { name: h.label }]} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `${line.name} ${h.label.toLowerCase()}`, numberOfItems: items.length, itemListElement: items.slice(0, 30).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: abs(`/card/${p.slug}`) })) }} />
      <header>
        <h1 className="font-display text-3xl font-black">{line.name} {h.label.toLowerCase()}</h1>
        <p className="mt-2 text-muted">{h.items.length} products, newest set first. Open any one to compare every store and eBay.</p>
      </header>
      <TileGrid items={items} />
      <section>
        <h2 className="mb-3 text-lg font-bold">Other {line.name} sealed products</h2>
        <div className="flex flex-wrap gap-2">
          {gameTypeHubs(line).filter((x) => x.slug !== h.slug).map((x) => <Link key={x.slug} href={`/games/${line.slug}/${x.slug}`} className="chip">{x.label}</Link>)}
          <Link href={`/games/${line.slug}`} className="chip">All {line.name} sets</Link>
        </div>
      </section>
    </div>
  );
}
