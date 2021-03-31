const mongoose = require("mongoose");

const role = mongoose.Schema({
    name: String,
});

const Role = mongoose.model("Role", role);
module.exports = Role;
