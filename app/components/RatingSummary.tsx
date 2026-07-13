import type { RatingSummary } from "../lib/types";
import { StarDisplay } from "./StarRating";

export default function RatingSummaryPanel({ summary }: { summary: RatingSummary }) {
  const { average, count, distribution } = summary;
  const max = Math.max(1, ...Object.values(distribution));

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center">
      <div className="flex flex-col items-center sm:pr-6 sm:border-r sm:border-zinc-200 dark:sm:border-zinc-800">
        <span className="text-4xl font-bold">{average.toFixed(1)}</span>
        <StarDisplay value={average} size={16} className="my-1" />
        <span className="text-xs text-zinc-500">
          {count} review{count === 1 ? "" : "s"}
        </span>
      </div>
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-2 text-xs">
            <span className="w-6 text-zinc-500">{star}★</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${(distribution[star] / max) * 100}%` }}
              />
            </div>
            <span className="w-6 text-right text-zinc-500">
              {distribution[star]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
