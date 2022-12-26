module.exports = (sequelize, DataTypes) => {
    const stockHistory = sequelize.define('stock_history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver_stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:  {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "stock_history",
        timestamps: true
    });

    return stockHistory;
};

