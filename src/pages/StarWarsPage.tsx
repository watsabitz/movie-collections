import type { FC } from "react";
import { useState, useCallback } from "react";
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
  // State to track likes for each movie
  const [movieLikes, setMovieLikes] = useState<Record<string, number>>({});

  // Handle like updates for individual movies
  const handleLikeUpdate = useCallback((movieTitle: string, likes: number) => {
    setMovieLikes((prev) => ({
      ...prev,
      [movieTitle]: likes,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-purple-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Star Wars Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {starWarsMovies.map((movie: Movie) => (
            <article
              key={`${movie.title}-${movie.year}`}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-fuchsia-100"
            >
              <MoviePoster
                title={movie.title}
                poster={movie.poster}
                posterSources={movie.posterSources}
                showLikeButton={true}
                onLike={handleLikeUpdate}
                initialLikes={movieLikes[movie.title] || 0}
                likesPerClick={3}
              />
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-fuchsia-600 mb-4 font-medium">
                  Released: {movie.year}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {movie.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarWarsPage;
