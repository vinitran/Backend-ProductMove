const { authenFactory } = require("../authentication/authen");
const insuranceController = require("../controller/insurance/index")

const insurance = (app) => {

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

}

module.exports = insurance