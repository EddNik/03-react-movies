import css from "./MovieGrid.module.css";

import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <>
      {movies.length > 0 && (
        <ul className={css.grid}>
          {/* Набір елементів списку з фільмами */}
          {movies.map(({ title, id }) => (
            <li key={id}>
              <div className={css.card}>
                <img
                  className={css.image}
                  src="https://image.tmdb.org/t/p/w500/poster-path"
                  alt="title"
                  loading="lazy"
                />
                <h2 className={css.title}>{title}</h2>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
