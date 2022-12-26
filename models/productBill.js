module.exports = (sequelize, DataTypes) => {
    const productBill = sequelize.define('product_bill', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bill_detail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "product_bill",
        timestamps: true
    });

    return productBill;
};

