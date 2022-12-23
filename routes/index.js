const executiveBoardRoute = require("./executiveBoard")
const factoryRoute = require("./factory")
const stockRoute = require("./stock")

const router = (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({message: 'hello'})
    })
    executiveBoardRoute(app)
    factoryRoute(app)
    stockRoute(app)
}

module.exports = router;