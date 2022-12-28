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
        // include: db.productStockDetail
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
    const { params, body } = req;

    const schema = Joi.object({
        id: Joi.number().required(),
    });
    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const stock = await db.stock.create({
        category: params.category,
        name: body.name,
        address: body.address
    })

    return res.status(200).json({ 
        message: "Create new stock successfully" ,
        stock
    });
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

const getProductInStockById = async (req, res) => {
    const {params} = req
    const stock = await db.stock.findOne({
        attributes:['id'],
        where: {id: params.id},
        include: [{
            model: db.productStockDetail,
        }],
    })

    return res.status(200).json(stock)
}



const stock = {
    getStocksByCategory,
    getStockById,
    createStockByCategory,
    getSendHistoryByCategory,
    getReceiverHistoryByCategory,
    getProductInStockById
}

module.exports = stock