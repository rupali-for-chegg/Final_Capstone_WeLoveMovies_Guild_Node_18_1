const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Reviews routes
router
    .route("/:reviewId")
    .delete(controller.destroy)
    .put(controller.update)
    .all(methodNotAllowed);
router
    .route("/")
    .get(controller.listReviewsForMovie)
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;