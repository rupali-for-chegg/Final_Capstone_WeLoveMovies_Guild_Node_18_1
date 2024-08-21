const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if movie exists
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId); // Assuming service.read returns a movie or null/undefined

  if (movie) {
    res.locals.movie = movie; // Save the movie data to res.locals for later use
    return next();
  }

  next({
    statusCode: 404,
    message: `Movie with ID ${movieId} not found`
  });
}

// Controller to read a movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

// Controller to list movies
async function list(req, res) {
  const { is_showing } = req.query;
  const movies = await service.list({ is_showing }); // Assuming service.list can filter based on is_showing
  res.json({ data: movies });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
