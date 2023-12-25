const jwt = require('jsonwebtoken');
const secret = "secret"
const generateToken = (user) => {

    const token = jwt.sign(user,secret,{
        expiresIn: '1h'
    })

    return token
}

const verifyToken = (token) => {

    const decoded = jwt.verify(token,secret)
    return decoded

}

module.exports = {
    generateToken,
    verifyToken
}