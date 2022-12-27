const { authenFactory, authenAgency } = require("../authentication/authen");
const agencyController = require("../controller/agency/index")

const agency = (app) => {

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
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/customers",authenAgency, async (req, res, next) => {
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
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/product-bill",authenAgency, async (req, res, next) => {
        agencyController.createBill(req, res);
    })

    /**
     * @typedef ProductBillDetail
     * @property {number} product_id.required -
     * @property {number} quantity.required -
     */
    /**
     * Login to Factory account
     * @route POST /agency/product-bill/{id}
     * @param {ProductBillDetail.model} point.body.required - Login information
     * @param {number} id.path.required - Role
     * @group Agency
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/agency/product-bill/:id",authenAgency, async (req, res, next) => {
        agencyController.createBillDetail(req, res);
    })

}

module.exports = agency