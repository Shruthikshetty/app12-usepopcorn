import Movie from "./Movie";

type MovieListprops = {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
  onSelectMovie: (movieId: string) => void;
};

export default function MovieList({ movies, onSelectMovie }: MovieListprops) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
