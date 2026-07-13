import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Review } from "@/app/lib/types";

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

// PATCH /api/reviews/:id  { action: "helpful" } — increments the helpful count.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine */
  }

  const all = await readStore();
  const review = all.find((r) => r.id === id);
  if (!review) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.action === "helpful") {
    review.helpful += 1;
  }

  await writeStore(all);
  return NextResponse.json(review);
}

// DELETE /api/reviews/:id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = await readStore();
  const next = all.filter((r) => r.id !== id);
  if (next.length === all.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeStore(next);
  return NextResponse.json({ ok: true });
}
