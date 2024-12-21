const dotenv = require("dotenv");
dotenv.config();

const config = {
    MONGODB_url : process.env.MONGODB_URI,
    JWT_SECRET :process.env.JWT_SECRET,
    PORT : process.env.PORT,
};

module.exports = config;