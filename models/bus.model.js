const mongoose = require("mongoose");

const bus = mongoose.Schema(
    {
        busId: {
            type: String,
            unique: true,
            required: true,
        },
        busSideNumber: {
            type: Number,
            unique: true,
            required: true,
        },
        passangerCapacity: {
            type: Number,
            required: true,
            default: 60,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
    },
    {
        timestamps: true,
    }
);

const Bus = mongoose.model("Bus", bus);

module.exports = Bus;
