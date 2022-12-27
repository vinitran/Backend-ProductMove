module.exports = (sequelize, DataTypes) => {
    const productBillDetail = sequelize.define('product_bill_detail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_bill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "product_bill_detail",
        timestamps: true
    });

    return productBillDetail;
};

