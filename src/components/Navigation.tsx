import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Movie Collections</div>
        <div className="space-x-4">
          <Link
            to="/"
            className={`hover:text-gray-300 ${
              location.pathname === "/" ? "text-yellow-400" : ""
            }`}
          >
            Star Wars
          </Link>
          <Link
            to="/star-trek"
            className={`hover:text-gray-300 ${
              location.pathname === "/star-trek" ? "text-yellow-400" : ""
            }`}
          >
            Star Trek
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
