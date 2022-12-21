module.exports = (sequelize, DataTypes) => {
    const accountAgency = sequelize.define('account_agency', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

