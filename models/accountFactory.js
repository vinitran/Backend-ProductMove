module.exports = (sequelize, DataTypes) => {
    const accountFactory = sequelize.define('account_factory', {
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
            tableName: "account_factory",
            timestamps: true
        });

    return accountFactory;
};

