module.exports = (sequelize, DataTypes) => {
    const productStockDetail = sequelize.define('product_stock_detail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "product_stock_detail",
        timestamps: true
    });

    return productStockDetail;
};

