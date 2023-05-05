const ApiError = require('../helpers/error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.cookies.token;
        if (!token || !req.headers.authorization) return next(ApiError.notAuth('Token missing'));
        const access_token = req.headers.authorization.split(" ")[1];
        if (!access_token) {
            return next(ApiError.notAuth());
        }
        const decoded = jwt.verify(access_token, process.env.SECRET_KEY_ACCESS);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return next(ApiError.notAuth());
    }
}