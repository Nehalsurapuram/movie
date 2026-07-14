import { NextResponse, type NextRequest } from "next/server";
import { searchMovies } from "../../../lib/movies";

// Proxies OMDB full-text search for the client-side browser UI.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const page = Number(req.nextUrl.searchParams.get("page") ?? "1") || 1;
  const data = await searchMovies(q, page);
  return NextResponse.json(data);
}
