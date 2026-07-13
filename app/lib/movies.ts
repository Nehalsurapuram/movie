import type { Movie } from "./types";

// Self-contained catalog. Poster URLs point at TMDB's public image CDN and
// gracefully fall back to a generated gradient (see posterColor) when offline.
const IMG = "https://image.tmdb.org/t/p/w500";
const BG = "https://image.tmdb.org/t/p/w780";

export const MOVIES: Movie[] = [
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    year: 1994,
    genres: ["Drama", "Crime"],
    runtime: 142,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: `${IMG}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,
    backdrop: `${BG}/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg`,
    posterColor: "#3b5249",
    featured: true,
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    year: 1972,
    genres: ["Drama", "Crime"],
    runtime: 175,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    synopsis:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: `${IMG}/3bhkrj58Vtu7enYsRolD1fZdja1.jpg`,
    backdrop: `${BG}/tmU7GeKVybMWFButWEGl2M4GeiP.jpg`,
    posterColor: "#4a3b28",
    featured: true,
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: `${IMG}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,
    backdrop: `${BG}/hqkIcbrOHL86UncnHIsHVcVmzue.jpg`,
    posterColor: "#1c2733",
    featured: true,
  },
  {
    id: "tt0110912",
    title: "Pulp Fiction",
    year: 1994,
    genres: ["Thriller", "Crime"],
    runtime: 154,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster: `${IMG}/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg`,
    backdrop: `${BG}/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg`,
    posterColor: "#3a2a2a",
  },
  {
    id: "tt1375666",
    title: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi", "Adventure"],
    runtime: 148,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    synopsis:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: `${IMG}/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg`,
    backdrop: `${BG}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
    posterColor: "#22303a",
    featured: true,
  },
  {
    id: "tt0137523",
    title: "Fight Club",
    year: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    synopsis:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    poster: `${IMG}/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg`,
    backdrop: `${BG}/hZkgoQYus5vegHoetLkCJzb17zJ.jpg`,
    posterColor: "#3a1f1f",
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    year: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    synopsis:
      "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an I.Q. of 75.",
    poster: `${IMG}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
    backdrop: `${BG}/7c9UVPPiTPltouxRVY6N9uugaVA.jpg`,
    posterColor: "#2f3a2a",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    year: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: `${IMG}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdrop: `${BG}/xJHokMbljvjADYdit5fK5VQsXEG.jpg`,
    posterColor: "#20272f",
    featured: true,
  },
  {
    id: "tt0133093",
    title: "The Matrix",
    year: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    synopsis:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: `${IMG}/p96dm7sCMn4VYAStA6siNz30G1r.jpg`,
    backdrop: `${BG}/icmmSD4vTTDKOq2vvdulafOGw93.jpg`,
    posterColor: "#1c2a1c",
  },
  {
    id: "tt0167260",
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    genres: ["Adventure", "Fantasy", "Drama"],
    runtime: 201,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    poster: `${IMG}/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg`,
    backdrop: `${BG}/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg`,
    posterColor: "#2a2416",
  },
  {
    id: "tt0114369",
    title: "Se7en",
    year: 1995,
    genres: ["Crime", "Mystery", "Thriller"],
    runtime: 127,
    director: "David Fincher",
    cast: ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"],
    synopsis:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    poster: `${IMG}/6yoghtyTpznpBik8EngEmJskVUO.jpg`,
    backdrop: `${BG}/ba4CpvnaxvAgff2jHiaqJrVpZJ5.jpg`,
    posterColor: "#26221f",
  },
  {
    id: "tt0088763",
    title: "Back to the Future",
    year: 1985,
    genres: ["Adventure", "Comedy", "Sci-Fi"],
    runtime: 116,
    director: "Robert Zemeckis",
    cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"],
    synopsis:
      "Marty McFly is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Doc Brown.",
    poster: `${IMG}/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg`,
    backdrop: `${BG}/fq3wyOs1RHyz2yfzsb4sck7aWRG.jpg`,
    posterColor: "#2a2a3a",
  },
];

export function getMovie(id: string): Movie | undefined {
  return MOVIES.find((m) => m.id === id);
}

export function allGenres(): string[] {
  const set = new Set<string>();
  MOVIES.forEach((m) => m.genres.forEach((g) => set.add(g)));
  return Array.from(set).sort();
}
