import css from "./MovieGrid.module.css";

import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <>
      {movies.length > 0 && (
        <ul className={css.grid}>
          {/* Набір елементів списку з фільмами */}
          {movies.map((movie) => (
            <li key={movie.id}>
              <div className={css.card} onClick={() => onSelect(movie)}>
                <img
                  className={css.image}
                  src={IMAGE_BASE_URL + `w500${movie.poster_path}`}
                  alt="title"
                  loading="lazy"
                />
                <h2 className={css.title}>{movie.title}</h2>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
