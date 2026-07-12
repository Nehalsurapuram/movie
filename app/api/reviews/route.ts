import { NextResponse } from "next/server";

type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

// Simple in-memory store for demo purposes (resets on server restart)
const globalAny: any = globalThis as any;
if (!globalAny.__REVIEWS) globalAny.__REVIEWS = [] as Review[];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const movieId = url.searchParams.get("movieId");
  const all: Review[] = globalAny.__REVIEWS;
  const result = movieId ? all.filter((r) => r.movieId === movieId) : all;
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { movieId, author, rating, comment } = body;
    if (!movieId || !author || !comment) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    const review: Review = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      movieId,
      author,
      rating: Number(rating) || 0,
      comment,
      createdAt: new Date().toISOString(),
    };
    globalAny.__REVIEWS.push(review);
    return NextResponse.json(review, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}
