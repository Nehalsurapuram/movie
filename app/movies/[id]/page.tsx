"use client";

import { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm";
import { useParams } from "next/navigation";

type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function MovieDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?movieId=${id}`);
      const data = await res.json();
      setReviews(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Movie {id}</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Reviews</h2>
        {loading ? (
          <p>Loading…</p>
        ) : reviews.length === 0 ? (
          <p className="text-zinc-500">No reviews yet — be the first!</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="p-3 border rounded bg-white">
                <div className="flex items-center justify-between">
                  <strong>{r.author}</strong>
                  <span className="text-sm text-zinc-500">{r.rating} ⭐</span>
                </div>
                <p className="mt-2 text-sm">{r.comment}</p>
                <div className="text-xs text-zinc-400 mt-2">{r.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="max-w-md">
        <h2 className="text-lg font-semibold mb-2">Leave a review</h2>
        <ReviewForm movieId={id} onSaved={() => load()} />
      </div>
    </div>
  );
}
