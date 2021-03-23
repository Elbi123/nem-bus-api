const Company = require("./../models/index.model").Company;

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
    res.status(200).json({
        status: "success",
    });
};

exports.getCompanyBus = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.createCompanyBus = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.updateCompanyBus = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

exports.deleteCompanyBus = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

// Company User GETTERS AND SETTERS
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
