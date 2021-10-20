const express = require("express");
const companyController = require("./../controller/index.controller")
    .CompanyController;
const { authJwt } = require("./../middleware/index");
const router = express.Router();

router
    .route("/")
    .get(
        [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.getCompanies
    )
    .post(
        // [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.createCompany
    );
router
    .route("/all")
    .get(
        [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.getAllCompanyBuses
    );
router
    .route("/:id")
    .patch(
        [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.updateCompany
    )
    .delete(
        [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.deleteCompany
    );

router
    .route("/:name/buses")
    .get(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.getCompanyAllBus
    )
    .post(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.createCompanyBus
    );
router
    .route("/:name/buses/:busId")
    .get(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.getCompanyBus
    )
    .delete(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.deleteCompanyBus
    )
    .patch(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.updateCompanyBus
    );

router
    .route("/:companyId/users/:userId")
    .delete(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isCompany],
        companyController.deleteCompanyUser
    );

router
    .route("/:companyId/users/:userName")
    .patch(
        [authJwt.verifyToken, authJwt.isPlatformAdmin],
        companyController.createCompanyUser
    );

module.exports = router;
