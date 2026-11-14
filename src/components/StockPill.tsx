export type StockState = "open" | "soldout" | "pre";

// Calm palette (2026-11-12, 2026-11-14 on the tiles): the words are grey, only the 6px dot carries the state's colour, nothing pulses.
const DOT: Record<StockState, string> = {
  open: "bg-open",
  pre: "bg-pre",
  soldout: "bg-sold",
};

const SIZE = {
  md: "gap-1.5 text-xs",
  // A product card's: one 16px line that fits a 2-up phone card ("In stock · 12 stores").
  sm: "gap-1.5 text-xs leading-4",
};

/** The engine's stock line (from MTG Compare): a dot (green in stock, violet on pre-order, grey sold out) and the words in grey. */
export function StockPill({ state, size = "md", className = "", children }: { state: StockState; size?: keyof typeof SIZE; className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex min-w-0 items-center whitespace-nowrap font-medium text-muted ${SIZE[size]} ${className}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[state]}`} aria-hidden="true" />
      {children}
    </span>
  );
}
