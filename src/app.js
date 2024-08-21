if (process.env.NODE_ENV !== 'test') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();

const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

// Apply middleware
app.use(cors());
app.use(express.json());

// Register routers
app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);
app.use('/reviews', reviewsRouter);

// 404 Not Found handler
app.use((req, res, next) => {
    const error = {
        status: 404,
        message: `Not found: ${req.originalUrl}`
    };
    next(error);
});

// Generic error handler
app.use((err, req, res, next) => {
    // Log detailed error information to the console
    console.error(err.stack || err);

    // Determine status code based on the error or default to 500
    const statusCode = err.status || 404;

    // Generate an informative error message
    // Include dynamic details like the movie ID if available
    const message = err.message || `Movie with ID ${req.movieId || 'unknown'} not found`;

    // Send JSON response with error details
    res.status(statusCode).json({ error: message });
});



module.exports = app;
