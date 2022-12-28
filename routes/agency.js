const { authenFactory, authenAgency } = require("../authentication/authen");
const agencyController = require("../controller/agency/index")

const agency = (app) => {

    /**
     * Login to Factory account
     * @route GET /product-bill/{id}
     * @param {number} id.path.required - Login information
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/product-bill/:id", async (req, res, next) => {
        agencyController.getProductBillById(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /product-bill
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/product-bill", async (req, res, next) => {
        agencyController.getProductBill(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /agency/product/selled
     * @group Agency
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/agency/product/selled", async (req, res, next) => {
        agencyController.statisticSelledProduct(req, res);
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
     * @typedef ProductBillDetail
     * @property {number} productId.required -
     * @property {number} quantity.required -
     */
    /**
     * Login to Factory account
     * @route POST /agency/product-bill/{id}
     * @param {ProductBillDetail.model} point.body.required - Login information
     * @param {number} id.path.required - Role
     * @security JWT
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/product-bill/:id", authenAgency, async (req, res, next) => {
        agencyController.createBillDetail(req, res);
    })

}

module.exports = agency