const executiveBoardRoute = require("./executiveBoard")
const factory = require("./factory")

const router = (app) => {
    executiveBoardRoute(app)
    factory(app)
}

module.exports = router;