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
     */
    /**
     * Login admin account
     * @route POST /executive-board/provide-account/{role}
     * @security JWT
     * @param {Factory.model} point.body.required - Factory account information
     * @param {string} role.path.required - Role
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/executive-board/provide-account/:role", authenAdmin, async (req, res, next) => {
        executiveBoard.providingAccount(req, res);
    })

    /**
     * Register admin account
     * @route GET /executive-board/information
     * @security JWT
     * @group Executive Board
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/executive-board/information",authenAdmin, async (req, res, next) => {
        executiveBoard.getInformation(req, res);
    })

}

module.exports = executiveBoardRoute