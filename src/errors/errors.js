// Middleware to handle 404 Not Found errors
function notFound(req, res, next) {
    res.status(404).json({ error: "Not Found" });
}

// Middleware to handle general errors


module.exports = {
    notFound,
   // errorHandler
};
