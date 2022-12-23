const { authen } = require("../authentication/authen");
const stock = require("../controller/stock/index")

const stockRoute = (app) => {
    
    /**
     * Get Stocks by category
     * @route GET /stocks/category/{category}
     * @security JWT
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/stocks/category/:category", authen, async (req, res, next) => {
        stock.getStocksByCategory(req, res);
    });

    /**
     * Insert product to stock
     * @route GET /stocks/{id}
     * @security JWT
     * @param {number}  id.path.required - Product Id
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/stocks/:id", authen, async (req, res, next) => {
        stock.getStockById(req, res);
    });

    /**
     * Insert product to stock
     * @route POST /stocks/{category}
     * @security JWT
     * @param {string}  category.required - Category
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/stocks/:category", authen, async (req, res, next) => {
        stock.createStockByCategory(req, res);
    });

}

module.exports = stockRoute