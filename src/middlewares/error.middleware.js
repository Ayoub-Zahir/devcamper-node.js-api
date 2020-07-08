const errorHandling = (error, request, response, next) => {
    console.log(error.stack.red);

    // Failed ObjectId casting error
    if (error.name === 'CastError') {
        error.statusCode = 404;
        error.message = `Bootcamp not found with id of ${error.value}`;
    }

    // Fields validation error
    if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);

        error.statusCode = 400;
        error.message = `validation failed: ${validationErrors}`;
    }

    // Duplicate key error
    if (error.code === 11000) {
        error.statusCode = 400;
        error.message = `Duplicate field value name entred: ${JSON.stringify(error.keyValue)}`;
    }

    response.status(error.statusCode || 500).json({
        error: error.message
    });
}

module.exports = errorHandling;