const mongoose = require("mongoose");

const user = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", user);

module.exports = User;
