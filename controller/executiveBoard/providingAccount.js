const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

const factory = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
        factoryId: Joi.number().required(),
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

    if (account) {
        return res.status(400).json({
            message: "This username is available"
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    if (!password) return res.status(400).json({ message: "Invalid password" });

    await db.accountFactory.create({
        user_name: body.username,
        password: password,
        factory_id: body.factoryId
    })
    
    return res.status(200).json({
        message: "Create new factory account successfully"
    })
}

const agency = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
        agencyId: Joi.number().required(),
    });

    const { body } = req;
    const { err } = schema.validate(body);

    if (err) {
        return res.status(400).send(err);
    }

    let account = await db.accountAgency.findOne({
        where: {
            user_name: body.username
        }
    });

    if (account) {
        return res.status(400).json({
            message: "This username is available"
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    if (!password) return res.status(400).json({ message: "Invalid password" });

    await db.accountAgency.create({
        user_name: body.username,
        password: password,
        agency_id: body.agencyId
    })
    
    return res.status(200).json({
        message: "Create new agency account successfully"
    })
}

const insurance = async (req, res) => {
    let schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(8),
        insuranceId: Joi.number().required(),
    });

    const { body } = req;
    const { err } = schema.validate(body);

    if (err) {
        return res.status(400).send(err);
    }

    let account = await db.accountInsurance.findOne({
        where: {
            user_name: body.username
        }
    });

    if (account) {
        return res.status(400).json({
            message: "This username is available"
        })
    }

    const password = await bcrypt.hash(body.password, 8);

    if (!password) return res.status(400).json({ message: "Invalid password" });

    await db.accountInsurance.create({
        user_name: body.username,
        password: password,
        insurance_id: body.insuranceId
    })
    
    return res.status(200).json({
        message: "Create new insurance account successfully"
    })
}

const providingAccount = {
    factory,
    agency,
    insurance
}
module.exports = providingAccount