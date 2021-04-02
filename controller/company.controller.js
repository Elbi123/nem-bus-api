// const Company = require("./../models/index.model").Company;
const ObjectId = require("mongoose").Types.ObjectId;
const db = require("./../models/index.model");
Bus = db.Bus;
User = db.User;
Company = db.Company;

// Company GETTERS AND SETTERS
exports.getCompanies = async (req, res) => {
    try {
        const count = await Company.countDocuments();
        if (count > 0) {
            await Company.find({}).exec((err, companies) => {
                if (err) {
                    res.status(404).json({
                        message: err,
                    });
                } else {
                    res.status(200).json({
                        status: "success",
                        total: count,
                        companies,
                    });
                }
            });
        } else {
            res.status("404").json({
                status: "success",
                total: count,
                message: "No Company Found",
            });
        }
    } catch (err) {
        res.status(404).json({
            message: err,
        });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const company = Company.findOne({
            _id: req.params.id,
        });
        if (!company) {
            res.status(200).json({
                // status: "success",
                message: "is found",
                company,
            });
        } else {
            const res_val = await company;
            res.status(200).json({
                status: "success",
                res_val,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Voyage Not Found",
        });
    }
};

exports.createCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ name: req.body.name });
        if (company) {
            res.status(400).json({
                status: "success",
                message: "Company is already created",
            });
        }
        const newCompany = await Company.create(req.body);
        res.status(201).json({
            status: "success",
            voyage: newCompany,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Invalid data sent",
        });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: "success",
            company: company,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        await Company.findOneAndDelete(req.params.id).then(() => {
            res.status(200).json({
                status: "success",
                message: "Company Deleted",
            });
        });
    } catch (err) {
        res.status(404).json({
            message: err,
        });
    }
};

