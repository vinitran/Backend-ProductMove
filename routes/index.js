const executiveBoardRoute = require("./executiveBoard")
const factoryRoute = require("./factory")
const agencyRoute = require("./agency")
const insuranceRoute = require("./insurance")

const stockRoute = require("./stock")
const productRoute = require("./product")

const router = (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({message: 'hello'})
    })
    executiveBoardRoute(app)
    factoryRoute(app)
    agencyRoute(app)
    insuranceRoute(app)

    stockRoute(app)
    productRoute(app)
}

module.exports = router;