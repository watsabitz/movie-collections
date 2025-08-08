import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            🎬 Movie Collections
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 backdrop-blur-sm ${
                location.pathname === "/"
                  ? "bg-white text-fuchsia-600 shadow-lg scale-105"
                  : "text-white/90 hover:text-white"
              }`}
            >
              ⭐ Star Wars
            </Link>
            <Link
              to="/star-trek"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 backdrop-blur-sm ${
                location.pathname === "/star-trek"
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "text-white/90 hover:text-white"
              }`}
            >
              🚀 Star Trek
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
