module.exports = (sequelize, DataTypes) => {
    const accountAdmin = sequelize.define('account_admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "account_admin",
        timestamps: true
    });

    return accountAdmin;
};

