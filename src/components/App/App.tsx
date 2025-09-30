import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setIsError(false);
  };

  const handleSelectMovie = (movie: Movie | null) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!query) return;
    async function handleSearch() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMovies(query);

        if (Array.isArray(data) && data.length === 0) {
          toast.error("No movies found for your request");
          return;
        }
        setMovies(data);
      } catch {
        setIsError(true);
        toast.error("Something went wrong connecting to the server");
      } finally {
        setIsLoading(false);
      }
    }

    handleSearch();

    // Функція очищення
    return () => {
      setMovies([]);
    };
  }, [query]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isError && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
      {isModalOpen && (
        <MovieModal selectedMovie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "10px",
            maxWidth: "100%",
          },
        }}
      />
    </>
  );
}
