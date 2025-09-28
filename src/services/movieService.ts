import axios from "axios";

import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const URL = "https://api.themoviedb.org/3/search/movie";

// Типізація відповіді  локальна,   не експортується.
interface FetchMoviesResponse {
  results: Movie[];
}

// повертає проміс масиву фільмів. Обробка помилки буде у компоненті.
export async function fetchMovies(query: string): Promise<Movie[]> {
  const options = {
    params: { query: query, include_adult: false, language: "en-US" },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  const response = await axios<FetchMoviesResponse>(URL, options);
  return response.data.results;
}
