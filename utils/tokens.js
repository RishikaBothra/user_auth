const config = require("../config/config")

function tokens(fullname,email) {
    const token = config.JWT_SECRET.sign({
        fullname: fullname,
        email: email
    },
        config.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60

    });
    
}

module.exports = tokens