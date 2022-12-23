module.exports = (sequelize, DataTypes) => {

    const stock = sequelize.define('stock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.ENUM('factory', 'agency', 'insurance'),
            allowNull: false,
        }
    },
    {
        tableName: "stock",
        timestamps: true
    });

    return stock;
};



