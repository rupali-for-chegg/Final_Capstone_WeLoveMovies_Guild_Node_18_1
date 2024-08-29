const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route to handle all reviews
router
    .route("/")
    .get(controller.listReviewsForMovie)
    .all(methodNotAllowed);


// Routes for specific review operations
router
    .route("/:reviewId")
    .delete(controller.destroy)
    .put(controller.update)
    .all(methodNotAllowed);

// Routes for specific review operations
router
    .route("/reviews")
    .get(controller.list)
    .delete(controller.destroy)
    .put(controller.update)
    .all(methodNotAllowed);
module.exports = router;
