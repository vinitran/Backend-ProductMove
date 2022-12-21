module.exports = (sequelize, DataTypes) => {
    const insurance = sequelize.define('insurance', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stock_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "insurance",
        timestamps: true
    });

    return insurance;
};

