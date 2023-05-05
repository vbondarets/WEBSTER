const jwt = require('jsonwebtoken');

const cookieOptions = {
    secure: true, //need true
    httpOnly: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
};

const generateJwt = (id, confirmed, role, time, key) => {
    return jwt.sign({ id, confirmed, role },
        key,
        { expiresIn: time }
    );
}

const generate_tokens = (id, confirmed, role, req, res) => {
    const cookies = req.cookies;
    const accessToken = generateJwt(id, confirmed, role, '30s', process.env.SECRET_KEY_ACCESS);
    const newRefreshToken = generateJwt(id, confirmed, role, '24h', process.env.SECRET_KEY_REFRESH); ///back time to 60s
    if (cookies?.token) {
        clear_cookies(req, res);
    }
    res.cookie('token', newRefreshToken, cookieOptions);
    return { jwt_token: accessToken };
}

const clear_cookies = (req, res) => {
    return res.clearCookie('token', cookieOptions);
}

const verify = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY_REFRESH);
}


module.exports = {
    generate_tokens,
    clear_cookies,
    verify,
};