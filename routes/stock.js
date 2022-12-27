const { authen } = require("../authentication/authen");
const stock = require("../controller/stock/index")

const stockRoute = (app) => {
    
    /**
     * Get Stocks by category
     * @route GET /stocks/category/{category}
     * @security JWT
     * @param {string}  category.path.required - category
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
     * @route GET /stocks/history/category/{category}/send
     * @security JWT
     * @param {string}  category.path.required - Product Id
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/stocks/history/category/:category/send", authen, async (req, res, next) => {
        stock.getSendHistoryByCategory(req, res);
    });

    /**
     * Insert product to stock
     * @route GET /stocks/history/category/{category}/receive
     * @security JWT
     * @param {string}  category.path.required - Product Id
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.get("/api/stocks/history/category/:category/receive", authen, async (req, res, next) => {
        stock.getReceiverHistoryByCategory(req, res);
    });

    /**
     * @typedef StockInfor
     * @property {string} name.required -
     * @property {string} address.required -
     */
    /**
     * Insert product to stock
     * @route POST /stocks/{category}
     * @security JWT
     * @param {string}  category.path.required - Category
     * @param {StockInfor.model}  point.body.required - Category
     * @group Stock
     * @returns {object} 200 - message
     * @returns {Error}  default - Unexpected error
     */

    app.post("/api/stocks/:category", authen, async (req, res, next) => {
        stock.createStockByCategory(req, res);
    });

}

module.exports = stockRoute