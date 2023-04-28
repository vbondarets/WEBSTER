const jwt = require('jsonwebtoken');

const resetJwtGenerator = (id, email) => {
    const token = jwt.sign(
        { id: id, email: email },
        process.env.SECRET_KEY_FOR_EMAIL,
        { expiresIn: '5040h' }
    );
    return token;
}

module.exports = resetJwtGenerator;