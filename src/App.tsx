import { useEffect, useState } from "react";
import Main from "./components/main/Main";
import NavBar from "./components/navbar/NavBar";
import NumResults from "./components/navbar/NumResults";
import Search from "./components/navbar/Search";
import Box from "./components/main/Box";
import MovieList from "./components/main/MovieList";
import WatchedSummary from "./components/main/WatchedSummary";
import WatchedMovieList from "./components/main/WatchedMovieList";
import axios from "axios";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import { MovieDetails, watchedMovieType } from "./components/main/MovieDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const average = (arr: any) =>
  arr.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, cur: any, i: any, arr: any) => acc + cur / arr.length,
    0
  );

type movieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}[];

export type watchedMoviesType = watchedMovieType[];

function App() {
  //prop drilling problem since we need this in both movie List and search component
  const [movies, setMovies] = useState<movieType>([]);
  const [watched, setWatched] = useState<watchedMoviesType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("dragon ball");
  const [selectedId, setSelectedId] = useState<null | string>(null);

  // will work after the initial render
  // convert yo async :)
  // in react 18 effects run twice due to strict mode
  useEffect(() => {
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
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  // Function to handle selecting a movie by its ID
  function handleSelectMovie(movieId: string) {
    setSelectedId((s) => (s === movieId ? null : movieId));
  }

  // Function to handle closing a selected movie
  function handleCloseMovie() {
    setSelectedId(null);
  }

  // Function to add a watched movie to the list of watched movies
  function handleAddWatched(movie: watchedMovieType) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((s) => s.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      {/* fixing prop drilling issue by using component composition */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
