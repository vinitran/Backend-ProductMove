module.exports = (sequelize, DataTypes) => {
    const insuranceBill = sequelize.define('insurance-bill', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('received', 'pending', 'sent'),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        insurance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "insurance-bill",
        timestamps: true
    });

    return insuranceBill;
};

