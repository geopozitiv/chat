const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isValid = async (token) =>  {
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
        throw new Error()
    }
        return {token, user}
        
    } catch (e) {
        return {error: true, message: e}
    }
}

module.exports = isValid