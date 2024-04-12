const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASE_URL, {
        dbName: "news-scrapper",    })
    .then(() => console.info("Connection successful!"))
    .catch((e) => {
        console.error(`Error connecting to Database`, e);
        throw new Error("Error Occurred!");
    });

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.info('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
