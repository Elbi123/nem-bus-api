const express = require("express");
const companyController = require("./../controller/index.controller")
    .CompanyController;
const router = express.Router();

router
    .route("/")
    .get(companyController.getCompanies)
    .post(companyController.createCompany);
router
    .route("/:id")
    .patch(companyController.updateCompany)
    .delete(companyController.deleteCompany);

module.exports = router;
