import React, { useState } from "react";
import styles from "./ResultList.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";

function ResultList({
  searchResults,
  IMAGE_BASE_URL,
  isSelected,
  setIsSelected,
  curMovie,
  setCurMovie,
  API_KEY,
}) {
  // tìm ra ô phải chèn video trailer
  const [index, setIndex] = useState(0);
  const columns = 9;
  const endOfRowRaw = Math.floor(index / columns) * columns + (columns - 1);
  const endOfRow =
    endOfRowRaw >= searchResults.length
      ? searchResults.length - 1
      : endOfRowRaw;
  return (
    <div className={styles.resultList}>
      <h2>Search Result</h2>
      <ul>
        {searchResults?.map((movie, i) => {
          return (
            <React.Fragment key={movie.id}>
              <li
                key={movie.id}
                onClick={() => {
                  if (curMovie?.id === movie.id) {
                    setIsSelected((prev) => !prev);
                  } else {
                    setCurMovie(movie);
                    setIsSelected(true);
                    setIndex(i);
                  }
                }}
              >
                <img
                  src={`${IMAGE_BASE_URL}${movie["poster_path"]}`}
                  alt={movie.title || movie.name}
                />
              </li>
              {isSelected && i === endOfRow && (
                <li className={styles.movieDetail}>
                  <MovieDetail
                    API_KEY={API_KEY}
                    movieData={curMovie}
                    isSelected={isSelected}
                  ></MovieDetail>
                </li>
              )}
            </React.Fragment>
          );
        })}
        {isSelected &&
          index >= Math.floor(index / columns) * columns &&
          index === searchResults.length - 1 && (
            <li className={styles.movieDetail}>
              <MovieDetail API_KEY={API_KEY} movieData={curMovie} />{" "}
            </li>
          )}
      </ul>
    </div>
  );
}

export default ResultList;
