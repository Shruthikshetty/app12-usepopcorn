import axios from "axios";
import { useEffect, useState } from "react";
import StartRating from "../StarRating";
import Loader from "../Loader";
import { watchedMoviesType } from "../../App";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetailsType>();
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  // Add event listener to close the selected movie when the "Escape" key is pressed
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("Closing");
      }
    }
    document.addEventListener("keydown", callback);

    // cleaning up
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]); // why?

  useEffect(() => {
    async function fetchDetails() {
      setIsLoading(true);
      await axios
        .get(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }`
        )
        .then((res) => {
          setMovie(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("error fetching data :" + err.message);
        });
    }
    fetchDetails();
  }, [selectedId]);

  function handleAdd() {
    if (movie) {
      const newWatchedMovie: watchedMovieType = {
        imdbId: selectedId,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        imdbRating: Number(movie.imdbRating),
        runtime: Number(movie.Runtime.split(" ")[0]),
        /* runtime: Number(movie.Runtime.match(/\d+/)?.[0] || 0), */
        userRating,
      };
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  }

  // Update the document title with the movie title when it changes
  useEffect(() => {
    if (!movie?.Title) return;
    document.title = `MOVIE | ${movie?.Title}`;

    // cleanUp function
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie?.Title]);

  if (movie) {
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button type="button" className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={movie.Poster} alt={`Poster of movie ${movie.Poster}`} />
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>
                  {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐</span>
                  {movie.imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StartRating
                      maxRating={10}
                      size={27}
                      onSetRating={setUserRating}
                    ></StartRating>

                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>You have Rated this movie {watchedUserRating} ⭐</p>
                )}
              </div>
              <p>
                <em>{movie.Plot}</em>
              </p>
              <p>Starring {movie.Actors}</p>
              <p>Directed by {movie.Director}</p>
            </section>
          </>
        )}
      </div>
    );
  }
}

type MovieDetailsProps = {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: watchedMovieType) => void;
  watched: watchedMoviesType;
};

type MovieDetailsType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type watchedMovieType = {
  imdbId: string;
  title: string;
  year: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: number;
};
