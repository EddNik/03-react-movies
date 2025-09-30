import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { IMAGE_BASE_URL } from "../MovieGrid/MovieGrid";

interface MovieModalProps {
  selectedMovie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({
  onClose,
  selectedMovie,
}: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={IMAGE_BASE_URL + `original/${selectedMovie?.backdrop_path}`}
          alt={selectedMovie?.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{selectedMovie?.title}</h2>
          <p>{selectedMovie?.overview}</p>
          <p>
            <strong>Release Date:</strong> {selectedMovie?.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {selectedMovie?.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
