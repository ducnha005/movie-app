import React, { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import YouTube from "react-youtube";

function MovieDetail({ movieData, API_KEY, isSelected }) {
  const [videoKey, setVideoKey] = useState(null);
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    async function fetchVideo() {
      try {
        if (!movieData?.id) return;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const vidData = await response.json();

        if (vidData.results && vidData.results.length > 0) {
          //ưu tiên trailer
          const trailer = vidData.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          );
          //ko thì lấy teaser
          const teaser = vidData.results.find(
            (v) => v.site === "YouTube" && v.type === "Teaser"
          );

          if (trailer) {
            setVideoKey(trailer.key);
          } else if (teaser) {
            setVideoKey(teaser.key);
          } else {
            setVideoKey(null);
          }
        } else {
          setVideoKey(null);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchVideo();
  }, [movieData, API_KEY]);

  return (
    <div className={`${isSelected ? styles.movieDetail : styles.none}`}>
      <div>
        <h2>{movieData.title}</h2>
        <p>Release Date: {movieData.release_date}</p>
        <p>vote: {movieData.vote_average} / 10</p>
        <p>{movieData.overview}</p>
      </div>
      <div className={styles.video}>
        {videoKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoKey}`}
          ></iframe>
        ) : (
          <img
            src={
              movieData.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
                : "/placeholder.jpg"
            }
            alt={movieData.title || movieData.name}
            className={styles.backdrop}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
