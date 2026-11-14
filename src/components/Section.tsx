import Link from "@/components/Link";

/** The engine's section header (from MTG Compare): a kicker, the title, an optional "See all →" link that wraps under it on a phone. */
export function Section({ id, title, kicker, sub, href, linkLabel = "See all", className = "", children }: { id?: string; title: string; kicker?: string; sub?: string; href?: string; linkLabel?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={className}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          {kicker && <div className="eyebrow mb-1">{kicker}</div>}
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">{title}</h2>
          {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
        </div>
        {href && (
          <Link href={href} className="-my-2 inline-flex min-h-10 shrink-0 items-center text-sm font-semibold text-brand hover:underline">
            {linkLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** An empty list, said plainly. */
export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="card px-6 py-10 text-center text-muted">{children}</div>;
}

/**
 * Every page's head, in the home page's words (2026-11-14): an optional small line above (a date, a kind), the h1 in the display
 * face, one muted line under it, then anything the page puts there (chips, a toolbar). One size for every list, guide and static
 * page, so a visitor who leaves the home page finds the same voice on the next one. `size="article"`: a long title, a size down.
 */
export function PageHead({ eyebrow, title, sub, size = "page", className = "", children }: { eyebrow?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; size?: "page" | "article"; className?: string; children?: React.ReactNode }) {
  return (
    <header className={`page-head ${className}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h1 className={size === "article" ? "page-h1-article" : "page-h1"}>{title}</h1>
      {sub && <p className={size === "article" ? "page-sub sm:text-[17px] sm:leading-7" : "page-sub"}>{sub}</p>}
      {children}
    </header>
  );
}
