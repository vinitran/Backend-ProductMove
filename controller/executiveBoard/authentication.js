const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

const register = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });

    const { body } = req;

    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const account = await db.accountAdmin.findOne({
        where: {
            user_name: body.username
        }
    });
    if (account) {
        return res.status(400).json({
            message: "Username is available !"
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    await db.accountAdmin.create({
        user_name: body.username,
        password: password
    })
    
    return res.status(200).json({
        message: "Successfull register"
    })
}

const login = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
    });

    const { body } = req;

    const { err } = schema.validate(body);
    if (err) {
        return res.status(400).send(err);
    }

    const account = await db.accountAdmin.findOne({
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

    const objToHash = {
        username: body.username,
        authority: "admin"
    }
    const accessToken = jwt.sign(objToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
    const refreshToken = jwt.sign(objToHash, process.env.REFRESH_TOKEN_SECRET);

    const okResponse = {
        message: "Login successfully",
        username: account.username,
        accessToken,
        refreshToken
    };

    return res.status(200).json(okResponse);
}

const authentication = {
    register,
    login
}
module.exports = authentication