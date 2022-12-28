const { authen } = require("../authentication/authen");
const customerController = require("../controller/customer/index")

const customer = (app) => {

    /**
     * Login to Factory account
     * @route GET /customers
     * @security JWT
     * @group Customer
     * @returns {object} 200 - Customer
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/customers",authen, async (req, res, next) => {
        customerController.getCustomer(req, res);
    })

    /**
     * Login to Factory account
     * @route GET /customers/{id}
     * @param {number} id.path.required - Role
     * @security JWT
     * @group Customer
     * @returns {object} 200 - Customer
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/customers/:id",authen, async (req, res, next) => {
        customerController.getCustomerById(req, res);
    })
}

module.exports = customer