const config = require("../config/auth.config");
const db = require("../models/index.model");
const Role = db.Role;
const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const firstName = req.body.firstname.trim();
    const lastName = req.body.lastname.trim();
    const phoneNumber = req.body.phoneNumber.trim();
    const password = req.body.password;
    const userName = `${firstName} ${lastName}`;
    const user = new User({
        username: userName,
        phoneNumber: phoneNumber,
        password: bcrypt.hashSync(password, 8),
    });
    user.save((err, user) => {
        if (err) {
            res.statust(500).json({
                message: err,
            });
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json({
                            message: err,
                        });
                        return;
                    }
                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: err,
                            });
                            return;
                        }
                        res.status(201).json({
                            message: "User successfully registered",
                        });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).json({
                        message: err,
                    });
                    return;
                }
                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).json({
                            message: err,
                        });
                        return;
                    }
                    res.status(201).json({
                        message: "User successfully registered",
                    });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err,
                });
                return;
            }
            if (!user) {
                res.status(404).send({
                    message: "User Not found",
                });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password",
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400,
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                phoneNumber: user.phoneNumber,
                roles: authorities,
                accessToken: token,
            });
        });
};
