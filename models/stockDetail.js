module.exports = (sequelize, DataTypes) => {
    const stockDetail = sequelize.define('stock_detail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "stock_detail",
        timestamps: true
    });

    return stockDetail;
};

