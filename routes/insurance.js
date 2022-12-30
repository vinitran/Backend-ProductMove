const { authenInsurance } = require("../authentication/authen");
const insuranceController = require("../controller/insurance/index")

const insurance = (app) => {

    /**
     * Login to Factory account
     * @route GET /insurance/products
     * @security JWT
     * @group Insurance
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/insurance/products",authenInsurance, async (req, res, next) => {
        insuranceController.getInsuranceProduct(req, res);
    })

    /**
     * Login to Factory account
     * @route POST /insurance/auth/login
     * @param {Login.model} point.body.required - Login information
     * @group Insurance
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/insurance/auth/login", async (req, res, next) => {
        insuranceController.login(req, res);
    })

    /**
     * @typedef ExportProductToAgency
     * @property {number} stockId.required - 
     */
    /**
     * Login to Factory account
     * @route POST /insurance/export-product/{id}/agency
     * @param {number} id.path.required - Login information
     * @param {ExportProductToAgency.model} point.body.required - Login information
     * @security JWT
     * @group Insurance
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/insurance/export-product/:id/agency",authenInsurance, async (req, res, next) => {
        insuranceController.exportProductToAgency(req, res);
    })

    /**
     * Login to Factory account
     * @route POST /insurance/export-product/{id}/factory
     * @param {number} id.path.required - Login information
     * @param {ExportProductToAgency.model} point.body.required - Login information
     * @security JWT
     * @group Insurance
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/insurance/export-product/:id/agency",authenInsurance, async (req, res, next) => {
        insuranceController.exportProductToFactory(req, res);
    })

    

}

module.exports = insurance