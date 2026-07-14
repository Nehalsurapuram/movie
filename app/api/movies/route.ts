import { NextResponse } from "next/server";
import { getMovies } from "../../lib/movies";

// Exposes the OMDB-backed catalog to client components (e.g. the watchlist).
export async function GET() {
  const movies = await getMovies();
  return NextResponse.json(movies);
}
