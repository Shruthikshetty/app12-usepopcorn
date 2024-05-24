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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr: any) =>
  arr.reduce(
    (acc: any, cur: any, i: any, arr: any) => acc + cur / arr.length,
    0
  );

type movieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}[];

type watchedMoviesType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}[];

function App() {
  //prop drilling problem since we need this in both movie List and search component
  const [movies, setMovies] = useState<movieType>([]);
  const [watched, setWatched] = useState<watchedMoviesType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // will work after the initial render
  // convert yo async :)
  // in react 18 effects run twice due to strict mode
  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      await axios
        .get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=mona`
        )
        .then((res) => {
          //in case no movie is found this is based on the res from api
          if (res.data.Response === "False") throw new Error("Movie Not Found");

          setMovies(res.data.Search);
        })
        .catch((err) => {
          console.log("error in fetching movies : " + err.message);
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchMovies();
  }, []);

  return (
    <>
      {/* fixing prop drilling issue by using component composition */}
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
