require('dotenv').config()

module.exports = {
    DATABASE_URL:process.env.DATABASE_URL,
    PORT: process.env.PORT,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_USER: process.env.DATABASE_USER,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
}