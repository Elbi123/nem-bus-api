const express = require("express");
const companyController = require("./../controller/index.controller")
    .CompanyController;
const { authJwt } = require("./../middleware/index");
const router = express.Router();

router
    .route("/")
    .get(companyController.getCompanies)
    .post(companyController.createCompany);
router
    .route("/:id")
    .patch(companyController.updateCompany)
    .delete(companyController.deleteCompany);

router
    .route("/:companyId/buses")
    .post(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.createCompanyBus
    );
router
    .route("/:companyId/users/:userName")
    .patch(companyController.createCompanyUser);

module.exports = router;
