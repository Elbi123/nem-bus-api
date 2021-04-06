const ObjectId = require("mongoose").Types.ObjectId;
const db = require("./../models/index.model");
Bus = db.Bus;
Driver = db.Driver;
Company = db.Company;

exports.getAllCompanyDrivers = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};

exports.getDriversOfCompany = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};

exports.getCompanyDriver = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};

exports.createCompanyDriver = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};

exports.updateCompanyDriver = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};

exports.deleteCompanyDriver = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Everything is fine",
    });
};
