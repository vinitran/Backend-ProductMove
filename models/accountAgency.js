module.exports = (sequelize, DataTypes) => {
    const accountAgency = sequelize.define('account_agency', {
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
        agency_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "account_agency",
        timestamps: true
    });

    return accountAgency;
};

