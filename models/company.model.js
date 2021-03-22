const mongoose = require("mongoose");

const company = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },

        address: {
            phoneNumber: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: false,
            },
            workingDays: {
                type: String,
                required: false,
            },
            workingHours: {
                type: String,
                required: false,
            },
        },
        buses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bus" }],
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        voyages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voyage" }],
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model("Company", company);

module.exports = Company;
