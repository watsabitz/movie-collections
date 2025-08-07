import type { FC } from "react";

interface MoviePosterProps {
  title: string;
  imageUrl: string;
}

const MoviePoster: FC<MoviePosterProps> = ({ title, imageUrl }) => {
  return (
    <div className="w-full h-[400px] bg-gray-200 relative">
      <img
        src={imageUrl}
        alt={`${title} poster`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement?.classList.add("fallback");
        }}
      />
      <div className="hidden fallback:flex absolute inset-0 items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <span className="material-icons text-4xl mb-2">movie</span>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
