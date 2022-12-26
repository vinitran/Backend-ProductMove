const insertModels = (db, sequelize, Sequelize) => {
    db.stock = require("../models/stock")(sequelize, Sequelize);
    db.productStockDetail = require("../models/productStockDetail")(sequelize, Sequelize);
    db.product = require("../models/product")(sequelize, Sequelize);
    db.accountAdmin = require("../models/accountAdmin")(sequelize, Sequelize);
    db.account = require("../models/account")(sequelize, Sequelize);
    db.customer = require("../models/customer")(sequelize, Sequelize);
    db.productBill = require("../models/productBill")(sequelize, Sequelize);
    db.productBillDetail = require("../models/productBillDetail")(sequelize, Sequelize);
    db.insuranceBill = require("../models/insuranceBill")(sequelize, Sequelize);
    db.stockHistory = require("../models/stockHistory")(sequelize, Sequelize);
}

module.exports = insertModels;
