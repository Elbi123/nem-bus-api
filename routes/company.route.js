const express = require("express");
const companyController = require("./../controller/index.controller")
    .CompanyController;
const router = express.Router();

router
    .route("/")
    .get(companyController.getCompanies)
    .post(companyController.createCompany);

module.exports = router;
