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

const createBillDetail = async ({ data, productBill }) => {
    await db.productBillDetail.create({
        product_id: data.productId,
        quantity: data.quantity,
        product_bill_id: productBill.id
    })

    await db.productStockDetail.increment(
        { quantity: -data.quantity },
        {
            where: {
                product_id: data.productId,
                stock_id: productBill.stock_id
            },
        }
    ).then(async () => {
        await db.stockHistory.create({
            sender_stock_id: productBill.stock_id,
            receiver_stock_id: null,
            product_id: data.productId,
            quantity: data.quantity
        })
    })

}

const createBill = async (req, res) => {
    const { body } = req;

    const productBill = await db.productBill.create({
        customer_id: body.customerId,
        stock_id: body.stockId
    })
    for (let i = 0; i < body.bill.length; i++) {
        const data = {
            data: body.bill[i],
            productBill
        }
        createBillDetail(data)
    }

    const bill = await db.productBill.findOne({
        where: { id: productBill.id },
        include: [{
            model: db.productBillDetail,
        }]
    })

    return res.status(200).json({
        message: "Create product Bill successfully",
    })
}

const getProductBillById = async (req, res) => {
    const productBill = await db.productBill.findByPk(req.params.id,
        { include: [db.customer, db.productBillDetail] }
    )
    if (!productBill) {
        return res.status(400).json({ message: "Can not find product bill by this id" })
    }
    return res.status(200).json(productBill)
}

const getProductBill = async (req, res) => {
    const productBill = await db.productBill.findAll({
        include: [{
            model: db.customer,
        }]
    })
    if (!productBill) {
        return res.status(400).json({ message: "Can not find product bill" })
    }
    return res.status(200).json(productBill)
}

const statisticSelledProduct = async (req, res) => {
    const selledProduct = await db.productBillDetail.findAll({
        attributes: [
            'product_id',
            [db.sequelize.fn('sum', db.sequelize.col('quantity')), 'total_quantity']
        ],
        group: ['product_id'],
    })
    return res.status(200).json(selledProduct)
}

const statisticSelledProductByMonth = async (req, res) => {
    const { params } = req
    const selledProduct = await db.productBillDetail.findAll({
        attributes: [
            'product_id',
            [db.sequelize.fn('sum', db.sequelize.col('quantity')), 'total_quantity']
        ],
        where: db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), params.month),
        group: ['product_id'],
    })
    return res.status(200).json(selledProduct)
}

const createNewInsuranceBill = async (req, res) => {
    const { body } = req
    const insuranceBill = await db.insuranceBill.create({
        customer_id: body.customerId,
        product_id: body.productId,
        status: "agency",
        quantity: body.quantity,
        stock_id: body.stockId
    })

    return res.status(200).json({
        message: "Create Insurance Bill Successfully",
        insuranceBill
    })
}


const getInsuranceBill = async (req, res) => {
    const insuranceBill = await db.insuranceBill.findAll()

    return res.status(200).json(
        insuranceBill
    )
}

const getInsuranceBillById = async (req, res) => {
    const insuranceBill = await db.insuranceBill.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.customer,
        }, {
            model: db.product,
        }]
    })

    return res.status(200).json(
        insuranceBill
    )
}

const agency = {
    login,
    createCustomer,
    createBill,
    getProductBillById,
    getProductBill,
    statisticSelledProduct,
    createNewInsuranceBill,
    getInsuranceBill,
    getInsuranceBillById,
    statisticSelledProductByMonth
}
module.exports = agency