export type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  runtime: number; // minutes
  director: string;
  cast: string[];
  synopsis: string;
  poster: string; // remote URL (falls back to gradient on error)
  backdrop?: string;
  posterColor: string; // fallback gradient seed (hex)
  featured?: boolean;
};

export type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number; // 1–5
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
};

export type RatingSummary = {
  average: number;
  count: number;
  distribution: Record<number, number>; // stars -> count
};
