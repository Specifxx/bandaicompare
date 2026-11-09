import type { Metadata } from "next";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { SITE } from "@/site.config";
import { canon, abs } from "@/lib/site";
import { fitTitle } from "@/lib/seo-title";
import { lineBySlug } from "@/lib/lines";
import { GAME_TYPE_MIN, gameTypeHubs, gameView } from "@/lib/game-hubs";
import { productsInSet, refCents } from "@/lib/data";
import { money } from "@/lib/format";
import { TileGrid } from "@/components/ProductTile";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic"; // one CDN copy per URL (next.config.js CDN_PAGES), never ISR

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const line = lineBySlug(params.slug);
  if (!line) return {};
  const v = gameView(line);
  const title = fitTitle([`${line.name} Booster Box Prices — Every Store`, `${line.name} Booster Box Prices`, `${line.name} Prices`]);
  return {
    title,
    description: `${line.name} booster boxes, cases and starter decks compared across TCGplayer, eBay, Amazon and ${SITE.stores.length} stores: ${v.sealed} sealed products in ${v.sets.length} sets, cheapest in stock first, updated daily.`,
    ...canon(`/games/${line.slug}`),
    openGraph: { ...canon(`/games/${line.slug}`).openGraph, title: title.absolute },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const line = lineBySlug(params.slug);
  if (!line) notFound();
  const v = gameView(line);
  return (
    <div className="flex flex-col gap-8" style={{ ["--game" as string]: line.color }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `${line.name} sets`, numberOfItems: v.sets.length, itemListElement: v.sets.slice(0, 30).map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: abs(`/sets/${s.slug}`) })) }} />
      <div>
        <Breadcrumbs items={[{ name: "Games", href: "/games" }, { name: line.name }]} />
        <header className="game-hero">
          <h1 className="font-display text-3xl font-black md:text-4xl">{line.name} prices</h1>
          <p className="mt-2 max-w-2xl text-muted">{line.blurb}</p>
          <p className="mt-2 text-sm text-muted">{v.sets.length} sets · {v.sealed} sealed products, compared across TCGplayer, eBay, Amazon and {SITE.stores.length} stores.</p>
          {v.newest && <p className="mt-3"><Link className="btn-primary" href={`/sets/${v.newest.slug}`}>Newest set: {v.newest.name} →</Link></p>}
        </header>
      </div>

      <nav aria-label={`${line.name} product types`} className="-mt-4 flex flex-wrap gap-2">
        {gameTypeHubs(line).filter((h) => h.items.length >= GAME_TYPE_MIN).map((h) => (
          <Link key={h.slug} href={`/games/${line.slug}/${h.slug}`} className="chip hover:border-brand">{h.label} <span className="text-muted">· {h.items.length}</span></Link>
        ))}
      </nav>

      {v.boxes.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">{line.name} booster boxes</h2>
          <TileGrid items={v.boxes.slice(0, 6)} />
        </section>
      )}

      {v.decks.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">{line.name} starter decks</h2>
          <TileGrid items={v.decks.slice(0, 6)} />
        </section>
      )}


      <section>
        <h2 className="mb-3 text-xl font-bold">Every {line.name} set, newest first</h2>
        <div className="overflow-hidden rounded-xl border border-ink-700/60">
          <table className="w-full text-sm">
            <thead className="bg-ink-850 text-left text-xs uppercase text-muted">
              <tr><th className="px-3 py-2">Set</th><th className="px-3 py-2">Released</th><th className="px-3 py-2 text-right">Sealed</th><th className="px-3 py-2 text-right">Booster box</th></tr>
            </thead>
            <tbody>
              {v.sets.map((s) => {
                const sealed = productsInSet(s.id).filter((p) => p.kind === "sealed" && p.sealedType !== "Insert");
                const box = sealed.find((p) => p.sealedType === "Booster Box");
                const value = box ? refCents(box.id) : null;
                return (
                  <tr key={s.id} className="border-t border-ink-800">
                    <td className="px-3 py-2"><Link className="link" href={`/sets/${s.slug}`}>{s.name}</Link>{s.upcoming && <span className="tag ml-2">Upcoming</span>}</td>
                    <td className="px-3 py-2 text-muted">{s.releasedOn}</td>
                    <td className="px-3 py-2 text-right">{sealed.length}</td>
                    <td className="px-3 py-2 text-right font-semibold">{value ? money(value) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
