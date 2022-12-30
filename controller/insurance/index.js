const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database');
const { param } = require('express-validator');

const login = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });

    const { body } = req;
    const { err } = schema.validate(body);

    if (err) {
        return res.status(400).send(err);
    }

    let account = await db.account.findOne({
        where: {
            user_name: body.username,
            role: 'insurance'
        }
    });

    if (!account) {
        return res.status(400).json({
            message: "This username is not available"
        })
    }

    const password = await bcrypt.compareSync(body.password, account.password);

    if (!password) return res.status(400).json({ message: "invalid password" });

    let objToHash = {
        username: account.username,
        authority: "insurance"
    }

    const accessToken = jwt.sign(objToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
    const refreshToken = jwt.sign(objToHash, process.env.REFRESH_TOKEN_SECRET);

    let okResponse = {
        message: "Login successfully",
        username: account.username,
        accessToken,
        refreshToken,
        role: "insurance"
    };
    return res.status(200).json(okResponse);
}

const getInsuranceProduct = async (req, res) => {
    const product = await db.insuranceBill.findAll({
        where: { status: 'insurance' },
    })
    return res.status(200).json(product);
}

const getInsuranceProductById = async (req, res) => {
    const product = await db.insuranceBill.findByPk(req.params.id)
    return res.status(200).json(product);
}

const exportProductToAgency = async (req, res) => {
    const { params, body } = req
    const product = await db.insuranceBill.update(
        {
            status: 'agency',
            stock_id: body.stockId
        },
        { where: { id: params.id } }
    )

    return res.status(200).json({ message: 'Success', product })
}

const exportProductToFactory = async (req, res) => {
    const { params, body } = req
    const product = await db.insuranceBill.update(
        {
            status: 'factory',
            stock_id: body.stockId
        },
        { where: { id: params.id } }
    )

    return res.status(200).json({ message: 'Success', product })
}

const insurance = {
    login,
    getInsuranceProduct,
    exportProductToAgency,
    exportProductToFactory,
    getInsuranceProductById
}
module.exports = insurance