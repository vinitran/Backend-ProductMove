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
     * @typedef Product
     * @property {string} code.required -
     * @property {string} name.required -
     * @property {number} price.required -
     * @property {string} imageUrl.required -
     * @property {string} productLine.required -
     * @property {string} description.required -
     */
    /**
     * Create new product
     * @route POST /factory/product/create
     * @security JWT
     * @param {Product.model} point.body.required - Product information
     * @group Factory
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/factory/product/create", authenFactory, async (req, res, next) => {
        factoryController.createProduct(req, res);
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
     * @property {number} AgencyStockId.required -
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

    /**
     * Login admin account
     * @route DELETE /factory/product/delete/{id}
     * @security JWT
     * @param {number}  id.path.required - Product Id
     * @group Factory
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.delete("/api/factory/product/delete/:id", authenFactory, async (req, res, next) => {
        factoryController.deleteProduct(req, res);
    })

}

module.exports = factoryRoute