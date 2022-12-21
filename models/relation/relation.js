const relation = (db) => {
    db.product.hasOne(db.productDetail, { foreignKey: "id" });

    db.productBillDetail.hasOne(db.product, { foreignKey: "product_id" });

    db.insuranceBill.hasOne(db.product, { foreignKey: "product_id" });
    db.insuranceBill.hasOne(db.insurance, { foreignKey: "insurance_id" });
    db.insuranceBill.hasOne(db.customer, { foreignKey: "customer_id" });

    db.stock.hasMany(db.product, { foreignKey: "product_id" });
    db.stock.hasOne(db.stockDetail, { foreignKey: "stock_id" });

    db.factory.hasMany(db.stock, { foreignKey: "stock_id" });

    db.agency.hasMany(db.stock, { foreignKey: "stock_id" });

    db.accountFactory.hasOne(db.factory, { foreignKey: "factory_id" });
    
    db.insurance.hasMany(db.stock, { foreignKey: "stock_id" });

    db.accountInsurance.hasOne(db.insurance, { foreignKey: "insurance_id" });

}

module.exports = relation;
