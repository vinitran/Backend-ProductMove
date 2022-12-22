const authenToken = require("../authentication/authen");
const executiveBoardRoute = require("./executiveBoard")

const router = (app) => {
    executiveBoardRoute(app)
}

module.exports = router;