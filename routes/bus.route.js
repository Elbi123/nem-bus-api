const express = require("express");
const busController = require("./../controller/index.controller").BusController;
const router = express.Router();

router.route("/").get(busController.getBuses);
router
    .route("/:id")
    .get(busController.getSingleBus)
    .delete(busController.deleteBus);

router.route("/:companyId/buses").post(busController.createBus);
router.route("/:companyId/buses/:busId").patch(busController.updateCompanyBus);

module.exports = router;
