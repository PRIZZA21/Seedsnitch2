const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign( 
        {_id: user._id, isAdmin: user.isAdmin, isIncubator: user.isIncubator},
        process.env.jwtPrivateKey
    )
}

module.exports =generateToken