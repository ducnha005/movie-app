import React, { useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import styles from "./Search.module.css";
import SearchForm from "../component/SearchForm/SearchForm";
import ResultList from "../component/ResultList/ResultList";
import MovieDetail from "../component/MovieDetail/MovieDetail";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [curMovie, setCurMovie] = useState({});
  const API_KEY = "13b2fccca48e8e9c5415b66d61ff1dd6";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles.search}>
      <Navbar></Navbar>
      <SearchForm
        searchTerm={searchTerm}
        searchResults={searchResults}
        API_KEY={API_KEY}
        setSearchResults={setSearchResults}
        setSearchTerm={setSearchTerm}
      ></SearchForm>
      <ResultList
        searchResults={searchResults}
        IMAGE_BASE_URL={IMAGE_BASE_URL}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        curMovie={curMovie}
        setCurMovie={setCurMovie}
        API_KEY={API_KEY}
      ></ResultList>
    </div>
  );
};

export default Search;
