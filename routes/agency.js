const { authenFactory } = require("../authentication/authen");
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

}

module.exports = agency