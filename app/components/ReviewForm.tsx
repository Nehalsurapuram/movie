"use client";

import { useState } from "react";

export default function ReviewForm({
  movieId,
  onSaved,
}: {
  movieId: string;
  onSaved?: () => void;
}) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, author, rating, comment }),
      });
      setAuthor("");
      setRating(5);
      setComment("");
      onSaved?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        className="border p-2 rounded"
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} star{r > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review"
        className="border p-2 rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Saving…" : "Submit review"}
      </button>
    </form>
  );
}
