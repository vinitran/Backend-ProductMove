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
        where: { category: params.category },
        include: db.productStockDetail
    })

    if (!stocks) {
        return res.status(200).json({ message: "The factory stock is unavailable" });
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
        },
        include: db.productStockDetail
    })

    if (!stocks) {
        return res.status(200).json({ message: "The factory stock is unavailable" });
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

    await db.stock.create({
        category: params.category,
        name: "admin",
        address: "admin"
    })

    return res.status(200).json({ message: "Create new stock successfully" });
}

const getSendHistoryByCategory = async (req, res) => {
    const schema = Joi.object({
        category: Joi.string().required(),
    });

    const { params } = req;

    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const history = await db.stockHistory.findAll({
        include: [{
            model: db.stock,
            where: {
                category: params.category,
            },
            as: "sender"
        }, {
            model: db.stock,
            as: "receiver"
        }]
    })

    return res.status(200).json(history);
}

const getReceiverHistoryByCategory = async (req, res) => {
    const schema = Joi.object({
        category: Joi.string().required(),
    });

    const { params } = req;

    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const history = await db.stockHistory.findAll({
        include: [{
            model: db.stock,
            as: "sender"
        },
        {
            model: db.stock,
            where: {
                category: params.category,
            },
            as: "receiver"
        }]
    })

    return res.status(200).json(history);
}



const stock = {
    getStocksByCategory,
    getStockById,
    createStockByCategory,
    getSendHistoryByCategory,
    getReceiverHistoryByCategory,
}

module.exports = stock