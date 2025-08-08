import type { FC } from "react";
import Navigation from "@components/Navigation";
import MoviePoster from "@components/MoviePoster";
import type { Movie } from "@app-types/movie";

const starWarsMovies: ReadonlyArray<Movie> = [
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    poster: "https://picsum.photos/seed/starwars-episode4/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/1a202c/ffffff?text=Star+Wars+IV",
      "https://picsum.photos/seed/starwars-episode4/400/600",
    ],
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
    description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    poster: "https://picsum.photos/seed/starwars-episode5/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/2d3748/ffffff?text=Star+Wars+V",
      "https://picsum.photos/seed/starwars-episode5/400/600",
    ],
  },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
    description:
      "After rescuing Han Solo from Jabba the Hutt, the Rebels attempt to destroy the second Death Star.",
    poster: "https://picsum.photos/seed/starwars-episode6/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/4a5568/ffffff?text=Star+Wars+VI",
      "https://picsum.photos/seed/starwars-episode6/400/600",
    ],
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
              <MoviePoster
                title={movie.title}
                poster={movie.poster}
                posterSources={movie.posterSources}
              />
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
