const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../database/database')

const getCustomer = async (req, res) => {
    const customer = await db.customer.findAll()
    return res.status(200).json(customer)
}

const getCustomerById = async (req, res) => {
    const customer = await db.customer.findByPk(req.params.id)
    if (!customer) {
        return res.status(400).json({message: "Could not find customer by this id"})
    }
    return res.status(200).json(customer)
}


const agency = {
    getCustomer,
    getCustomerById

}
module.exports = agency