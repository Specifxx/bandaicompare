import type { Metadata } from "next";
import { SITE } from "@/site.config";
import { canon } from "@/lib/site";
import { byValue, products, setById } from "@/lib/data";
import { InlineAds } from "@/components/InlineAds";
import { adSearch, cardAds } from "@/lib/card-ads";
import { SEALED_ORDER as ORDER, SEALED_PLURAL as PLURAL, sealedHref } from "@/lib/hubs";
import Link from "@/components/Link";
import { TileGrid } from "@/components/ProductTile";

export const revalidate = 86400; // data only changes with a release (DECISIONS.md, "Vercel cost")
export const metadata: Metadata = {
  title: `${SITE.gameShort} booster box prices — cheapest sealed product`,
  description: `Compare ${SITE.game} booster box, booster pack, starter deck and sealed product prices across TCGplayer, eBay and ${SITE.stores.length} stores.`,
  ...canon("/sealed"),
};


export default function Sealed() {
  const sealed = products().filter((p) => p.kind === "sealed");
  const groups = ORDER.map((t) => ({ t, items: byValue(sealed.filter((p) => p.sealedType === t)) })).filter((g) => g.items.length);
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="page-h1">{SITE.gameShort} booster box and sealed prices</h1>
        <p className="page-sub">Newest sets first within each type. Open any product to compare every store.</p>
      </header>
      {groups.map((g) => (
        <section key={g.t}>
          <h2 className="mb-5 font-display text-2xl font-bold tracking-tight sm:text-[28px]">{sealedHref(g.t) ? <Link className="transition-colors hover:text-brand" href={sealedHref(g.t)!}>{PLURAL[g.t] ?? g.t} →</Link> : PLURAL[g.t] ?? g.t}</h2>
          <TileGrid items={g.items.sort((a, b) => (setById(b.setId)?.releasedOn ?? "").localeCompare(setById(a.setId)?.releasedOn ?? "")).slice(0, 24)} />
        </section>
      ))}
      <InlineAds ads={cardAds({ kind: "sealed", limit: 10 })} search={adSearch()} page="sealed" />
    </div>
  );
}
