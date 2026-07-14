import { notFound } from "next/navigation";
import Link from "next/link";
import { MOVIE_IDS, getMovie } from "../../lib/movies";
import Poster from "../../components/Poster";
import WatchlistButton from "../../components/WatchlistButton";
import MovieReviews from "../../components/MovieReviews";

export function generateStaticParams() {
  return MOVIE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  return { title: movie ? `${movie.title} (${movie.year}) — MovieReviews` : "Movie" };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  if (!movie) notFound();

  return (
    <div>
      {/* Backdrop header */}
      <div className="relative border-b border-zinc-200 dark:border-zinc-800">
        {movie.backdrop && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 to-transparent dark:from-black" />
        <div className="relative mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/movies"
            className="mb-6 inline-block text-sm text-zinc-500 hover:underline"
          >
            ← Back to movies
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-40 shrink-0 overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-[2/3]">
                <Poster
                  src={movie.poster}
                  alt={movie.title}
                  color={movie.posterColor}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold sm:text-4xl">{movie.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>{movie.year}</span>
                <span>·</span>
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                <span>·</span>
                <span>Dir. {movie.director}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium dark:bg-zinc-800"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-2xl text-zinc-700 dark:text-zinc-300">
                {movie.synopsis}
              </p>
              <p className="mt-3 text-sm text-zinc-500">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Starring:
                </span>{" "}
                {movie.cast.join(", ")}
              </p>
              <div className="mt-5">
                <WatchlistButton movieId={movie.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <MovieReviews movieId={movie.id} />
      </div>
    </div>
  );
}
