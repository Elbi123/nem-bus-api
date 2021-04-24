# **PUBLIC BUS API**

## **ALL API ENDPOINTS ARE LISTED BELLOW**

### **COMPANY**

-   _GET /api/v1/companies_ [SUPER_ADMIN]
-   _GET /api/v1/companies/all [SUPER_ADMIN]_
-   _POST /api/v1/companies [SUPER_ADMIN]_
-   _PATCH /api/v1/companies/:id [SUPER_ADMIN]_
-   _DELETE /api/v1/companies/:id [SUPER_ADMIN]_ </br></br>
-   _GET /api/v1/company/:name/buses_ [ADMIN]
-   _POST /api/v1/company/:name/buses_ [ADMIN]
-   _GET /api/v1/company/:name/buses/:busId_ [ADMIN]
-   _UPDATE /api/v1/company/:name/buses/:busId_ [ADMIN]
-   _DELETE /api/v1/company/:name/buses/:busId_ [ADMIN]
-   _UPDATE /api/v1/company/:companyId/users/:userName_ [ADMIN]

### **BUSES**

-   _GET /api/v1/buses_
-   _GET /api/v1/buses/:id_

### **USERS**

-   _PATCH api/v1/users/update/:role_ [SUPER-ADMIN]

### **DRIVERS**

-   _GET /api/v1/company/drivers_
-   _GET /api/v1/company/:companyName/drivers_
-   _GET /api/v1/company/:companyName/drivers/:driverName_
-   _PATCH /api/v1/company/:companyName/drivers/:driverId_
-   _DELETE /api/v1/company/:companyName/drivers/:driverId_

### **AUTH**

-   _POST /api/auth/signup_
-   _POST /api/auth/signin_

### **VOYAGE**

-   _POST /api/v1/company/companyId/voyages_
-   _UPDATE /api/v1/company/companyId/voyages/:voyageId_
-   _DELETE /api/v1/company/companyId/voyages/:voyageId_
