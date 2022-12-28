const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

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
            role: 'agency'
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
        authority: "agency"
    }

    const accessToken = jwt.sign(objToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
    const refreshToken = jwt.sign(objToHash, process.env.REFRESH_TOKEN_SECRET);

    let okResponse = {
        message: "Login successfully",
        username: account.username,
        accessToken,
        refreshToken,
        role: "agency"
    };
    return res.status(200).json(okResponse);
}

const createCustomer = async (req, res) => {
    const { body } = req;

    let schema = Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
    });
    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const customer = await db.customer.create({
        name: body.name,
        phone_number: body.phoneNumber,
        address: body.address
    })

    return res.status(200).json({
        message: "Create new customer successfully",
        customer
    })
}

const sell = async (req, res) => {

}

const createBillDetail = async (req, res) => {
    const { body, params } = req;

    let schema = Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
    });
    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const productBillDetail = await db.productBillDetail.create({
        product_id: body.productId,
        quantity: body.quantity,
        product_bill_id: params.id
    })

    return res.status(200).json({message: "Create detail bill successfully", productBillDetail})
}

const createBill = async (req, res) => {
    const { body } = req;

    let schema = Joi.object({
        customerId: Joi.number().required(),
        stockId: Joi.number().required(),
    });
    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const productBill = await db.productBill.create({
        customer_id: body.customerId,
        stock_id: body.stockId
    })

    return res.status(200).json({
        message: "Create product Bill successfully",
        productBill
    })
}

const getProductBillById = async(req, res) => {
    const productBill = await db.productBill.findByPk(req.params.id,
        {include: db.productBillDetail}
        )
    if (!productBill) {
        return res.status(400).json({message: "Can not find product bill by this id"})
    }
    return res.status(200).json(productBill)
}

const getProductBill = async (req, res) => {
    const productBill = await db.productBill.findAll()
    if (!productBill) {
        return res.status(400).json({message: "Can not find product bill"})
    }
    return res.status(200).json(productBill)
}

const agency = {
    login,
    createCustomer,
    createBillDetail,
    createBill,
    getProductBillById,
    getProductBill
}
module.exports = agency