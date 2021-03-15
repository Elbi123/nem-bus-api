const express = require("express");
const voyageCongtroller = require("./../controller/voyageController");

const router = express.Router();

router
    .route("/")
    .get(voyageCongtroller.getAllVoyage)
    .post(voyageCongtroller.createVoyage);

router
    .route("/:id")
    .get(voyageCongtroller.getVoyage)
    .patch(voyageCongtroller.updateVoyage)
    .delete(voyageCongtroller.deleteVoyage);

module.exports = router;
