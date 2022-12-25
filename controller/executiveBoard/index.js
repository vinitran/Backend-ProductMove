const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

const authentication = require('./authentication')

const providingAccount = async (req, res) => {
    const { body } = req;
    const { params } = req;

    let bodySchema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });
    
    
    const { err } = bodySchema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    let account = await db.account.findOne({
        where: {
            user_name: body.username,
            role: params.role
        }
    });

    if (account) {
        return res.status(400).json({
            message: "This username is available"
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    if (!password) return res.status(400).json({ message: "Invalid password" });

    await db.account.create({
        user_name: body.username,
        password: password,
        role: params.role
    })
    
    return res.status(200).json({
        message: "Create new factory account successfully"
    })
}

const executiveBoard = {
    register: authentication.register,
    login: authentication.login,
    providingAccount
}
module.exports = executiveBoard