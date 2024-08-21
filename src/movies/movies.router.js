const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Import theaters and reviews routers
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// Nested routes
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

// Movies routes
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
// Optional: Integrate reviewsRouter and theatersRouter if applicable
 

router.use('/movies/:movieId/reviews', reviewsRouter);
router.use('/movies/:movieId/theaters', theatersRouter);

module.exports = router;

module.exports = router;