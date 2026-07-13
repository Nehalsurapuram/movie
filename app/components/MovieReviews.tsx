"use client";

import { useCallback, useEffect, useState } from "react";
import type { Review, RatingSummary } from "../lib/types";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import RatingSummaryPanel from "./RatingSummary";

type SortKey = "recent" | "helpful" | "rating";

export default function MovieReviews({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<RatingSummary | null>(null);
  const [sort, setSort] = useState<SortKey>("recent");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?movieId=${movieId}&sort=${sort}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setSummary(data.summary || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [movieId, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Reviews{summary?.count ? ` (${summary.count})` : ""}
          </h2>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="recent">Most recent</option>
            <option value="helpful">Most helpful</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>

        {summary && summary.count > 0 && (
          <div className="mb-6">
            <RatingSummaryPanel summary={summary} />
          </div>
        )}

        {loading ? (
          <p className="text-zinc-500">Loading reviews…</p>
        ) : (
          <ReviewList reviews={reviews} onChanged={load} />
        )}
      </div>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-lg font-bold">Write a review</h3>
          <ReviewForm movieId={movieId} onSaved={load} />
        </div>
      </aside>
    </div>
  );
}
