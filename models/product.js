module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: "product",
        timestamps: true
    });

    return product;
};

