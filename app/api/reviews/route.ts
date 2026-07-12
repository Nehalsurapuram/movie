import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "reviews.json");

async function readStore(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Review[];
  } catch (e) {
    return [];
  }
}

async function writeStore(items: Review[]) {
  try {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (e) {
    // ignore write errors for now
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const movieId = url.searchParams.get("movieId");
  const all = await readStore();
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
    const all = await readStore();
    all.push(review);
    await writeStore(all);
    return NextResponse.json(review, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}
