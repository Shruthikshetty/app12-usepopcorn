import Movie from "./Movie";

type MovieListprops = {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
};

export default function MovieList({ movies }: MovieListprops) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
