import MovieCard from "../components/MovieCard";

const MOVIES = [
  { id: "tt0111161", title: "The Shawshank Redemption", year: 1994 },
  { id: "tt0068646", title: "The Godfather", year: 1972 },
  { id: "tt0468569", title: "The Dark Knight", year: 2008 },
];

export default function MoviesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOVIES.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
