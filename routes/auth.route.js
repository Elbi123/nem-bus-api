const express = require("express");
const { verifySignup } = require("./../middleware/index");
const controller = require("./../controller/auth.controller");

const app = express();

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post(
    "/api/auth/signup",
    [
        verifySignup.checkDuplicateUsernameOrPhoneNumber,
        verifySignup.checkRoleExisted,
    ],
    controller.signup
);

app.post("/api/auth/signin", [controller.signin]);

module.exports = app;
