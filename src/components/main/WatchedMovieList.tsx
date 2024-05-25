import { watchedMovieType } from "./MovieDetails";
import WatchedMovie from "./WatchedMovie";

type WatchedMovieListProps = {
  watched: watchedMovieType[];
  onDeleteWatched: (id: string) => void;
};
export default function WatchedMovieList({
  watched,
  onDeleteWatched,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
