// BandaiCompare merged into TCG Prices (owner, 2026-11-26; DECISIONS.md). Every page this site had is now served by
// tcgprices.app: data/redirects/tcgprices.json maps each of them (frozen that day), next.config.js 301s them, and the
// card page sends what it still resolves (a retired single, a culled product, a product added since) through here.
// One hop: the map is applied to the path this site would have redirected to.
import merge from "../../data/redirects/tcgprices.json";

const MAP = merge.paths as Record<string, string>;
export const MERGED_HOST: string = merge.host;
/** On: the card page redirects every product (typed boolean so the page's old render path still type-checks). */
export const MERGED: boolean = true;

/** The TCG Prices URL for a path of this site: its mapped page, else the same path there. */
export function mergedUrl(path: string): string {
  const clean = path.split("?")[0] || "/";
  return `${MERGED_HOST}${MAP[clean] ?? clean}`;
}
