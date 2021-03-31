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
