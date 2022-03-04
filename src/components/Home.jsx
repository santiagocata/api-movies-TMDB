import Grilla from "./Grid"

import React, { useEffect, useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
  import axios from "axios";


export default function Home() {

  const { movies, setMovies } = useContext(MoviesContext);

  useEffect(() => {
    axios.get("api/movies/popular").then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
      <Grilla movies={movies}/>
  );
}