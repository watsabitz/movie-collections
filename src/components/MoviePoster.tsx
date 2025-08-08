import type { FC, ImgHTMLAttributes } from "react";

export interface MoviePosterProps {
  /** Movie title for accessibility */
  title: string;
  /** Poster image URL (preferred prop) */
  poster?: string;
  /** Deprecated legacy prop name kept for backward compatibility */
  imageUrl?: string;
  /** Optional list of alternative poster URLs to try (in order) */
  posterSources?: readonly string[];
  /** Extra class names */
  className?: string;
  /** Additional img props except src/alt */
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
}

const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#374151" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle">No Poster</text></svg>'
  );

const MoviePoster: FC<MoviePosterProps> = ({
  title,
  poster,
  imageUrl,
  posterSources,
  className = "",
  imgProps,
}) => {
  // Build ordered list of candidate sources: explicit posterSources, then poster/imageUrl, then fallback
  const candidates: string[] = [
    ...(posterSources ?? []),
    ...(poster ? [poster] : []),
    ...(imageUrl ? [imageUrl] : []),
  ].filter(Boolean);
  if (!candidates.length) candidates.push(FALLBACK_SVG);

  // We'll mutate index via closure in onError
  let currentIndex = 0;
  const initialSrc = candidates[0];
  return (
    <figure
      className={`w-full h-[400px] bg-gray-200 relative ${className}`}
      aria-label={`${title} poster`}
    >
      <img
        src={initialSrc}
        alt={`${title} poster`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Try next candidate if available
          if (currentIndex < candidates.length - 1) {
            currentIndex += 1;
            e.currentTarget.src = candidates[currentIndex];
            return;
          }
          // Exhausted candidates – show fallback
          if (e.currentTarget.src !== FALLBACK_SVG) {
            e.currentTarget.src = FALLBACK_SVG;
          }
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement?.classList.add("fallback-active");
        }}
        {...imgProps}
      />
      <div className="pointer-events-none opacity-0 transition-opacity duration-200 absolute inset-0 flex flex-col items-center justify-center text-gray-500 fallback-active:opacity-100">
        <span className="material-icons text-4xl mb-2">movie</span>
        <p>{title}</p>
      </div>
    </figure>
  );
};

export default MoviePoster;
