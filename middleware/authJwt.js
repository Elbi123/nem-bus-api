const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
// const Company = require("../models/company.model");
const config = require("./../config/auth.config");
// const { User, mongoose } = require("./../models/index.model");
const db = require("./../models/index.model");
const User = db.User;
const Role = db.Role;
const Company = db.Company;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided",
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Admin Permission!",
                });
            }
        );
    });
};

isSuperAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "super-admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Super Admin Permission!",
                });
            }
        );
    });
};

isUserOfCompany = (req, res, next) => {
    const cId = req.params.companyId;
    // console.log(cId);
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).send({
            message: "No Token Provided",
        });
        return;
    }
    const decode = jwt.verify(token, config.secret);
    const userId = decode.id;
    // console.log(userId);
    // var token = jwt.sign({ id: user.id }, config.secret, {
    //     expiresIn: 86400,
    // });
    Company.findById(cId).exec((err, company) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
            return;
        }
        User.find(
            {
                _id: { $in: company.users },
            },
            (err, users) => {
                // console.log(users);
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                    return;
                }
                for (let i = 0; i < users.length; i++) {
                    // console.log(users[i].equals(userId));
                    if (users[i].equals(userId)) {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Company's Admin Permission!",
                });
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isSuperAdmin,
    isUserOfCompany,
};

module.exports = authJwt;
