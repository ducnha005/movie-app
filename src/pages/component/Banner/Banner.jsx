import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";

function Banner({ banner, IMAGE_BASE_URL }) {
  return (
    <div className={styles.banner}>
      <img
        className={styles.img}
        src={`${IMAGE_BASE_URL}${banner["backdrop_path"]}`}
        alt=""
      />
      <div className={styles.description}>
        <h1>{banner.name}</h1>
        <div>
          <div className={styles.button}>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p>{banner.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
