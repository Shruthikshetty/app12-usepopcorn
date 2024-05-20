type NumResultsProps = {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
};

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
