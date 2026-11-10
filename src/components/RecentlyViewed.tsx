"use client";

import { useEffect, useState } from "react";

// "Recently viewed" (2026-11-10, the cost-cut redesign: return visits, more exploring). The product page records what the
// visitor opened in their own browser (localStorage, nothing sent anywhere), and the homepage and product pages show it back
// as one row of plain links. Pages stay CDN-cached and the same for everyone: the row is drawn only in the browser, and
// nothing renders when there is no history, so a first visit sees no gap.
const KEY = "bc_recent";
const MAX = 12;

export interface Recent { slug: string; name: string; image: string | null; type: string | null }

function read(): Recent[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => x && typeof x.slug === "string" && typeof x.name === "string").slice(0, MAX) : [];
  } catch {
    return [];
  }
}

/** Remembers this product as the visitor's most recent view. Renders nothing. */
export function RecordView(item: Recent) {
  useEffect(() => {
    try {
      const next = [item, ...read().filter((x) => x.slug !== item.slug)].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* private window or storage off: nothing to remember */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.slug]);
  return null;
}

/** The visitor's recently viewed products (excluding `skip`), or nothing. */
export function RecentlyViewed({ skip, title = "Recently viewed" }: { skip?: string; title?: string }) {
  const [items, setItems] = useState<Recent[]>([]);
  useEffect(() => setItems(read().filter((x) => x.slug !== skip).slice(0, 8)), [skip]);
  if (!items.length) return null;
  return (
    <section aria-label={title}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-lg font-bold">{title}</p>
        <button
          type="button"
          className="text-xs text-muted hover:underline"
          onClick={() => {
            try { localStorage.removeItem(KEY); } catch { /* ignore */ }
            setItems([]);
          }}
        >
          Clear
        </button>
      </div>
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {items.map((x) => (
          <li key={x.slug} className="shrink-0">
            <a href={`/card/${x.slug}`} className="card flex w-56 items-center gap-2 p-2 hover:border-ink/40">
              <span className="plate h-12 w-9 shrink-0">{x.image && <img src={x.image} alt={x.name} className="h-full w-full object-contain" loading="lazy" />}</span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug">{x.name}</span>
                {x.type && <span className="block text-xs text-muted">{x.type}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
