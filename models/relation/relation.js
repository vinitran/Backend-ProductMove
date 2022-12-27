const relation = (db) => {

    db.stockHistory.belongsTo(db.product, { foreignKey: "product_id" });
    db.stockHistory.belongsTo(db.stock, {as: 'sender', foreignKey: "sender_stock_id" });
    db.stockHistory.belongsTo(db.stock, {as: 'receiver', foreignKey: "receiver_stock_id" });

    db.productStockDetail.belongsTo(db.stock, { foreignKey: "stock_id" });
    db.productStockDetail.belongsTo(db.product, { foreignKey: "product_id" });

    db.product.hasOne(db.productStockDetail, { foreignKey: "product_id" });
    db.product.hasOne(db.stockHistory, { foreignKey: "product_id" });
    db.product.hasOne(db.insuranceBill, { foreignKey: "product_id" });
    db.product.hasOne(db.productBillDetail, { foreignKey: "product_id" });
    
    db.stock.hasMany(db.productStockDetail, { foreignKey: "stock_id" });
    db.stock.hasMany(db.stockHistory, { foreignKey: "receiver_stock_id" });
    db.stock.hasMany(db.stockHistory, { foreignKey: "sender_stock_id" });
    db.stock.hasMany(db.insuranceBill, { foreignKey: "stock_id" });
    db.stock.hasMany(db.productBill, { foreignKey: "stock_id" });

    db.productBill.hasMany(db.productBillDetail, { foreignKey: "product_bill_id" });
    db.productBill.belongsTo(db.stock, { foreignKey: "stock_id" });
    db.productBill.belongsTo(db.customer, { foreignKey: "customer_id" });

    db.insuranceBill.belongsTo(db.customer, { foreignKey: "customer_id" });
    db.insuranceBill.belongsTo(db.stock, { foreignKey: "stock_id" });
    db.insuranceBill.belongsTo(db.product, { foreignKey: "product_id" });

    db.customer.hasMany(db.insuranceBill, { foreignKey: "product_id" });
    db.customer.hasMany(db.productBill, { foreignKey: "customer_id" });

    db.productBillDetail.belongsTo(db.productBill, { foreignKey: "product_bill_id" });
    db.productBillDetail.belongsTo(db.product, { foreignKey: "product_id" });

}

module.exports = relation;
