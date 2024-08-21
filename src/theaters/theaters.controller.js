const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // This is available from movies.router from using "mergeParams: true"
  const { movieId } = request.params;
  let data = null;

  // If there is a movieId list only theaters for that movie
  // Otherwise list all theaters
  if (movieId) {
    data = await service.listTheatersForMovie(movieId);
  } else {
    data = await service.list();
  }

  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};