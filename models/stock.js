module.exports = (sequelize, DataTypes) => {

    const stock = sequelize.define('stock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('factory', 'agency', 'insurance'),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "stock",
        timestamps: true
    });

    return stock;
};



