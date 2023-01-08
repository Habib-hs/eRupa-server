const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/envConfig")

exports.hashedPassword=async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

exports.comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
}

exports.createToken = (user) => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '7d'
    } )
}