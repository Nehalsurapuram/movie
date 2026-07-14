"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Movie } from "../lib/types";
import { useWatchlist } from "../lib/useWatchlist";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const { ids, ready } = useWatchlist();
  const [all, setAll] = useState<Movie[] | null>(null);

  useEffect(() => {
    fetch("/api/movies")
      .then((r) => r.json())
      .then((data: Movie[]) => setAll(data))
      .catch(() => setAll([]));
  }, []);

  const loading = !ready || all === null;
  const movies = (all ?? []).filter((m) => ids.includes(m.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My watchlist</h1>

      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : movies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-500">Your watchlist is empty.</p>
          <Link
            href="/movies"
            className="mt-4 inline-block rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
          >
            Browse movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
