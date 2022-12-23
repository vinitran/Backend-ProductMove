const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')


const getStocksByCategory = async (req, res) => {
    const { params } = req;
    console.log(params)
    const schema = Joi.object({
        category: Joi.string().required(),
    });
    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const stocks = await db.stock.findAll({
        where: {category: params.category}
    })

    if (!stocks) {
        return res.status(200).json({message: "The factory stock is unavailable"});
    }

    return res.status(200).json(stocks);
}

const getStockById = async (req, res) => {
    const { params } = req;

    const schema = Joi.object({
        id: Joi.number().required(),
    });
    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const stocks = await db.stock.findAll({
        where: {
            category: "factory",
            id: params.id
        }
    })

    if (!stocks) {
        return res.status(200).json({message: "The factory stock is unavailable"});
    }

    return res.status(200).json(stocks);
}

const createStockByCategory = async (req, res) => {
    const { params } = req;

    const schema = Joi.object({
        id: Joi.number().required(),
    });
    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const stock = await db.stock.create({
        category: params.category
    })

    return res.status(200).json({message: "Create new stock successfully"});
}

const stock = {
    getStocksByCategory,
    getStockById,
    createStockByCategory
}

module.exports = stock