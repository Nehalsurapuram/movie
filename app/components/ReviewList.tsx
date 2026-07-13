"use client";

import { useState } from "react";
import type { Review } from "../lib/types";
import { StarDisplay } from "./StarRating";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const secs = Math.floor((Date.now() - then) / 1000);
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [30, "day"],
    [12, "month"],
    [Infinity, "year"],
  ];
  let value = secs;
  let unit = "second";
  for (const [size, name] of units) {
    if (value < size) {
      unit = name;
      break;
    }
    value = Math.floor(value / size);
    unit = name;
  }
  if (unit === "second" && value < 30) return "just now";
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

export default function ReviewList({
  reviews,
  onChanged,
}: {
  reviews: Review[];
  onChanged: () => void;
}) {
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  async function markHelpful(id: string) {
    if (voted[id]) return;
    setVoted((v) => ({ ...v, [id]: true }));
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "helpful" }),
    });
    onChanged();
  }

  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    onChanged();
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No reviews yet — be the first to share your thoughts!
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li
          key={r.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-400/20 dark:text-amber-300">
                {r.author.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold leading-tight">{r.author}</div>
                <div className="text-xs text-zinc-500">{timeAgo(r.createdAt)}</div>
              </div>
            </div>
            <StarDisplay value={r.rating} size={14} />
          </div>
          {r.title && <h4 className="mt-3 font-semibold">{r.title}</h4>}
          <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
            {r.comment}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <button
              onClick={() => markHelpful(r.id)}
              disabled={voted[r.id]}
              className="inline-flex items-center gap-1 text-zinc-500 transition hover:text-amber-600 disabled:opacity-60"
            >
              👍 Helpful{r.helpful ? ` (${r.helpful})` : ""}
            </button>
            <button
              onClick={() => remove(r.id)}
              className="text-zinc-400 transition hover:text-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
