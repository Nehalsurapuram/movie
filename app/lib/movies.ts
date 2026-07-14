import type { Movie } from "./types";

// Data source: the OMDB API (https://www.omdbapi.com). OMDB has no "list all"
// endpoint, so we keep a curated set of IMDb IDs to surface and fetch full
// details for each by id. Responses are cached for a day via the fetch cache.
const API_KEY = process.env.OMDB_API_KEY ?? "abc8b20c";
const BASE = "https://www.omdbapi.com";

type CatalogEntry = { id: string; featured?: boolean };

// The catalog. `featured` drives the home page; everything else comes from OMDB.
const CATALOG: CatalogEntry[] = [
  { id: "tt0111161", featured: true }, // The Shawshank Redemption
  { id: "tt0068646", featured: true }, // The Godfather
  { id: "tt0468569", featured: true }, // The Dark Knight
  { id: "tt0110912" }, // Pulp Fiction
  { id: "tt1375666", featured: true }, // Inception
  { id: "tt0137523" }, // Fight Club
  { id: "tt0109830" }, // Forrest Gump
  { id: "tt0816692", featured: true }, // Interstellar
  { id: "tt0133093" }, // The Matrix
  { id: "tt0167260" }, // LOTR: The Return of the King
  { id: "tt0114369" }, // Se7en
  { id: "tt0088763" }, // Back to the Future
  { id: "tt3896198" }, // Guardians of the Galaxy: Vol. 2
];

export const MOVIE_IDS = CATALOG.map((c) => c.id);

// Shape of the OMDB "by ID" response (the fields we consume).
type OmdbMovie = {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Response: string;
};

const NA = (v?: string) => (v && v !== "N/A" ? v : "");

function splitList(s?: string): string[] {
  return NA(s)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseRuntime(s?: string): number {
  const m = /(\d+)/.exec(s ?? "");
  return m ? Number(m[1]) : 0;
}

// Deterministic dark hex from the id so the gradient fallback (see Poster) is
// stable across renders even though OMDB doesn't supply a color.
function seedColor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  const s = 0.35;
  const l = 0.2;
  const k = (n: number) => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function mapMovie(raw: OmdbMovie, featured?: boolean): Movie {
  return {
    id: raw.imdbID,
    title: raw.Title,
    year: Number(raw.Year?.slice(0, 4)) || 0,
    genres: splitList(raw.Genre),
    runtime: parseRuntime(raw.Runtime),
    director: NA(raw.Director) || "Unknown",
    cast: splitList(raw.Actors),
    synopsis: NA(raw.Plot),
    poster: NA(raw.Poster),
    posterColor: seedColor(raw.imdbID),
    featured,
  };
}

async function fetchById(id: string): Promise<OmdbMovie | null> {
  try {
    const res = await fetch(`${BASE}/?apikey=${API_KEY}&i=${id}&plot=short`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OmdbMovie;
    return data.Response === "True" ? data : null;
  } catch {
    return null;
  }
}

export async function getMovies(): Promise<Movie[]> {
  const results = await Promise.all(
    CATALOG.map(async (c) => {
      const raw = await fetchById(c.id);
      return raw ? mapMovie(raw, c.featured) : null;
    }),
  );
  return results.filter((m): m is Movie => m !== null);
}

export async function getMovie(id: string): Promise<Movie | undefined> {
  const entry = CATALOG.find((c) => c.id === id);
  const raw = await fetchById(id);
  return raw ? mapMovie(raw, entry?.featured) : undefined;
}

// Shape of an item in the OMDB "by search" response. Search only returns these
// four fields — genre/runtime/cast/plot require a follow-up fetch by id.
type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

function searchItemToMovie(it: OmdbSearchItem): Movie {
  return {
    id: it.imdbID,
    title: it.Title,
    year: Number(it.Year?.slice(0, 4)) || 0,
    genres: [],
    runtime: 0,
    director: "",
    cast: [],
    synopsis: "",
    poster: NA(it.Poster),
    posterColor: seedColor(it.imdbID),
  };
}

// Full-text search across the entire OMDB database (not just the catalog).
// Returns partial Movie records (title/year/poster only); the detail page
// fills in the rest via getMovie(id). Results are paginated 10 per page.
export async function searchMovies(
  query: string,
  page = 1,
): Promise<{ results: Movie[]; total: number }> {
  const q = query.trim();
  if (q.length < 2) return { results: [], total: 0 };
  try {
    const url = `${BASE}/?apikey=${API_KEY}&type=movie&page=${page}&s=${encodeURIComponent(q)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [], total: 0 };
    const data = (await res.json()) as {
      Response: string;
      Search?: OmdbSearchItem[];
      totalResults?: string;
    };
    if (data.Response !== "True" || !data.Search) return { results: [], total: 0 };
    return {
      results: data.Search.map(searchItemToMovie),
      total: Number(data.totalResults) || data.Search.length,
    };
  } catch {
    return { results: [], total: 0 };
  }
}

export function allGenres(movies: Movie[]): string[] {
  const set = new Set<string>();
  movies.forEach((m) => m.genres.forEach((g) => set.add(g)));
  return Array.from(set).sort();
}
