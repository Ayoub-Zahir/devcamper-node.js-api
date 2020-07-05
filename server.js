const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load env vars
dotenv.config();
const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`);
});