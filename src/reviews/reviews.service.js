const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

async function destroy(reviewId) {
  return db(tableName).where({ review_id: reviewId }).del();
}

async function list(movieId) {
  // Ensure the parameter name matches the one used in the query
  return db(tableName).select("*").where({ movie_id: movieId });
}

async function read(reviewId) {
  return db(tableName).select("*").where({ review_id: reviewId }).first();
}

async function readCritic(criticId) {
  return db("critics").where({ critic_id: criticId }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
      .where({ review_id: review.review_id })
      .update(review, "*")
      .then(() => read(review.review_id))
      .then(setCritic);
}

async function listReviewsForMovie(movieId) {
  // Ensure the column names are correct and exist in the database
  const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  });

  const reviews = await db("reviews as r")
      .select("r.*", "c.preferred_name", "c.surname", "c.organization_name") // Select specific columns
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where("r.movie_id", movieId); // Make sure to use correct column reference

  return reviews.map(addCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
  listReviewsForMovie,
};
