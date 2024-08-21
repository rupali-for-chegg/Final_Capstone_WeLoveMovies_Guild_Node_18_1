const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const review = await service.read(request.params.reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(request, response) {
  console.log(response.locals);
  console.log(response.locals.review);
  const review = response.locals.review;
  await service.destroy(review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  const data = await service.list(request.params.movieId);
  res.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

async function listReviewsForMovie(request, response) {
  const { movieId } = request.params;

  const reviews = await service.listReviewsForMovie(movieId);
  response.json({ data: reviews });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  listReviewsForMovie: asyncErrorBoundary(listReviewsForMovie),
};