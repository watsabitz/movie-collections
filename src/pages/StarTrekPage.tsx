import type { FC } from "react";
import { useState, useCallback } from "react";
import Navigation from "@components/Navigation";
import MoviePoster from "@components/MoviePoster";
import type { Movie } from "@app-types/movie";

const starTrekMovies: ReadonlyArray<Movie> = [
  {
    title: "Star Trek: The Motion Picture",
    year: 1979,
    description:
      "When an alien spacecraft of enormous power is spotted approaching Earth, Admiral James T. Kirk resumes command of the Starship Enterprise.",
    poster: "https://picsum.photos/seed/startrek-motion-picture/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/1a202c/00d9ff?text=Star+Trek+TMP",
      "https://picsum.photos/seed/startrek-motion-picture/400/600",
    ],
  },
  {
    title: "Star Trek II: The Wrath of Khan",
    year: 1982,
    description:
      "Admiral James T. Kirk and his bridge crew risk their careers stealing the decommissioned Enterprise to return to the restricted Genesis Planet to recover Spock's body.",
    poster: "https://picsum.photos/seed/startrek-wrath-khan/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/2d3748/ff6b35?text=Star+Trek+II",
      "https://picsum.photos/seed/startrek-wrath-khan/400/600",
    ],
  },
  {
    title: "Star Trek III: The Search for Spock",
    year: 1984,
    description:
      "Admiral Kirk and his bridge crew risk their careers stealing the decommissioned Enterprise to return to the restricted Genesis Planet to recover Spock's body.",
    poster: "https://picsum.photos/seed/startrek-search-spock/400/600",
    posterSources: [
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=600&fit=crop&auto=format",
      "https://via.placeholder.com/400x600/4a5568/4fd1c7?text=Star+Trek+III",
      "https://picsum.photos/seed/startrek-search-spock/400/600",
    ],
  },
];

const StarTrekPage: FC<Record<never, never>> = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
          Star Trek Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {starTrekMovies.map((movie: Movie) => (
            <article
              key={`${movie.title}-${movie.year}`}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-purple-100"
            >
              <MoviePoster
                title={movie.title}
                poster={movie.poster}
                posterSources={movie.posterSources}
                showLikeButton={true}
                onLike={handleLikeUpdate}
                initialLikes={movieLikes[movie.title] || 0}
                likesPerClick={5}
              />
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-purple-600 mb-4 font-medium">
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

export default StarTrekPage;
