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
        product_detail: {
            name: body.name,
            price: body.price,
            image_url: body.imageUrl,
            product_line: body.productLine,
            description: body.description,
        },
        code: body.code
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

const factory = {
    login,
    createProduct,
    deleteProduct
}
module.exports = factory