const mongoose = require("mongoose");

const voyageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
            min: [10, "Too few characters"],
            max: [40, "Too long characters"],
        },
        departure: {
            type: Date,
            default: Date.now(),
        },
        arrival: {
            type: Date,
        },
        price: {
            type: Number,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
            required: true,
        },
        companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    },
    { timestamps: true }
);

const Voyage = mongoose.model("Voyage", voyageSchema);

module.exports = Voyage;

// - id
// - name
// - departure
// - arrival
// - origin
// - destination
// - prices_birr
// - price_currency
// - is_available