// Company Bus GETTERS AND SETTERS
exports.getCompanyAllBus = async (req, res) => {
    try {
        const name = req.params.name;
        console.log(name);
        await Company.findOne({ name: name })
            .populate("buses", "-__v")
            .exec((err, company) => {
                const numberOfBuses = company.buses.length;
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                    return;
                }
                if (!company) {
                    res.status(404).send({
                        status: "fail",
                        message: "Company Not Found",
                    });
                    return;
                }
                if (numberOfBuses === 0) {
                    res.status(404).send({
                        status: "fail",
                        totalNumberOfBuses: numberOfBuses,
                        message: "No Bus Yet Registered",
                    });
                    return;
                }
                res.status(200).send({
                    status: "success",
                    totalNumberOfBuses: numberOfBuses,
                    buses: company.buses,
                });
                return;
            });
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getCompanyBus = async (req, res) => {
    try {
        const { name, busId } = req.params;
        console.log(name, busId);
        await Bus.findOne({ busId: busId }).exec(async (err, bus) => {
            if (err) {
                res.status(500).send({
                    status: "fail",
                    message: err,
                });
                return;
            }
            if (!bus) {
                res.status(404).send({
                    status: "fail",
                    message: `Bus ${busId} is Not Found Not Found At All`,
                });
                return;
            }
            await Company.findOne({ name: name })
                .populate("buses", "-__v")
                .exec(async (err, company) => {
                    if (err) {
                        res.status(500).send({
                            status: "fail",
                            message: err,
                        });
                        return;
                    }
                    if (!company) {
                        res.status(404).send({
                            status: "fail",
                            message: "No Company Found At All",
                        });
                        return;
                    }
                    // if (!bus && !company) {
                    //     res.status(404).send({
                    //         status: "fail",
                    //         message: "Both Compaany And Bus Not Found",
                    //     });
                    // }
                    const buss = company.buses.filter((el) => {
                        return el.busId === busId;
                    });
                    if (buss.length > 0) {
                        res.status(200).send({
                            status: "success",
                            bus: buss[0],
                        });
                    } else if (buss.length === 0) {
                        res.status(404).send({
                            status: "fail",
                            message: `Bus ${busId} Not Found For Company`,
                        });
                    }
                });
        });
    } catch (err) {
        res.status(400).send({
            status: "fail",
            message: err,
        });
    }
};

exports.createCompanyBus = async (req, res) => {
    const companyId = req.params.name;
    console.log(companyId);
    const buses = req.body;
    const newBus = new Bus(buses);
    console.log(ObjectId.isValid(companyId));
    if (ObjectId.isValid(companyId)) {
        await Company.findOne({ _id: companyId }, async (err, company) => {
            if (err) {
                res.status(500).send({
                    message: err,
                });
                return;
            }
            if (!company) {
                res.status(404).send({
                    message: "Company not found",
                });
                return;
            }
            await Bus.findOne(
                {
                    $or: [
                        { busId: req.body.busId },
                        { busSideNumber: req.body.busSideNumber },
                    ],
                },
                async (err, bus) => {
                    if (err) {
                        res.status(500).send({
                            message: err,
                        });
                        return;
                    }
                    if (bus) {
                        res.status(404).send({
                            message: "Bus Already Existed",
                        });
                        return;
                    } else {
                        company.buses.push(newBus);
                        newBus.company = company;
                        await newBus.save((err, savedBus) => {
                            if (err) {
                                res.status(500).send({
                                    message: err,
                                });
                                return;
                            }
                            savedBus;
                            res.status(201).send({
                                message: "Bus Registered",
                            });
                        });
                        await company.save((err, savedCompany) => {
                            if (err) {
                                res.status(500).send({
                                    message: err,
                                });
                                return;
                            }
                            savedCompany;
                        });
                    }
                    return company;
                }
            );
        });
    } else {
        res.status(500).send({
            message: "Invalid ID is provided",
        });
    }
};

exports.getAllCompanyBuses = async (req, res) => {
    try {
        const companies = await Company.find({}).populate("buses");
        res.status(200).send({
            companies,
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};

exports.updateCompanyBus = async (req, res) => {
    try {
        const name = req.params.name;
        const busId = req.params.busId;
        const updatedBus = req.body;
        await Company.findOne({ name: name }).exec(async (err, company) => {
            if (err) {
                res.status(500).send({
                    status: "fail",
                    message: err,
                });
                return;
            }
            if (!company) {
                res.status(404).send({
                    status: "fail",
                    message: "Company Not Found",
                });
                return;
            }
            if (ObjectId.isValid(busId)) {
                await Bus.findOne({ _id: busId })
                    .populate("company")
                    .exec(async (err, bus) => {
                        if (err) {
                            res.status(500).send({
                                status: "fail",
                                message: err,
                            });
                            return;
                        }
                        if (!bus) {
                            res.status(404).send({
                                status: "fail",
                                message: `Bus Not Found`,
                            });
                            return;
                        }
                        if (
                            bus.company.buses.includes(busId) &&
                            bus.company.name === name
                        ) {
                            bus.updateOne(updatedBus, (err) => {
                                if (err) {
                                    res.status(500).send({
                                        status: "fail",
                                        message: "Bus Already Existed",
                                    });
                                    return;
                                }
                                res.status(201).send({
                                    status: "success",
                                    savedBus: "Successfully Updated Bus",
                                });
                                return;
                            });
                        } else {
                            res.status(500).send({
                                message: "Company Has No Such Bus",
                            });
                            return;
                        }
                    });
            } else {
                res.status(501).send({
                    status: "fail",
                    message: "Invalid ID Provided",
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
        return err;
    }
};

exports.deleteCompanyBus = async (req, res) => {
    try {
        const name = req.params.name;
        const busId = req.params.busId;
        console.log(name, busId);
        await Company.findOne({ name: name }).exec(async (err, company) => {
            if (err) {
                res.status(500).send({
                    status: "fail",
                    message: err,
                });
                return;
            }
            if (!company) {
                res.status(404).send({
                    status: "fail",
                    message: "Company Not Found",
                });
                return;
            }
            if (ObjectId.isValid(busId)) {
                await Bus.findOne({ _id: busId })
                    .populate("company")
                    .exec(async (err, bus) => {
                        if (err) {
                            res.status(500).send({
                                status: "fail",
                                message: err,
                            });
                            return;
                        }
                        if (!bus) {
                            res.status(404).send({
                                status: "fail",
                                message: `Bus Not Found`,
                            });
                            return;
                        }
                        if (
                            bus.company.buses.includes(busId) &&
                            bus.company.name === name
                        ) {
                            const nBusIds = bus.company.buses.filter((el) => {
                                return !el.equals(busId);
                            });
                            bus.company.buses = nBusIds;
                            company.buses = nBusIds;
                            company.save((err) => {
                                if (err) {
                                    return res.status(500).send({
                                        status: "fail",
                                        message: err,
                                    });
                                }
                            });
                            bus.remove((err) => {
                                if (err) {
                                    return res.status(500).send({
                                        status: "fail",
                                        message: err,
                                    });
                                }
                                return res.status(200).send({
                                    status: "success",
                                    message: "Bus Deleted Successfully",
                                });
                            });
                        } else {
                            res.status(500).send({
                                message: "Company Has No Such Bus",
                            });
                            return;
                        }
                    });
            } else {
                res.status(501).send({
                    status: "fail",
                    message: "Invalid ID Provided",
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: err,
        });
    }
};

// Company User GETTERS AND SETTERS
exports.createCompanyUser = async (req, res) => {
    const { companyId, userName } = req.params;
    if (ObjectId.isValid(companyId)) {
        await Company.findOne({ _id: companyId }, async (err, company) => {
            if (err) {
                res.status(500).send({
                    message: err,
                });
                return;
            }
            if (!company) {
                res.status(404).send({
                    message: "Company Not Found",
                });
                return;
            }
            // if (company.users.length === 0) {
            //     res.status(401).send({
            //         message: "You Should Add Compan's User First",
            //     });
            //     return;
            // }
            await User.findOne({ username: userName }, async (err, sUser) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                    });
                    return;
                }
                if (!sUser) {
                    res.status(404).send({
                        message: "User Not Found",
                    });
                    return;
                } else {
                    if (!company.users.includes(sUser._id)) {
                        company.users.push(sUser._id);
                        sUser.company = company;
                    } else {
                        res.status(401).send({
                            message: "User Aleady Assigned",
                        });
                        return;
                    }
                    await sUser.save((err, savedUser) => {
                        if (err) {
                            res.status(500).send({
                                message: err,
                            });
                            return;
                        }
                        res.status(201).send({
                            message: "User Assigned to Company",
                        });
                    });
                    await company.save((err, savedCompany) => {
                        if (err) {
                            res.status(500).send({
                                message: err,
                            });
                            return;
                        }
                        savedCompany;
                    });
                }
            });
            return company;
        });
    } else {
        res.status(404).send({
            message: "Invalid Id",
        });
    }
};

exports.getCompanyAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.getCompanyUser = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

// Company Voyage GETTERS AND SETTERS
exports.getAllCompanyVoyages = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.getCompanyVoyage = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.createCompanyVoyage = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.updateCompanyVoyage = (res, req) => {
    res.status(200).json({
        status: "success",
    });
};

exports.deleteCompanyVoyage = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};
