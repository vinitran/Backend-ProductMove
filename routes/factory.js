const { authenFactory } = require("../authentication/authen");
const factoryController = require("../controller/factory/index")

const factoryRoute = (app) => {

    /**
     * Login to Factory account
     * @route POST /factory/auth/login
     * @param {Login.model} point.body.required - Login information
     * @group Factory
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/factory/auth/login", async (req, res, next) => {
        factoryController.login(req, res);
    })


    /**
     * @typedef ProductInStock
     * @property {number} stockId.required -
     * @property {number} productId.required -
     * @property {number} quantity.required -
     */
    /**
     * Insert product to stock
     * @route POST /factory/stock/insert-product
     * @security JWT
     * @param {ProductInStock.model}  point.body.required - Product Id
     * @group Factory
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/factory/stock/insert-product", authenFactory, async (req, res, next) => {
        factoryController.insertProductToStock(req, res);
    })

    /**
     * @typedef ExportProductToAgency
     * @property {number} factoryStockId.required -
     * @property {number} agencyStockId.required -
     * @property {number} productId.required -
     * @property {number} quantity.required -
     */
    /**
     * Export product from factory to agency
     * @route POST /factory/export-product/agency
     * @security JWT
     * @param {ExportProductToAgency.model}  point.body.required - Product Id
     * @group Factory
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/factory/export-product/agency", authenFactory, async (req, res, next) => {
        factoryController.exportProductToAgency(req, res);
    })

}

module.exports = factoryRoute