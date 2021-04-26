const express = require("express");
const companyController = require("./../controller/index.controller")
    .CompanyController;
const { authJwt } = require("./../middleware/index");
const router = express.Router();

router
    .route("/")
    .get(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.getCompanies
    )
    .post(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.createCompany
    );
router
    .route("/all")
    .get(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.getAllCompanyBuses
    );
router
    .route("/:id")
    .patch(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.updateCompany
    )
    .delete(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.deleteCompany
    );

router
    .route("/:name/buses")
    .get(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.getCompanyAllBus
    )
    .post(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.createCompanyBus
    );
router
    .route("/:name/buses/:busId")
    .get(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.getCompanyBus
    )
    .delete(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.deleteCompanyBus
    )
    .patch(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.updateCompanyBus
    );

router
    .route("/:companyId/users/:userId")
    .delete(
        [authJwt.verifyToken, authJwt.isUserOfCompany, authJwt.isAdmin],
        companyController.deleteCompanyUser
    );

router
    .route("/:companyId/users/:userName")
    .patch(
        [authJwt.verifyToken, authJwt.isSuperAdmin],
        companyController.createCompanyUser
    );

module.exports = router;
