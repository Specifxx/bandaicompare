// Per-game views of the catalogue for multi-game sites (SITE.lines): the
// /games hubs and the homepage's game tiles. Empty on single-game sites.
import type { GameLine, Product, SetInfo } from "@/lib/site-types";
import { byValue, products, refCents, setById, sets } from "@/lib/data";
import { LINES } from "@/lib/lines";

export interface GameView {
  line: GameLine;
  sets: SetInfo[];
  sealed: number;
  newest: SetInfo | null;
  /** The game's most valuable sealed products with a photo (the homepage tile's fan). */
  topSealed: Product[];
  boxes: Product[];
  /** Starter decks and decks, newest set first. */
  decks: Product[];
}

const memo = new Map<string, GameView>();
export function gameView(line: GameLine): GameView {
  const hit = memo.get(line.id);
  if (hit) return hit;
  const own = sets().filter((s) => s.line === line.id && s.productCount > 0);
  const ids = new Set(own.map((s) => s.id));
  const mine = products().filter((p) => ids.has(p.setId));
  const released = (p: Product) => { const s = setById(p.setId); return s && !s.upcoming ? s.releasedOn ?? "" : null; };
  const boxes = mine
    .filter((p) => p.kind === "sealed" && p.sealedType === "Booster Box" && released(p) !== null && refCents(p.id) != null)
    .sort((a, b) => released(b)!.localeCompare(released(a)!) || (refCents(b.id) ?? 0) - (refCents(a.id) ?? 0));
  const sealed = mine.filter((p) => p.kind === "sealed" && p.sealedType !== "Insert");
  const decks = sealed
    .filter((p) => /deck/i.test(p.sealedType ?? "") && released(p) !== null)
    .sort((a, b) => released(b)!.localeCompare(released(a)!));
  const view: GameView = {
    line,
    sets: own,
    sealed: sealed.length,
    newest: own.find((s) => !s.upcoming && sealed.some((p) => p.setId === s.id && p.sealedType === "Booster Box")) ?? own.find((s) => !s.upcoming) ?? null,
    topSealed: byValue(sealed.filter((p) => p.image && (p.sealedType === "Booster Box" || p.sealedType === "Case"))).slice(0, 12),
    boxes: boxes.slice(0, 12),
    decks: decks.slice(0, 12),
  };
  memo.set(line.id, view);
  return view;
}

export const gameViews = (): GameView[] => LINES.map(gameView);
