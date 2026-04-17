const jwt = require("jsonwebtoken");
const createToken = async (payload) => {
    return jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : process.env.EXPIRES_DATE})
}

module.exports = createToken