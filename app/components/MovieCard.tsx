import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  year?: number;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      {movie.year && <p className="text-sm text-zinc-500">{movie.year}</p>}
      <Link
        href={`/movies/${movie.id}`}
        className="mt-3 inline-block text-sm text-blue-600 underline"
      >
        View reviews
      </Link>
    </div>
  );
}
