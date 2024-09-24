const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
function authMiddleware(req, res, next) {
    try {
        let token = req.headers.authorization
        if (token) {
            let tokens = token.split(" ")[1];
            let user = jwt.verify(tokens, process.env.SECRET_KEY)
            req.userId = user.id;
        }
        else {
            return res.status(400).json({
                message: "Unauthorized User",
                success: false,
            })
        }
        next();
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Unauthorized User",
            success: false,
        })
    }
}
module.exports = { authMiddleware };