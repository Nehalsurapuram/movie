"use client";

import { useEffect, useMemo, useState } from "react";
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

  // Remote OMDB search state (used once the user types a query).
  const [remote, setRemote] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [searching, setSearching] = useState(false);

  const trimmed = query.trim();
  const isSearch = trimmed.length >= 2;

  // Debounced full-text search across all of OMDB when a query is entered.
  useEffect(() => {
    if (!isSearch) {
      setRemote([]);
      setTotal(0);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/movies/search?q=${encodeURIComponent(trimmed)}`,
        );
        const data = (await res.json()) as { results: Movie[]; total: number };
        if (cancelled) return;
        setRemote(data.results ?? []);
        setTotal(data.total ?? 0);
      } catch {
        if (!cancelled) {
          setRemote([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, isSearch]);

  // Local catalog view: genre + sort filtering (only when not searching).
  const localFiltered = useMemo(() => {
    const result = movies.filter(
      (m) => genre === "All" || m.genres.includes(genre),
    );
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
  }, [movies, genre, sort]);

  const shown = isSearch ? remote : localFiltered;

  const control =
    "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all movies on OMDB…"
          className={`${control} flex-1`}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={isSearch}
          className={`${control} disabled:opacity-40`}
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
          disabled={isSearch}
          className={`${control} disabled:opacity-40`}
        >
          <option value="title">Sort: A–Z</option>
          <option value="year-desc">Newest first</option>
          <option value="year-asc">Oldest first</option>
          <option value="runtime">Longest first</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-zinc-500">
        {isSearch
          ? searching
            ? "Searching OMDB…"
            : `${total.toLocaleString()} result${total === 1 ? "" : "s"} on OMDB for “${trimmed}”${
                total > shown.length ? ` — showing first ${shown.length}` : ""
              }`
          : `${shown.length} movie${shown.length === 1 ? "" : "s"} in the catalog`}
      </p>

      {shown.length === 0 && !searching ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-zinc-500 dark:border-zinc-700">
          {isSearch ? "No movies match your search." : "No movies to show."}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {shown.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
