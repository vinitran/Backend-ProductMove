const insertModels = (db, sequelize, Sequelize) => {
    db.stock = require("../models/stock")(sequelize, Sequelize);
    db.stockDetail = require("../models/stockDetail")(sequelize, Sequelize);
    db.product = require("../models/product")(sequelize, Sequelize);
    db.productDetail = require("../models/productDetail")(sequelize, Sequelize);
    db.accountAdmin = require("../models/accountAdmin")(sequelize, Sequelize);
    db.accountFactory = require("../models/accountFactory")(sequelize, Sequelize);
    db.factory = require("../models/factory")(sequelize, Sequelize);
    db.accountAgency = require("../models/accountAgency")(sequelize, Sequelize);
    db.agency = require("../models/agency")(sequelize, Sequelize);
    db.accountInsurance = require("../models/accountInsurance")(sequelize, Sequelize);
    db.insurance = require("../models/insurance")(sequelize, Sequelize);
    db.customer = require("../models/customer")(sequelize, Sequelize);
    db.productBill = require("../models/productBill")(sequelize, Sequelize);
    db.productBillDetail = require("../models/productBillDetail")(sequelize, Sequelize);
    db.insuranceBill = require("../models/insuranceBill")(sequelize, Sequelize);
}

module.exports = insertModels;
