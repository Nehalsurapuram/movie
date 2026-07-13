"use client";

import { useMemo, useState } from "react";
import type { Movie } from "../lib/types";
import MovieCard from "./MovieCard";

type SortKey = "title" | "year-desc" | "year-asc" | "runtime";

export default function MovieBrowser({
  movies,
  genres,
}: {
  movies: Movie[];
  genres: string[];
}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortKey>("title");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = movies.filter((m) => {
      const matchesGenre = genre === "All" || m.genres.includes(genre);
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q));
      return matchesGenre && matchesQuery;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "runtime":
          return b.runtime - a.runtime;
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [movies, query, genre, sort]);

  const control =
    "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, director, or cast…"
          className={`${control} flex-1`}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={control}
        >
          <option value="All">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className={control}
        >
          <option value="title">Sort: A–Z</option>
          <option value="year-desc">Newest first</option>
          <option value="year-asc">Oldest first</option>
          <option value="runtime">Longest first</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-zinc-500">
        {filtered.length} movie{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-zinc-500 dark:border-zinc-700">
          No movies match your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
