import Link from "next/link";
import { getMovies } from "./lib/movies";
import MovieCard from "./components/MovieCard";

export default async function Home() {
  const movies = await getMovies();
  const featured = movies.filter((m) => m.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to know about movies, in one place.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Discover films, read what the community thinks, rate your favorites,
            and keep track of what to watch next.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/movies"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Browse movies
            </Link>
            <Link
              href="/watchlist"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              My watchlist
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured films</h2>
          <Link
            href="/movies"
            className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {featured.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
