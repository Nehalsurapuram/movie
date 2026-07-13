import Link from "next/link";
import type { Movie } from "../lib/types";
import Poster from "./Poster";
import WatchlistButton from "./WatchlistButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="absolute right-2 top-2 z-10">
        <WatchlistButton movieId={movie.id} variant="icon" />
      </div>
      <Link href={`/movies/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Poster
            src={movie.poster}
            alt={movie.title}
            color={movie.posterColor}
            className="h-full w-full transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 font-semibold text-zinc-900 dark:text-zinc-50">
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{movie.year}</span>
            <span>·</span>
            <span>{movie.genres[0]}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
