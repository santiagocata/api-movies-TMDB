const express = require("express");
const router = express.Router();
const axios = require("axios");

const tmdbAPI = "https://api.themoviedb.org/3";
const key = "?api_key=150f8c450574e64a44aeb30c4268fb92";

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  axios
    .get(`${tmdbAPI}/movie/${id}${key}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

router.get("/popular", function (req, res, next) {
  axios
    .get(`${tmdbAPI}/movie/discover/movie?sort_by=popularity.desc${key}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

router.get("/search/:name", function (req, res, next) {
  const { name } = req.params;
  axios
    .get(`${tmdbAPI}/search/movie${key}&query=${name}&page=1`)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

module.exports = router;
