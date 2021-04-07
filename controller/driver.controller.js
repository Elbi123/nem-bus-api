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

exports.createCompanyDriver = async (req, res) => {
    const companyId = req.params.companyId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const phoneNumber = req.body.phoneNumber;
    const licenseId = req.body.licenseId;
    const newDriver = new Driver({
        firstName: firstName,
        lastName: lastName,
        age: age,
        phoneNumber: phoneNumber,
        licenseId: licenseId,
    });
    try {
        if (ObjectId.isValid(companyId)) {
            await Company.findOne({ _id: companyId }).exec((err, company) => {
                if (err) {
                    res.status(500).json({
                        status: "fail",
                        message: err,
                    });
                    return;
                }
                if (!company) {
                    return res.status(404).json({
                        status: "fail",
                        message: "Company Doesn't exist",
                    });
                }
                Driver.findOne({
                    $or: [
                        { phoneNumber: phoneNumber },
                        { licenseId: licenseId },
                    ],
                }).exec((err, driver) => {
                    if (err) {
                        return res.status(500).json({
                            status: "fail",
                            message: err,
                        });
                    }
                    if (driver) {
                        return res.json({
                            status: "fail",
                            message: "Oops! Driver is already existed",
                        });
                    } else {
                        company.drivers.push(newDriver);
                        newDriver.company = company;
                        newDriver.save((err, savedDriver) => {
                            if (err) {
                                return res.status(500).json({
                                    success: "fail",
                                    message: err,
                                });
                            }
                            savedDriver;
                            res.status(201).json({
                                success: "success",
                                message: "Driver Registered",
                            });
                        });
                        company.save((err, savedCompany) => {
                            if (err) {
                                return res.status(500).json({
                                    success: "fail",
                                    message: err,
                                });
                            }
                            savedCompany;
                        });
                    }
                    return company;
                });
            });
        } else {
            return res.status(500).json({
                status: "fail",
                message: "Please Provide Valid Company ID",
            });
        }
    } catch (err) {
        res.status(200).json({
            status: "success",
            message: "Everything is fine",
        });
    }
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
