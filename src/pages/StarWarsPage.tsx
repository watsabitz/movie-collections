import Navigation from "../components/Navigation";
import MoviePoster from "../components/MoviePoster";
import type { Movie } from "../types/movie";
import type { FC, PropsWithChildren } from "react";

const starWarsMovies: ReadonlyArray<Movie> = [
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    poster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
    description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    poster: "https://image.tmdb.org/t/p/w500/7BuH8itoSrLExs2YZSsM01Qk2no.jpg",
  },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
    description:
      "After rescuing Han Solo from Jabba the Hutt, the Rebels attempt to destroy the second Death Star.",
    poster: "https://image.tmdb.org/t/p/w500/xxCnFmRZ83jHTZsBiceG6UqQ9gX.jpg",
  },
];

const StarWarsPage: FC<Record<never, never>> = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Star Wars Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {starWarsMovies.map((movie: Movie) => (
            <article
              key={`${movie.title}-${movie.year}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <MoviePoster title={movie.title} imageUrl={movie.poster} />
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-4">Released: {movie.year}</p>
                <p className="text-gray-700">{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarWarsPage;
