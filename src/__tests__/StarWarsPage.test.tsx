import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarWarsPage from '../pages/StarWarsPage';

describe('StarWarsPage', () => {
  const renderPage = () => {
    return render(
      <BrowserRouter>
        <StarWarsPage />
      </BrowserRouter>
    );
  };

  it('renders the page title', () => {
    renderPage();
    expect(screen.getByText('Star Wars Movies')).toBeInTheDocument();
  });

  it('renders all movie cards', () => {
    renderPage();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    const movies = screen.getAllByRole('heading', { level: 2 });
    expect(movies).toHaveLength(3);
    expect(movies[0]).toHaveTextContent('Star Wars: Episode IV - A New Hope');
    expect(movies[1]).toHaveTextContent('Star Wars: Episode V - The Empire Strikes Back');
    expect(movies[2]).toHaveTextContent('Star Wars: Episode VI - Return of the Jedi');
  });

  it('displays movie details', () => {
    renderPage();
    const movieCards = screen.getAllByRole('article');
    expect(movieCards[0]).toBeInTheDocument();
    within(movieCards[0]).getByText('Released: 1977');
    within(movieCards[0]).getByText(/Luke Skywalker joins forces/);
  });
});
