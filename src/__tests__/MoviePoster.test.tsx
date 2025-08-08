import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MoviePoster from "@components/MoviePoster";

describe("MoviePoster", () => {
  const mockProps = {
    title: "Test Movie",
    imageUrl: "https://example.com/test.jpg",
  };

  it("renders the movie poster image", () => {
    render(<MoviePoster {...mockProps} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProps.imageUrl);
    expect(img).toHaveAttribute("alt", `${mockProps.title} poster`);
  });

  it("shows fallback when image fails to load", () => {
    render(<MoviePoster {...mockProps} />);
    const img = screen.getByRole("img");
    img.dispatchEvent(new Event("error"));
    expect(img.style.display).toBe("none");
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText("movie")).toBeInTheDocument();
  });
});
