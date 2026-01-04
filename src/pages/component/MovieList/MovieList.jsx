import React from "react";
import styles from "./MovieList.module.css";
import MovieListItem from "./MovieListItem";
import MovieDetail from "../MovieDetail/MovieDetail";

function MovieList({
  movie,
  IMAGE_BASE_URL,
  curMovie,
  setCurMovie,
  setIsSelected,
  isSelected,
  API_KEY,
}) {
  const categories = [
    { movies: movie.trending, title: "Xu hướng" },
    { movies: movie.topRated, title: "Xếp hạng cao" },
    { movies: movie.action, title: "Hành động" },
    { movies: movie.comedy, title: "Hài" },
    { movies: movie.horror, title: "Kinh dị" },
    { movies: movie.romance, title: "Lãng mạn" },
    { movies: movie.documentaries, title: "Tài liệu" },
  ];

  return (
    <div className={styles.movieList}>
      <div className={styles.original}>
        <ul>
          {movie?.originals?.results?.map((original) => {
            return (
              <li
                key={original.id}
                onClick={() => {
                  if (original.id === curMovie?.id) {
                    setIsSelected((prev) => !prev);
                  } else {
                    setCurMovie(original);
                    setIsSelected(true);
                  }
                }}
              >
                <img
                  src={`${IMAGE_BASE_URL}${original["poster_path"]}`}
                  alt={original.title || original.name}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {categories.map((cat) => (
        <React.Fragment key={cat.title}>
          <MovieListItem
            movies={cat.movies}
            title={cat.title}
            IMAGE_BASE_URL={IMAGE_BASE_URL}
            curMovie={curMovie}
            setCurMovie={setCurMovie}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
          {isSelected &&
            curMovie &&
            cat.movies?.results?.some((m) => m.id === curMovie.id) && (
              <MovieDetail
                API_KEY={API_KEY}
                movieData={curMovie}
                isSelected={isSelected}
              />
            )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default MovieList;
