const { authen, authenAgency } = require("../authentication/authen");
const agencyController = require("../controller/agency/index")

const agency = (app) => {

    /**
     * Login to Factory account
     * @route GET /product-bill/{id}
     * @param {number} id.path.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/product-bill/:id",authenAgency, async (req, res, next) => {
        agencyController.getProductBillById(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /product-bill
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/product-bill",authenAgency, async (req, res, next) => {
        agencyController.getProductBill(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/product/selled
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/product/selled",authenAgency, async (req, res, next) => {
        agencyController.statisticSelledProduct(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/product/selled/month/{month}
     * @param {number} month.path.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/product/selled/month/:month",authen, async (req, res, next) => {
        agencyController.statisticSelledProductByMonth(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/insurance-bills
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/insurance-bills",authenAgency, async (req, res, next) => {
        agencyController.getInsuranceBill(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/insurance-bills/{id}
     * @param {number} id.path.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/insurance-bills/:id",authenAgency, async (req, res, next) => {
        agencyController.getInsuranceBillById(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/insurance-bills/customer/{id}
     * @param {number} id.path.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/insurance-bills/customer/:id",authenAgency, async (req, res, next) => {
        agencyController.getBillByCustomerId(req, res);
    })

    /**
     * Login to Factory account
     * @route POST /agency/auth/login
     * @param {Login.model} point.body.required - Login information
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/auth/login", async (req, res, next) => {
        agencyController.login(req, res);
    })

    /**
     * @typedef Customer
     * @property {string} name.required -
     * @property {string} phoneNumber.required -
     * @property {string} address.required -
     */
    /**
     * Login to Factory account
     * @route POST /agency/customers
     * @param {Customer.model} point.body.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/customers", authenAgency, async (req, res, next) => {
        agencyController.createCustomer(req, res);
    })

    /**
     * @typedef ProductBill
     * @property {number} customerId.required -
     * @property {number} stockId.required -
     */
    /**
     * Login to Factory account
     * @route POST /agency/product-bill
     * @param {ProductBill.model} point.body.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/product-bill", authenAgency, async (req, res, next) => {
        agencyController.createBill(req, res);
    })

    /**
     * Login to Factory account
     * @route POST /agency/export-product/{id}/insurance
     * @param {number} id.path.required - id product
     * @security JWT
     * @group Agency  
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/export-product/:id/insurance", authenAgency, async (req, res, next) => {
        agencyController.exportProductToInsurance(req, res);
    })

    /**
     * @typedef InsuranceBill
     * @property {number} customerId.required -
     * @property {number} productId.required -
     * @property {string} status.required -
     * @property {number} quantity.required -
     * @property {number} stockId.required -
     */
    /**
     * Login to Factory account
     * @route POST /agency/insurance-bill
     * @param {InsuranceBill.model} point.body.required - Login information
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/insurance-bill", authenAgency, async (req, res, next) => {
        agencyController.createNewInsuranceBill(req, res);
    })

}

module.exports = agency