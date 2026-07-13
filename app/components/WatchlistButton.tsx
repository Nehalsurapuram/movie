"use client";

import { useWatchlist } from "../lib/useWatchlist";

export default function WatchlistButton({
  movieId,
  variant = "full",
}: {
  movieId: string;
  variant?: "full" | "icon";
}) {
  const { has, toggle, ready } = useWatchlist();
  const active = has(movieId);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(movieId);
        }}
        aria-pressed={active}
        aria-label={active ? "Remove from watchlist" : "Add to watchlist"}
        title={active ? "Remove from watchlist" : "Add to watchlist"}
        className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
          active
            ? "bg-amber-400 text-black"
            : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        {active ? "✓" : "＋"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(movieId)}
      disabled={!ready}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-amber-400 text-black hover:bg-amber-300"
          : "border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      {active ? "✓ In watchlist" : "＋ Add to watchlist"}
    </button>
  );
}
