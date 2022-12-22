const { authenFactory } = require("../authentication/authen");
const factoryController = require("../controller/factory/index")

const factory = (app) => {

    /**
     * Login admin account
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
     * Login admin account
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

    app.post("/api/factory/product/delete/:id", authenFactory, async (req, res, next) => {
        factoryController.deleteProduct(req, res);
    })

}

module.exports = factory