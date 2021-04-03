const Company = require("./../models/index.model").Company;
const Bus = require("./../models/index.model").Bus;

exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find({});
        res.status(200).json({
            buses: buses,
        });
    } catch (err) {
        res.status(404).json({
            message: err,
        });
    }
};

exports.getSingleBus = async (req, res) => {
    const busId = req.params.id;
    const bus = await Bus.findById({ _id: busId });
    res.status(200).json({
        bus: bus,
    });
};

exports.createBus = async (req, res) => {
    const company_id = req.params.companyId;
    // console.log(company_id);
    const busObject = await req.body;
    const newBus = new Bus(busObject);

    await Company.findOne({ _id: company_id }, async (err, foundCompany) => {
        if (!foundCompany) {
            res.json({
                message: "No Company is Found",
            });
        }
        foundCompany.buses.push(newBus);
        newBus.company = foundCompany;

        await newBus.save((err, savedCompany) => {
            if (err) {
                res.json({
                    message: "Error while saving",
                });
            }
            return res.json({
                savedCompany,
            });
        });

        await foundCompany.save((err, savedCompany) => {
            if (err) {
                res.json({
                    message: "Error saving Company",
                });
            }
            savedCompany;
        });
        return foundCompany;
    });
};

exports.updateCompanyBus = (req, res) => {
    const new_company_id = req.params.companyId;
    const { busId } = req.params;
    const newBus = req.body;
    Bus.findOne({ _id: busId }, (err, bus) => {
        if (!bus) {
            return res.json({
                message: err,
            });
        }
        const oldCompanyId = bus.company._id;
        Company.findById(oldCompanyId).then((oldCompany) => {
            if (!oldCompany) {
                return res.status(400).json({
                    message: "No Company with that ID",
                });
            }
            const index = oldCompany.buses.indexOf(busId);
            if (index > -1) {
                oldCompany.buses.splice(index, 1);
            }
            oldCompany.save((err, savedCompany) => {
                if (err) {
                    return res.json({
                        message: err,
                    });
                }
                return savedCompany;
            });
            return oldCompany;
        });

        Company.findById(new_company_id).then((newCompany) => {
            if (!newCompany) {
                return res.json({
                    message: "Not Company",
                });
            }
            newCompany.buses.push(bus);
            newCompany.save((error, savedCompany) => {
                if (error) {
                    return res.json({
                        message: error,
                    });
                }
                return savedCompany;
            });
            bus.company = newCompany;
            Object.assign(bus, newBus);
            // _.merge(car, newCar);
            bus.save((err, saved) => {
                if (err) {
                    return res.send({
                        message: "Error while saving",
                    });
                }
                return res.json({
                    saved: saved,
                });
            });
            return bus;
        });
    });
};

exports.deleteBus = async (req, res) => {
    const bus_id = req.params.id;
    await Bus.deleteOne({ _id: bus_id });
    res.json({
        message: "Bus deleted",
    });
};
