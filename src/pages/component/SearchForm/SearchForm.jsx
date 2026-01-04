import React, { useEffect, useState } from "react";
import styles from "./SearchForm.module.css";

function SearchForm({
  searchTerm,
  searchResults,
  API_KEY,
  setSearchResults,
  setSearchTerm,
}) {
  // searchHandler
  async function searchHandler() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("failed to fetch");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={styles.searchForm}>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
          }}
        />
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="24"
          height="24"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
        <div className={styles.button}>
          <button
            type="reset"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            Reset
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              searchHandler();
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
