import type { FC, ImgHTMLAttributes } from "react";
import { useState, useCallback, useMemo } from "react";

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
  /** Maximum number of retry attempts (default: 2) */
  maxRetries?: number;
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
  maxRetries = 2,
}) => {
  // Memoize candidates array to prevent unnecessary recalculations
  const candidates = useMemo((): readonly string[] => {
    const sources: string[] = [
      ...(posterSources ?? []),
      ...(poster ? [poster] : []),
      ...(imageUrl ? [imageUrl] : []),
    ].filter(Boolean);

    // Always ensure we have at least the fallback
    return sources.length > 0 ? sources : [FALLBACK_SVG];
  }, [posterSources, poster, imageUrl]);

  // Track current source index and retry attempts
  const [currentIndex, setCurrentIndex] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);

  // Handle image load errors with proper state management
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const imgElement = e.currentTarget;

      // Try retry on same source first
      if (retryCount < maxRetries) {
        setRetryCount((prev) => prev + 1);
        // Force reload by adding timestamp
        const currentSrc = candidates[currentIndex];
        if (currentSrc && currentSrc !== FALLBACK_SVG) {
          const separator = currentSrc.includes("?") ? "&" : "?";
          imgElement.src = `${currentSrc}${separator}retry=${retryCount + 1}`;
          return;
        }
      }

      // Reset retry count and try next candidate
      setRetryCount(0);
      if (currentIndex < candidates.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        return;
      }

      // All candidates exhausted - show fallback UI
      setHasFailed(true);
      imgElement.style.display = "none";
    },
    [candidates, currentIndex, retryCount, maxRetries]
  );

  // Reset state when candidates change
  const resetState = useCallback(() => {
    setCurrentIndex(0);
    setRetryCount(0);
    setHasFailed(false);
  }, []);

  // Reset when props change
  useMemo(() => {
    resetState();
  }, [resetState]);

  const currentSrc = candidates[currentIndex] || FALLBACK_SVG;
  const fallbackClasses = hasFailed ? "fallback-active" : "";

  return (
    <figure
      className={`w-full h-[400px] bg-gray-200 relative ${className} ${fallbackClasses}`}
      aria-label={`${title} poster`}
    >
      <img
        src={currentSrc}
        alt={`${title} poster`}
        className="w-full h-full object-cover transition-opacity duration-200"
        loading="lazy"
        onError={handleImageError}
        style={{
          display: hasFailed ? "none" : "block",
        }}
        {...imgProps}
      />
      <div
        className={`
          pointer-events-none absolute inset-0 flex flex-col items-center justify-center 
          text-gray-500 transition-opacity duration-200
          ${hasFailed ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden={!hasFailed}
      >
        <span className="material-icons text-4xl mb-2" aria-hidden="true">
          movie
        </span>
        <p className="text-center px-4">{title}</p>
        <p className="text-xs text-gray-400 mt-1">Poster unavailable</p>
      </div>
    </figure>
  );
};

export default MoviePoster;
