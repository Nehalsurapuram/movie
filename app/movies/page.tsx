import { getMovies, allGenres } from "../lib/movies";
import MovieBrowser from "../components/MovieBrowser";

export const metadata = {
  title: "Browse movies — MovieReviews",
};

export default async function MoviesPage() {
  const movies = await getMovies();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Browse movies</h1>
      <MovieBrowser movies={movies} genres={allGenres(movies)} />
    </div>
  );
}
