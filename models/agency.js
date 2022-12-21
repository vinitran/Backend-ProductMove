module.exports = (sequelize, DataTypes) => {
    const agency = sequelize.define('agency', {
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
        tableName: "agency",
        timestamps: true
    });

    return agency;
};

