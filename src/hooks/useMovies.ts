import axios from "axios";
import { useEffect, useState } from "react";

export function useMovies(
  query: string,
  callback?: () => void
): UseMoviesReturnType {
  const [movies, setMovies] = useState<movieType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // will work after the initial render
  // convert yo async :)
  // in react 18 effects run twice due to strict mode
  useEffect(() => {
    //only called if it exist
    callback?.();

    const controller = new AbortController(); // browser api

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      await axios
        .get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        )
        .then((res) => {
          //in case no movie is found this is based on the res from api
          if (res.data.Response === "False") throw new Error("Movie Not Found");

          setMovies(res.data?.Search);
          /* setError("") */
        })
        .catch((err) => {
          if (err.name !== "CanceledError") {
            console.log("error in fetching movies : " + err);
            setError(err.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      // movies fetch will not be called
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

type movieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}[];

type UseMoviesReturnType = {
  movies: movieType;
  isLoading: boolean;
  error: string;
};
