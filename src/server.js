const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan')

// Import config files ========
const mongoDBConnection = require('./config/database.config');

// Import routes ========
const bootcampRoute = require('./routes/bootcamp.route');

// Import middlewares ========
const errorHandlingMiddleware = require('./middlewares/error.middleware');

// Load environment variables
dotenv.config();
const { PORT, NODE_ENV } = process.env;

// Connect to mongoDB
mongoDBConnection();

// Init express app 
const app = express();

// Parse JSON request body
app.use(express.json())

// Development logger (Thirdparty middleware => morgan)
if (NODE_ENV === 'development')
    app.use(morgan('dev'));

// Mount the routers 
app.use('/api/v1/bootcamps', bootcampRoute);

// Mount the custom error handling middleware 
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`.yellow.bold);
});