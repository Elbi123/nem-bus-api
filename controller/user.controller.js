const db = require("./../models/index.model");
const Role = db.Role;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Access");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Board");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Board");
};

exports.superAdmin = (req, res) => {
    res.status(200).send("SuperAdmin Board");
};

exports.getAllUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined yet",
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined yet",
    });
};

exports.createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined yet",
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined yet",
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined yet",
    });
};

exports.updateUserRole = async (req, res) => {
    const roleQuery = req.params.role;
    await Role.findOne({ name: roleQuery }, async (err, role) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
        }
        if (!role) {
            res.status(404).send({
                message: "Role Not Found",
            });
            return;
        } else {
            await User.findOne({ username: req.body.username })
                .populate("roles")
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({
                            message: err,
                        });
                        return;
                    }
                    Role.findOne({ name: roleQuery }, (err, role) => {
                        if (err) {
                            res.status(500).send({
                                message: "Null",
                            });
                            return;
                        }
                        for (let i = 0; i < user.roles.length; i++) {
                            if (user.roles[i].name === role.name) {
                                res.status(500).send({
                                    message: "Role existed",
                                });
                                return;
                            }
                        }
                        user.roles.push(role);
                        user.save((err) => {
                            if (err) {
                                res.status(500).send({
                                    message: err,
                                });
                                return;
                            }
                            res.status(201).send({
                                message: "Role Added",
                            });
                        });
                    });
                });
        }
    });
};
