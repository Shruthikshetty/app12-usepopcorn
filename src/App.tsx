import { useEffect, useState } from "react";
import Main from "./components/main/Main";
import NavBar from "./components/navbar/NavBar";
import NumResults from "./components/navbar/NumResults";
import Search from "./components/navbar/Search";
import Box from "./components/main/Box";
import MovieList from "./components/main/MovieList";
import WatchedSummary from "./components/main/WatchedSummary";
import WatchedMovieList from "./components/main/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import { MovieDetails, watchedMovieType } from "./components/main/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const average = (arr: any) =>
  arr.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, cur: any, i: any, arr: any) => acc + cur / arr.length,
    0
  );

export type watchedMoviesType = watchedMovieType[];

function App() {
  //prop drilling problem since we need this in both movie List and search component

  const [query, setQuery] = useState("dragon ball");
  const [selectedId, setSelectedId] = useState<null | string>(null);
  // using callback function to get the async storage data
  // this function must be a pure function and we can not pass any arguments
  // should not call a function in useState
  /*  const [watched, setWatched] = useState<watchedMoviesType>(() => {
    const storedValue: string = localStorage.getItem("watched") as string;
    return JSON.parse(storedValue);
  });
 */
  const [watched, setWatched] = useLocalStorageState<watchedMoviesType>(
    [],
    "watched"
  );

  //custom hook to fetch movie data
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // Function to handle selecting a movie by its ID
  // functopn declarations are hoisted
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
    /* //local storage
    localStorage.setItem("watched", JSON.stringify([...watched, movie])); */
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
