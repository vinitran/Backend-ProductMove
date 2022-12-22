const relation = (db) => {
    db.product.hasOne(db.productDetail, { foreignKey: "id" });

    db.productBillDetail.hasOne(db.product, { foreignKey: "product_id" });

    db.insuranceBill.hasOne(db.product, { foreignKey: "product_id" });
    db.insuranceBill.hasMany(db.insurance, { foreignKey: "insurance_id" });
    db.insuranceBill.hasOne(db.customer, { foreignKey: "customer_id" });

    db.stock.hasMany(db.product, { foreignKey: "product_id" });
    db.stock.hasOne(db.stockDetail, { foreignKey: "stock_id" });

    db.factory.hasMany(db.stock, { foreignKey: "stock_id" });

    db.agency.hasMany(db.stock, { foreignKey: "stock_id" });

    db.insurance.hasMany(db.stock, { foreignKey: "stock_id" });

    db.accountFactory.hasOne(db.factory, { foreignKey: "factory_id" });

    db.factory.hasMany(db.stock, { foreignKey: "stock_id" });

    db.productBill.hasOne(db.agency, { foreignKey: "agency_id" });
    db.productBill.hasMany(db.productBillDetail, { foreignKey: "bill_detail_id" });

    db.accountInsurance.hasOne(db.insurance, { foreignKey: "insurance_id" });
}

module.exports = relation;
