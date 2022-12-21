module.exports = (sequelize, DataTypes) => {
    const accountInsurance = sequelize.define('account_insurance', {
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
        insurance_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        tableName: "account_insurance",
        timestamps: true
    });

    return accountInsurance;
};

