const config = require("../config/config")
const jwt = require("jsonwebtoken");

function tokens(fullname,email) {
    const token = jwt.sign({
        fullname: fullname,
        email: email
    },
        config.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60

    });
    return token;
}

module.exports = tokens