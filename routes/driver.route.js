const express = require("express");
const driverController = require("./../controller/driver.controller");
const router = express.Router();

router.route("/drivers").get(driverController.getAllCompanyDrivers);
router.route(
    ":/companyId/drivers/:driverId",
    driverController.getDriversOfCompany
);

router.route(":/companyId/drivers").post(driverController.createCompanyDriver);
router
    .route(":/companyId/drivers/:driverId")
    .patch(driverController.updateCompanyDriver)
    .delete(driverController.deleteCompanyDriver);

module.exports = router;
