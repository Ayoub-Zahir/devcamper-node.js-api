const mongoose = require('mongoose');

const databaseConnection = async() => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        const connectionObject = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log(`MongoDB connected: ${connectionObject.connection.host}`.blue.bold);
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold);
    }
}

module.exports = databaseConnection;