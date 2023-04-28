const jwt = require('jsonwebtoken');

function JwtGenerator (params) {
    const token = jwt.sign(
        {...params},
        process.env.SECRET_KEY,
        { expiresIn: '5040h' }
    );
    console.log(token);
    return token;
}

module.exports = JwtGenerator;