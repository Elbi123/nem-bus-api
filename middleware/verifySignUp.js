const db = require("./../models/index.model");
const ROLES = db.ROLE;
const User = db.User;

checkDuplicateUsernameOrPhoneNumber = (req, res, next) => {
    const firstName = req.body.firstname.trim();
    const lastName = req.body.lastname.trim();
    console.log(firstName, lastName);
    const phoneNumber = req.body.phoneNumber;
    const userName = `${firstName} ${lastName}`;
    // Check if username already existed
    User.findOne({
        username: firstName,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }

        // Check if phoneNumber already existed
        User.findOne({
            phoneNumber: phoneNumber,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err,
                });
                return;
            }
            if (user) {
                res.status(400).send({
                    message: "Failed! Phone Number is already in use!",
                });
                return;
            }
            next();
        });
    });
};

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist`,
                });
                return;
            }
        }
    }
    next();
};

const verifySignup = {
    checkDuplicateUsernameOrPhoneNumber,
    checkRoleExisted,
};

module.exports = verifySignup;
