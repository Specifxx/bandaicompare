// The shopping half of the navigation (owner, 2026-11-09: "a collector or someone deep in a space wants to navigate it fast; if you
// only care about soccer you don't care about basketball"). This site holds three games, so the first question is WHICH GAME: a
// Fusion World player never wades through Union Arena or Digimon. Each game gets its own header dropdown (its product types and its
// newest sets), its own sidebar group and its own type pages (/games/<game>/<type>); the cross-game /sealed and /sets stay for the
// browser who has not picked. The header, the sidebar (lib/nav.ts navGroups `shop`) and the phone menu all read this ONE list, from
// the hubs that already exist: no dead end and no new query. Server-side: lib/nav.ts stays free of data.
import { products } from "@/lib/data";
import { LINES } from "@/lib/lines";
import { GAME_TYPE_MIN, gameTypeHubs, gameView } from "@/lib/game-hubs";
import { sealedHubs } from "@/lib/hubs";
import type { NavGroup, NavLink } from "@/lib/nav";

export interface GameMenu {
  /** The game's short name ("Fusion World"). */
  label: string;
  href: string;
  columns: NavGroup[];
}
export interface ShopMenus {
  games: GameMenu[];
  sealed: NavGroup[];
}
export interface ShopNav {
  menus: ShopMenus;
  /** The sidebar and phone menu groups, before "Deals & stock". */
  groups: NavGroup[];
}

const cap = (list: NavLink[], n: number, all: NavLink): NavLink[] => (list.length > n ? [...list.slice(0, n), all] : list);

let memo: { at: unknown; v: ShopNav } | null = null;
export function shopNav(): ShopNav {
  const at = products();
  if (memo && memo.at === at) return memo.v;
  const v = build();
  memo = { at, v };
  return v;
}

function build(): ShopNav {
  const games: GameMenu[] = [];
  const groups: NavGroup[] = [];
  for (const line of LINES) {
    const view = gameView(line);
    const types: NavLink[] = gameTypeHubs(line).filter((h) => h.items.length >= GAME_TYPE_MIN).map((h) => ({ href: `/games/${line.slug}/${h.slug}`, label: h.label }));
    const setLinks: NavLink[] = view.sets.filter((s) => !s.upcoming).map((s) => ({ href: `/sets/${s.slug}`, label: s.name }));
    const home: NavLink = { href: `/games/${line.slug}`, label: `All ${line.short} sets` };
    games.push({
      label: line.short,
      href: `/games/${line.slug}`,
      columns: [
        ...(types.length ? [{ title: "By product type", links: types }] : []),
        { title: "Newest sets", links: cap(setLinks, 8, { href: home.href, label: `All ${view.sets.length} sets` }) },
      ],
    });
    groups.push({ title: line.name, links: [{ href: home.href, label: `${line.short} home` }, ...types, ...cap(setLinks, 8, { href: "/sets", label: `All ${line.short} sets` })] });
  }
  const types: NavLink[] = sealedHubs().map((h) => ({ href: `/sealed/${h.slug}`, label: h.label }));
  groups.push({ title: "All games, by type", links: [...types, { href: "/sealed", label: "All sealed" }, { href: "/sets", label: "Every set" }] });
  const seen = new Set<string>();
  const unique = groups.map((g) => ({ ...g, links: g.links.filter((l) => !seen.has(l.href) && !!seen.add(l.href)) })).filter((g) => g.links.length);
  return { menus: { games, sealed: types.length ? [{ title: "Across all games", links: [...types, { href: "/preorders", label: "Pre-orders" }, { href: "/sealed", label: "All sealed" }] }] : [] }, groups: unique };
}
