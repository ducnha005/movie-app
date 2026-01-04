import React, { useEffect, useState } from "react";
import styles from "./Browse.module.css";
import Navbar from "../component/Navbar/Navbar";
import Banner from "../component/Banner/Banner";
import MovieList from "../component/MovieList/MovieList";

function Browse() {
  const API_KEY = "13b2fccca48e8e9c5415b66d61ff1dd6";
  const BASE_URL = "https://api.themoviedb.org/3";
  const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  const [movie, setMovie] = useState({});
  const [banner, setBanner] = useState({});
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const [curMovie, setCurMovie] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  //lấy dữ liệu
  useEffect(() => {
    async function fetchMovie() {
      try {
        const urlsEndpoints = [
          requests.fetchTrending,
          requests.fetchNetflixOriginals,
          requests.fetchTopRated,
          requests.fetchActionMovies,
          requests.fetchComedyMovies,
          requests.fetchHorrorMovies,
          requests.fetchRomanceMovies,
          requests.fetchDocumentaries,
          requests.fetchSearch,
        ];
        const responses = await Promise.all(
          urlsEndpoints.map((url) => fetch(`${BASE_URL}${url}`))
        );
        responses.forEach((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
        });

        const data = await Promise.all(responses.map((res) => res.json()));
        setMovie({
          trending: data[0],
          originals: data[1],
          topRated: data[2],
          action: data[3],
          comedy: data[4],
          horror: data[5],
          romance: data[6],
          documentaries: data[7],
          search: data[8],
        });
      } catch (err) {
        console.error(err.message);
        return [];
      }
    }
    fetchMovie();
  }, []);

  //tạo banner
  useEffect(() => {
    if (movie?.originals?.results?.length > 0) {
      setBanner(
        movie.originals.results[
          Math.floor(Math.random() * movie.originals.results.length)
        ]
      );
    }
  }, [movie]);

  return (
    <div className={styles.browse}>
      <Navbar></Navbar>
      <Banner banner={banner} IMAGE_BASE_URL={IMAGE_BASE_URL}></Banner>
      <MovieList
        movie={movie}
        IMAGE_BASE_URL={IMAGE_BASE_URL}
        setCurMovie={setCurMovie}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
        curMovie={curMovie}
        API_KEY={API_KEY}
      ></MovieList>
    </div>
  );
}

export default Browse;
