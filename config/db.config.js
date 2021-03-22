const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path: "./config.env",
});

const db = process.env.DATABASE_LOCAL;

const connetDB = async () => {
    try {
        const connectionString = await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connectionString.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connetDB;
