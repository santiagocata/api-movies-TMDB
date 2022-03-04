import Grilla from "./Grid";

import React, { useEffect, useContext } from "react";

import { MoviesContext } from "../contexts/MoviesContext";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function Favorites() {
  const { movies, setMovies } = useContext(MoviesContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.favorites) return;
    Promise.all(
      user.favorites.map((movieId) => {
        return axios.get(`api/movies/${movieId}`).then((res) => {
          return res.data;
        });
      })
    ).then((data) => {
      setMovies(data);
    });
  }, [user.favorites]);

  return <Grilla movies={movies} />;
}
