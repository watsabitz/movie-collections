/**
 * Represents a movie in the application
 */
export interface Movie {
  /** The full title of the movie */
  readonly title: string;
  /** The year the movie was released */
  readonly year: number;
  /** A brief description or plot summary of the movie */
  readonly description: string;
  /** URL to the movie's poster image */
  readonly poster: string;
}
