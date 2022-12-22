const { authenAdmin } = require("../authentication/authen");
const executiveBoard = require("../controller/executiveBoard/index")

const executiveBoardRoute = (app) => {
    /**
     * @typedef Register
     * @property {string} username.required -
     * @property {string} password.required -
     */
    /**
     * Register admin account
     * @route POST /executive-board/auth/register
     * @param {Register.model} point.body.required - Register information
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/auth/register", async (req, res, next) => {
        executiveBoard.register(req, res);
    })

    /**
     * @typedef Login
     * @property {string} username.required -
     * @property {string} password.required -
     */
    /**
     * Login admin account
     * @route POST /executive-board/auth/login
     * @param {Login.model} point.body.required - Register information
     * @group Executive Board
     * @returns {object} 200 - message, accessToken, refreshToken
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/auth/login", async (req, res, next) => {
        executiveBoard.login(req, res);
    })

    /**
     * @typedef Factory
     * @property {string} username.required -
     * @property {string} password.required -
     * @property {number} factoryId.required -
     */
    /**
     * Login admin account
     * @route POST /executive-board/provide-account/factory
     * @security JWT
     * @param {Factory.model} point.body.required - Factory account information
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/provide-account/factory", authenAdmin, async (req, res, next) => {
        executiveBoard.providingFactoryAccount(req, res);
    })

    /**
     * @typedef Agency
     * @property {string} username.required -
     * @property {string} password.required -
     * @property {number} agencyId.required -
     */
    /**
     * Login admin account
     * @route POST /executive-board/provide-account/agency
     * @security JWT
     * @param {Agency.model} point.body.required - Agency account information
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/provide-account/agency", authenAdmin, async (req, res, next) => {
        executiveBoard.providingAgencyAccount(req, res);
    })

    /**
     * @typedef Insurance
     * @property {string} username.required -
     * @property {string} password.required -
     * @property {number} insuranceId.required -
     */
    /**
     * Login admin account
     * @route POST /executive-board/provide-account/insurance
     * @security JWT
     * @param {Insurance.model} point.body.required - Insurance account information
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/provide-account/insurance", authenAdmin, async (req, res, next) => {
        executiveBoard.providingInsuranceAccount(req, res);
    })

}

module.exports = executiveBoardRoute