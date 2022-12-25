module.exports = (sequelize, DataTypes) => {
    const account = sequelize.define('account', {
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
        },
        role: {
            type: DataTypes.ENUM('factory', 'insurance', 'agency'),
            allowNull: false
        }
    },
        {
            tableName: "account",
            timestamps: true
        });

    return account;
};
