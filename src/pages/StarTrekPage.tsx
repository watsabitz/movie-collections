import Navigation from '../components/Navigation';
import MoviePoster from '../components/MoviePoster';

const starTrekMovies = [
  {
    title: "Star Trek: The Motion Picture",
    year: 1979,
    description: "When an alien spacecraft of enormous power is spotted approaching Earth, Admiral James T. Kirk resumes command of the Starship Enterprise.",
    poster: "https://image.tmdb.org/t/p/w500/wfiAfNwH6CMKxz4vRaW8CPTabfk.jpg"
  },
  {
    title: "Star Trek II: The Wrath of Khan",
    year: 1982,
    description: "Admiral James T. Kirk and his bridge crew risk their careers stealing the decommissioned Enterprise to return to the restricted Genesis Planet to recover Spock's body.",
    poster: "https://image.tmdb.org/t/p/w500/8Io4qkxI1kUm3ZsQHVYXTn3A0m8.jpg"
  },
  {
    title: "Star Trek III: The Search for Spock",
    year: 1984,
    description: "Admiral Kirk and his bridge crew risk their careers stealing the decommissioned Enterprise to return to the restricted Genesis Planet to recover Spock's body.",
    poster: "https://image.tmdb.org/t/p/w500/yqEj0oPUXVGXu1iI96QABQpqpKb.jpg"
  }
];

const StarTrekPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Star Trek Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {starTrekMovies.map((movie, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <MoviePoster title={movie.title} imageUrl={movie.poster} />
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-4">Released: {movie.year}</p>
                <p className="text-gray-700">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarTrekPage;
