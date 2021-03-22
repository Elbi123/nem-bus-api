const Company = require("./../models/index.model").Company;

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

module.getCompany = async (req, res) => {
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
