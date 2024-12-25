const dotenv = require("dotenv");
dotenv.config();

const config = {
    MONGODB_url : process.env.MONGODB_URI,
    JWT_SECRET :process.env.JWT_SECRET,
    PORT : process.env.PORT,
    URL : process.env.URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.PASSWORD,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT
};

module.exports = config;