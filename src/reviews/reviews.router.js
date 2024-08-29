const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route to handle all reviews
router
    .route("/")
    .get(controller.list)  // List all reviews
    .all(methodNotAllowed);

// Route to handle reviews for a specific movie
router
    .route("/movies/:movieId/reviews")
    .get(controller.listReviewsForMovie) // List reviews for a specific movie
    .all(methodNotAllowed);

// Routes for specific review operations
router
    .route("/:reviewId")
    .delete(controller.destroy)
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router;
