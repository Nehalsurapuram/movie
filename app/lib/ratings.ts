import type { Review, RatingSummary } from "./types";

export function summarize(reviews: Review[]): RatingSummary {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  reviews.forEach((r) => {
    const s = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[s] += 1;
    total += r.rating;
  });
  const count = reviews.length;
  return {
    average: count ? total / count : 0,
    count,
    distribution,
  };
}
