type Movieprops = {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  };
  onSelectMovie: (movieId: string) => void;
};

export default function Movie({ movie, onSelectMovie }: Movieprops) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
