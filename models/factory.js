module.exports = (sequelize, DataTypes) => {
    const factory = sequelize.define('factory', {
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
        tableName: "factory",
        timestamps: true
    });

    return factory;
};

