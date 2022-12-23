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

    let account = await db.accountFactory.findOne({
        where: {
            user_name: body.username
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
        authority: "factory"
    }

    const accessToken = jwt.sign(objToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
    const refreshToken = jwt.sign(objToHash, process.env.REFRESH_TOKEN_SECRET);

    let okResponse = {
        message: "Login successfully",
        username: account.username,
        accessToken,
        refreshToken
    };
    return res.status(200).json(okResponse);
}

const createProduct = async (req, res) => {
    const schema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        imageUrl: Joi.string().required(),
        productLine: Joi.string().required(),
        description: Joi.string().required()
    });

    const { body } = req;

    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const product = await db.product.create({
        code: body.code
    })

    await db.productDetail.create({
        id: product.id,
        name: body.name,
        price: body.price,
        image_url: body.imageUrl,
        product_line: body.productLine,
        description: body.description,
    })

    return res.status(200).json({
        message: "Successfull create new product"
    })
}

const deleteProduct = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().required(),
    });

    const { params } = req;

    const { err } = schema.validate(params);
    if (err) {
        return res.status(400).send(err);
    }

    const product = await db.product.findByPk(params.id)
    const productDetail = await db.productDetail.findByPk(params.id)

    await product.destroy();
    await productDetail.destroy();

    return res.status(200).json({
        message: "Delete product successfully"
    })
}

const insertProductToStock = async (req, res) => {
    const schema = Joi.object({
        stockId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
    });

    const { body } = req;

    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const stock = await db.stock.findByPk(body.stockId)

    if (!stock) {
        return res.status(401).json({ message: "This stock id is not avaiable" });

    }

    const [, created] = await db.productStockDetail.findOrCreate({
        where: {
            id: body.stockId,
            product_id: body.productId
        },
        defaults: {
            product_id: body.productId,
            stock_id: stock.id,
            quantity: body.quantity
        }
    })
    if (created == false) {
        await db.productStockDetail.increment(
            {
                quantity: body.quantity
            },
            {
                where: {
                    product_id: body.productId,
                    stock_id: stock.id
                },
            })
    }

    return res.status(200).json({ message: "Insert product to stock successfully" });
}

const exportProductToAgency = async (req, res) => {
    const schema = Joi.object({
        factoryStockId: Joi.number().required(),
        agencyStockId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
    });

    const { body } = req;

    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const factoryStock = await db.stock.findOne({
        where: {id: body.factoryStockId}
    })
    if (!factoryStock) {
        return res.status(401).json({ message: "This factory stock is not avaiable" });
    }

    const agencyStock = await db.stock.findOne({
        where: {id: body.agencyStockId}
    })
    if (!agencyStock) {
        return res.status(401).json({ message: "This agency stock is not avaiable" });
    }
    console.log(factoryStock.dataValues.id)

    await db.productStockDetail.increment(
        {
            quantity: -body.quantity
        },
        {
            where: {
                product_id: body.productId,
                stock_id: factoryStock.dataValues.id
            },
        })

    const [, created] = await db.productStockDetail.findOrCreate({
        where: {
            id: agencyStock.dataValues.id,
            product_id: body.productId
        },
        defaults: {
            product_id: body.productId,
            stock_id: agencyStock.dataValues.id,
            quantity: body.quantity
        }
    })
    if (created == false) {
        await db.productStockDetail.increment(
            {
                quantity: body.quantity
            },
            {
                where: {
                    product_id: body.productId,
                    stock_id: agencyStock.dataValues.id
                },
            })
    }

    return res.status(200).json({ message: "Export product from factory to agency successfully" });
}

const factory = {
    login,
    createProduct,
    deleteProduct,
    insertProductToStock,
    exportProductToAgency
}
module.exports = factory