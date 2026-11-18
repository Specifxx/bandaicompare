// Ported from TCG Prices (tcgcompare lib/game-seo.ts), 2026-11-18. Before, every title here led with SITE.gameShort,
// "Union Arena, DBS & Digimon", which was too long to fit and was dropped, so no title named its game.
// Titles in each game's own words (owner, 2026-11-18: "apply what Cardmarket did"; DECISIONS.md 2026-11-18). Cardmarket
// templates its metadata per game because a Yu-Gi-Oh! player types set codes, a Pokémon player types "ETB" and nobody
// types "TCG Delta Reign". Before this, every title here said `SITE.gameShort` ("TCG") and the set's raw TCGplayer name
// ("TCG ME06: Delta Reign"), so no page named its game. The game's search words live in `GameLine.seo` (site.config.ts);
// this file only arranges them. Titles only: URLs, h2s and JSON-LD names are unchanged.
import { SITE } from "@/site.config";
import { lineOfSet } from "@/lib/lines";
import type { GameLine, SetInfo } from "@/lib/site-types";

/** Lower case, accents and punctuation folded to spaces: "Pokémon" and "pokemon", "Yu-Gi-Oh!" and "yu gi oh" meet. */
export const fold = (s: string): string =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const has = (text: string, phrase: string): boolean => {
  const p = fold(phrase);
  return !!p && ` ${fold(text)} `.includes(` ${p} `);
};

/** Whether a name already says its game ("Disney Lorcana: Into the Inkdark ..." does). */
export function namesGame(text: string, line: GameLine | null): boolean {
  if (!line) return has(text, SITE.gameShort);
  const words = [line.seo?.name, line.short, line.name].filter((w): w is string => !!w);
  return words.some((w) => has(text, w));
}

// A set code players type: OP18, EB06, GD06, BT27, FB12, UE27BT, DZ-BT17, BP03 (letters then a number), or a
// Yu-Gi-Oh! four-letter code (GLVI). Never a slug, a slash code ("TAL/") or a lone number (Lorcana's "15").
const CODE = /^(?:[A-Za-z]{1,6}(?:-[A-Za-z]{1,6})?\d{1,3}[A-Za-z]{0,2}|[A-Z]{3,5})$/;
// A TCGplayer name led by its code ("ME06: Delta Reign", "UE27BT: Umamusume ..."): the prefix carries a digit, so
// "Commander: ..." and "ME: 30th Celebration" keep theirs.
const CODE_PREFIX = /^([A-Za-z0-9.-]*\d[A-Za-z0-9.-]*):\s+(.+)$/;

export interface SeoSet {
  /** The game as players type it, or null when the name already says it. */
  game: string | null;
  /** The set's name without a leading code. */
  name: string;
  /** The set code, only for games whose players search by it, and only when the name does not already carry it. */
  code: string | null;
}

export function seoSet(s: Pick<SetInfo, "name" | "code" | "line">): SeoSet {
  const line = lineOfSet(s);
  const m = CODE_PREFIX.exec(s.name);
  const name = m ? m[2] : s.name;
  const prefixCode = m && CODE.test(m[1]) ? m[1] : null;
  const raw = prefixCode ?? (s.code && CODE.test(s.code) ? s.code : null);
  const code = line?.seo?.codes && raw && !has(name, raw) ? raw : null;
  const label = line ? line.seo?.name ?? line.short : SITE.gameShort;
  return { game: namesGame(name, line) ? null : label, name, code };
}

const uniq = (xs: string[]) => [...new Set(xs.map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean))];
const withCode = (name: string, code: string | null) => (code ? `${name} (${code})` : name);
const withGame = (game: string | null, rest: string) => (game ? `${game} ${rest}` : rest);

/** The set's headline product word in its community's terms: "Booster Box", "Booster Box & ETB", "Starter Deck". */
export function headlineWord(types: (string | null)[], line: GameLine | null): string {
  const present = new Set(types.filter((t): t is string => !!t));
  const term = (t: string) => line?.seo?.terms?.[t] ?? t;
  const extra = Object.keys(line?.seo?.terms ?? {}).find((t) => present.has(t));
  if (present.has("Booster Box")) return extra ? `Booster Box & ${term(extra)}` : "Booster Box";
  const first = ["Elite Trainer Box", "Booster Bundle", "Starter Deck", "Collection", "Booster Pack"].find((t) => present.has(t));
  return first ? term(first) : "Booster Box";
}

/** Set page titles, longest and most specific first (fitTitle takes the first that fits 60 characters). */
export function setTitleLadder(s: Pick<SetInfo, "name" | "code" | "line">, types: (string | null)[] = ["Booster Box"]): string[] {
  const { game, name, code } = seoSet(s);
  const said = headlineWord(types, lineOfSet(s));
  // "Starter Deck 11: Timeline of Fate" already says its product: never "... Starter Deck Starter Deck Prices".
  const word = has(name, said) ? "" : said;
  const core = word === "Booster Box" ? "Booster Box & Sealed Prices" : `${word} Prices`;
  return uniq([
    withGame(game, `${withCode(name, code)} ${core}`),
    withGame(game, `${withCode(name, code)} ${word} Prices`),
    withGame(game, `${name} ${core}`),
    withGame(game, `${name} ${word} Prices`),
    `${withCode(name, code)} ${word} Prices`,
    `${name} ${word} Prices`,
    `${name} Prices`,
  ]);
}

/** A sealed product's titles: "One Piece The Dominance of God Booster Box (OP18) Price", stepping down. */
export function productTitleLadder(productName: string, s: Pick<SetInfo, "name" | "code" | "line"> | null): string[] {
  const line = s ? lineOfSet(s) : null;
  const meta = s ? seoSet(s) : null;
  const game = namesGame(productName, line) ? null : meta?.game ?? (line ? line.seo?.name ?? line.short : null);
  const code = meta?.code && !has(productName, meta.code) ? meta.code : null;
  return uniq([
    withGame(game, `${withCode(productName, code)} Price`),
    withGame(game, `${productName} Price`),
    `${withCode(productName, code)} Price`,
    `${productName} Price`,
    productName,
  ]);
}

/** "One Piece The Dominance of God (OP18)": the set as its players name it, for headings and descriptions. */
export function setPhrase(s: Pick<SetInfo, "name" | "code" | "line">): string {
  const { game, name, code } = seoSet(s);
  return withGame(game, withCode(name, code));
}
