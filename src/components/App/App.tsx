import { useState } from "react";
import toast from "react-hot-toast";

import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  // if (Array.isArray(response.data.hits) && response.data.hits.length === 0) {
  //   toast.error("Please enter your search query.", { position: "top-right" });
  //   return;
  // }

  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleSearch(movieName: string) {
    // Тут будемо виконувати HTTP-запит

    const queryMovies = await fetchMovies(movieName);

    setMovies(queryMovies);
    // console.log(queryMovies);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} />
    </>
  );
}
