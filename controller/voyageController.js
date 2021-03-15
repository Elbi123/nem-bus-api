const Voyage = require("./../models/voyageModel");

exports.getAllVoyage = async (req, res) => {
    try {
        const voyages = await Voyage.find();
        res.status(200).send({
            status: "success",
            voyages,
        });
    } catch (err) {
        res.send(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getVoyage = async (req, res) => {
    try {
        const voyage = await Voyage.findById(req.params.id);
        if (voyage) {
            res.status(200).json({
                status: "success",
                voyage,
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "Voyage Not Found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: fail,
            message: "Voyage Not Found",
        });
    }
};

exports.createVoyage = async (req, res) => {
    try {
        const voyage = await Voyage.findOne({ name: req.body.name });
        if (voyage) {
            res.status(400).json({
                status: "success",
                message: "Voyage is already created",
            });
        }
        const newVoyage = await Voyage.create(req.body);
        res.status(201).json({
            status: "success",
            voyage: newVoyage,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Invalid data sent",
        });
    }
};

exports.updateVoyage = async (req, res) => {
    try {
        const updatedVoyage = await Voyage.findOneAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: "success",
            updatedVoyage,
        });
    } catch (err) {
        res.send(404).json({
            status: "fail",
        });
    }
};

exports.deleteVoyage = async (req, res) => {
    try {
        await Voyage.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.send(400).json({
            status: "fail",
        });
    }
};
