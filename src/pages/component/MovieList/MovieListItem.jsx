import React from "react";
import styles from "./MovieListItem.module.css";

function MovieListItem({
  title,
  movies,
  IMAGE_BASE_URL,
  curMovie,
  setCurMovie,
  setIsSelected,
  isSelected,
}) {
  return (
    <div className={styles.movieListItem}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <ul>
          {movies?.results?.map((movie) => {
            return (
              <li
                key={movie.id}
                onClick={() => {
                  if (movie.id === curMovie?.id) {
                    setIsSelected(!isSelected);
                  } else {
                    setCurMovie(movie);
                    setIsSelected(true);
                  }
                }}
              >
                <img
                  src={`${IMAGE_BASE_URL}${movie["backdrop_path"]}`}
                  alt={movie.title}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MovieListItem;
