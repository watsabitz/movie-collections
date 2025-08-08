import Navigation from "../components/Navigation";
import MoviePoster from "../components/MoviePoster";

interface TrekMovie {
  title: string;
  year: number;
  description: string;
  poster: string;
  posterSources?: string[];
}

const starTrekMovies: ReadonlyArray<TrekMovie> = [
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

const StarTrekPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Star Trek Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {starTrekMovies.map((movie) => (
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

export default StarTrekPage;
