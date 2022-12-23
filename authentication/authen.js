const jwt = require("jsonwebtoken");

require("dotenv");

const authen = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) res.sendStatus(403);
        return
    });
    next();
}

const authenAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        if (data.authority != "admin") {
            return res.status(401).json({ message: "Can be allowed to access admin Api" })
        }
    });
    next();
}

const authenAgency = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        if (data.authority != "agency") {
            return res.status(401).json({ message: "Can be allowed to access admin Api" })
        }
    });
    next();
}

const authenInsurance = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        if (data.authority != "insurance") {
            return res.status(401).json({ message: "Can be allowed to access admin Api" })
        }
    });
    next();
}

const authenFactory = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        if (data.authority != "factory") {
            return res.status(401).json({ message: "Can be allowed to access admin Api" })
        }
    });
    next();
}

module.exports = {
    authen,
    authenAdmin,
    authenAgency,
    authenInsurance,
    authenFactory
};