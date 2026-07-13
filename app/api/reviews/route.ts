import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Review } from "@/app/lib/types";
import { summarize } from "@/app/lib/ratings";

const DATA_PATH = path.join(process.cwd(), "data", "reviews.json");

async function readStore(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

async function writeStore(items: Review[]) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

// GET /api/reviews?movieId=xxx&sort=recent|helpful|rating
export async function GET(request: Request) {
  const url = new URL(request.url);
  const movieId = url.searchParams.get("movieId");
  const sort = url.searchParams.get("sort") ?? "recent";
  const all = await readStore();
  let result = movieId ? all.filter((r) => r.movieId === movieId) : all;

  result = [...result].sort((a, b) => {
    if (sort === "helpful") return b.helpful - a.helpful;
    if (sort === "rating") return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json({
    reviews: result,
    summary: summarize(movieId ? result : all),
  });
}

// POST /api/reviews
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const movieId = String(body.movieId ?? "").trim();
  const author = String(body.author ?? "").trim();
  const comment = String(body.comment ?? "").trim();
  const title = String(body.title ?? "").trim();
  const rating = Number(body.rating);

  const errors: string[] = [];
  if (!movieId) errors.push("movieId is required");
  if (!author) errors.push("author is required");
  if (author.length > 60) errors.push("author must be under 60 characters");
  if (!comment) errors.push("comment is required");
  if (comment.length > 4000) errors.push("comment is too long");
  if (!Number.isFinite(rating) || rating < 1 || rating > 5)
    errors.push("rating must be between 1 and 5");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  const review: Review = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    movieId,
    author,
    rating: Math.round(rating),
    title: title.slice(0, 120),
    comment,
    createdAt: new Date().toISOString(),
    helpful: 0,
  };

  const all = await readStore();
  all.push(review);
  await writeStore(all);
  return NextResponse.json(review, { status: 201 });
}
