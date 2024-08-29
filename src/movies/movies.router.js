const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Import theaters and reviews routers
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// Movies routes
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

// Nested routes for theaters and reviews
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

module.exports = router;
