const mongoose = require("mongoose");
const dbs = require("./../models/index.model");
const dotenv = require("dotenv");
const Role = dbs.Role;

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
        initial();
        console.log(`MongoDB connected: ${connectionString.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("Erro while saving Role");
                }
                console.log("Role 'user' is added");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("Erro while saving Role");
                }
                console.log("Role 'admin' is added");
            });

            new Role({
                name: "super-admin",
            }).save((err) => {
                if (err) {
                    console.log("Erro while saving Role");
                }
                console.log("Role 'super-admin' is added");
            });
        }
    });
}

module.exports = connetDB;
