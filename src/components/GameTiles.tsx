import Link from "@/components/Link";
import { GAME_TYPE_MIN, gameTypeHubs, gameViews } from "@/lib/game-hubs";
import { imageAt } from "@/lib/image";

/**
 * The homepage's "pick your game" row on a multi-game site (SITE.lines): one
 * panel per game in its colour, with its three most valuable booster boxes fanned out
 * (TCGplayer's own photos, hotlinked like every tile). Plain links, server HTML.
 */
export function GameTiles() {
  const views = gameViews();
  if (!views.length) return null;
  return (
    <section aria-labelledby="games-h">
      <h2 id="games-h" className="mb-3 text-xl font-bold">Pick your game</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {views.map((v) => {
          const fan = v.topSealed.slice(0, 3);
          return (
            <Link key={v.line.id} href={`/games/${v.line.slug}`} className="game-tile group" style={{ ["--game" as string]: v.line.color }}>
              {fan.length > 0 && (
                <span className="game-fan" aria-hidden="true">
                  {fan.map((p, i) => (
                    <img key={p.id} src={imageAt(p.image, "200w")!} alt={p.name} loading="lazy" width={86} height={120} className={`game-fan-card game-fan-${i}`} />
                  ))}
                </span>
              )}
              <span className="game-tile-name">{v.line.name}</span>
              <span className="game-tile-blurb mt-1 block text-sm">{v.line.blurb}</span>
              <span className="game-tile-stats mt-3 flex flex-wrap gap-1.5 text-xs">
                <span>{v.sealed.toLocaleString()} sealed products</span>
                <span>{v.sets.length} sets</span>
              </span>
              {v.newest && <span className="mt-2 block text-xs opacity-80">Newest: {v.newest.name}</span>}
              <span className="game-tile-go mt-3 inline-block text-sm font-bold">Compare {v.line.short} prices →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * The homepage's game picker since 2026-11-10 (the cost-cut redesign: bare-bones, more exploring): one plain row per game with
 * its product-type hubs as links, so a visitor is one tap from "Fusion World booster boxes" instead of scrolling past three
 * illustrated panels. Server HTML, no images.
 */
export function GameRows() {
  const views = gameViews();
  if (!views.length) return null;
  return (
    <section aria-labelledby="games-h">
      <h2 id="games-h" className="mb-3 text-xl font-bold">Pick your game</h2>
      <ul className="card divide-y divide-line">
        {views.map((v) => {
          const hubs = gameTypeHubs(v.line).filter((h) => h.items.length >= GAME_TYPE_MIN).slice(0, 5);
          return (
            <li key={v.line.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/games/${v.line.slug}`} className="font-semibold hover:text-brand">
                  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: v.line.color }} aria-hidden="true" />
                  {v.line.name} →
                </Link>
                <p className="text-xs text-muted">
                  {v.sealed.toLocaleString()} sealed products · {v.sets.length} sets{v.newest ? ` · newest: ${v.newest.name}` : ""}
                </p>
              </div>
              {hubs.length > 0 && (
                <p className="flex flex-wrap gap-1.5">
                  {hubs.map((h) => (
                    <Link key={h.slug} href={`/games/${v.line.slug}/${h.slug}`} className="chip text-xs">
                      {h.label}
                    </Link>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
