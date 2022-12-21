const { Sequelize } = require('sequelize');
const relation = require('../models/relation/relation')
const insertModels = require('./insertModels')
require('dotenv').config()
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    null,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.DB_PORT,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
insertModels(db, sequelize, Sequelize)
relation(db)
module.exports = sequelize;