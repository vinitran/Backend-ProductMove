const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

const getProduct = async (req, res) => {
    let product = await db.product.findAll();

    if (!product) {
        return res.status(400).json({
            message: "This product is not available"
        })
    }

    return res.status(200).json(product);
}

const getProductById = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().required(),
    });

    const { params } = req;
    const { err } = schema.validate(params);

    if (err) {
        return res.status(400).send(err);
    }

    let product = await db.product.findOne({
        where: {
            id: params.id
        }
    });

    if (!product) {
        return res.status(400).json({
            message: "This product is not available"
        })
    }

    return res.status(200).json(product);
}

const createProduct = async (req, res) => {
    const schema = Joi.object({
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

    await db.product.create({
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
    await product.destroy();

    return res.status(200).json({
        message: "Delete product successfully"
    })
}


const product = {
    getProduct,
    getProductById,
    createProduct,
    deleteProduct
}
module.exports = product