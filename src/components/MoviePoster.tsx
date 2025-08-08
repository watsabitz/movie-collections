import type { FC, ImgHTMLAttributes } from "react";
import { useState, useCallback, useMemo } from "react";

export interface MoviePosterProps {
  /** The movie title used for alt text and fallback display */
  readonly title: string;
  /** Primary poster image URL */
  readonly poster?: string;
  /** Alternative image URL (for backward compatibility) */
  readonly imageUrl?: string;
  /** Array of additional poster source URLs to try in order */
  readonly posterSources?: readonly string[];
  /** Additional CSS classes to apply to the figure element */
  readonly className?: string;
  /** Additional props to spread onto the img element */
  readonly imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
  /** Maximum number of retry attempts per image source */
  readonly maxRetries?: number;
  /** Whether to show the like button */
  readonly showLikeButton?: boolean;
  /** Callback when like button is clicked */
  readonly onLike?: (title: string, likes: number) => void;
  /** Initial like count */
  readonly initialLikes?: number;
  /** Number of likes to add per click */
  readonly likesPerClick?: number;
}

const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#374151" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle">No Poster</text></svg>'
  );

/**
 * A React component that displays a movie poster with fallback handling.
 * Supports multiple image sources with retry logic and graceful degradation.
 *
 * @param title - The movie title used for alt text and fallback display
 * @param poster - Primary poster image URL
 * @param imageUrl - Alternative image URL
 * @param posterSources - Array of additional poster source URLs
 * @param className - Additional CSS classes to apply to the figure element
 * @param imgProps - Additional props to spread onto the img element
 * @param maxRetries - Maximum number of retry attempts per image source (default: 2)
 *
 * @returns A figure element containing the movie poster image with fallback UI
 *
 * @example
 * ```tsx
 * <MoviePoster
 *   title="The Matrix"
 *   poster="https://example.com/matrix-poster.jpg"
 *   posterSources={["https://backup1.com/poster.jpg", "https://backup2.com/poster.jpg"]}
 *   maxRetries={3}
 *   className="rounded-lg shadow-md"
 * />
 * ```
 *
 * @remarks
 * - Automatically cycles through available image sources on load failure
 * - Implements retry logic with cache-busting query parameters
 * - Shows a fallback UI with movie icon and title when all sources fail
 * - Resets state when props change to ensure fresh loading attempts
 * - Uses lazy loading for better performance
 */
const MoviePoster: FC<MoviePosterProps> = ({
  title,
  poster,
  imageUrl,
  posterSources,
  className = "",
  imgProps,
  maxRetries = 2,
  showLikeButton = false,
  onLike,
  initialLikes = 0,
  likesPerClick = 1,
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
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

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

  const handleLikeToggle = useCallback(() => {
    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? likes + 1 : Math.max(0, likes - 1);
    setIsLiked(newIsLiked);
    setLikes(newLikes);
    onLike?.(title, newLikes);
  }, [isLiked, likes, onLike, title]);

  const handleLikeClick = useCallback(() => {
    const newLikes = likes + likesPerClick;
    setLikes(newLikes);
    onLike?.(title, newLikes);
  }, [likes, onLike, title, likesPerClick]);

  return (
    <figure
      className={`relative w-full aspect-[2/3] bg-gradient-to-br from-fuchsia-100 to-pink-100 overflow-hidden group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
      aria-label={`Poster for ${title}`}
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

      {/* Like Button with Thumbs Up Icon */}
      {showLikeButton && (
        <div
          className={`absolute bottom-3 left-3 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 ${
            likes > 0 ? "animate-pulse" : ""
          }`}
        >
          {likes > 0 && (
            <span className="text-sm font-bold text-fuchsia-700 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full mb-2 shadow-lg border border-fuchsia-200 pointer-events-none">
              {likes}
            </span>
          )}
          <button
            onClick={handleLikeClick}
            className="transform hover:scale-110 transition-all duration-300"
            aria-label={`Like ${title} (+${likesPerClick})`}
            type="button"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                likes > 0
                  ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white scale-110"
                  : "bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </figure>
  );
};

export default MoviePoster;
