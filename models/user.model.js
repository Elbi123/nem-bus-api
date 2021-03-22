const mongoose = require("mongoose");

const user = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true,
        },
        age: {
            type: Number,
        },
        companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", user);

module.exports = User;
