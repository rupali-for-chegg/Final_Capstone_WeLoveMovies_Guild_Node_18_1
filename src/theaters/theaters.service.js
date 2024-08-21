const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function list() {
  return db("theaters as t")
      .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .select("m.*", "t.*", "mt.is_showing", "mt.theater_id as mt_theater_id")
      .then(reduceMovies);
}

async function listTheatersForMovie(movieId) {
  return db("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .select("t.*", "mt.*")
      .where({ "mt.movie_id": movieId });
}

module.exports = {
  list,
  listTheatersForMovie,
};