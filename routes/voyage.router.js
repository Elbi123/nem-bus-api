const express = require("express");
const voyageCongtroller = require("../controller/voyage.controller");

const router = express.Router();

router.route("/voyages").get(voyageCongtroller.getEveryVoyage);
router
    .route("/")
    .get(voyageCongtroller.getAllVoyage)
    .post(voyageCongtroller.createVoyage);

router.route("/:companyId/voyages").post(voyageCongtroller.createCompanyVoyage);

router
    .route("/:id")
    .get(voyageCongtroller.getVoyage)
    .patch(voyageCongtroller.updateVoyage)
    .delete(voyageCongtroller.deleteVoyage);

module.exports = router;
