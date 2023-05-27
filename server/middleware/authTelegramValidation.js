const ApiError = require('../helpers/error/ApiError');
const crypto = require("crypto");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        let data = req.body;
        const check_hash = data.hash;
        delete data.hash;
        let data_check_arr = [];
        for (let key in data) {
            data_check_arr.push(`${key}=${data[key]}`);
        }
        data_check_arr.sort();
        const data_check_string = data_check_arr.join('\n');
        const secret_key = await crypto.subtle.digest("SHA-256", process.env.BOT_TOKEN);
        const crypto_hash = crypto.createHmac('sha256', secret_key);
        const hash = crypto_hash.update(data_check_string).digest('hex');
        if (hash !== check_hash) {
            return next(ApiError.conflict('Data is NOT from Telegram.'));
        }
        if ((Date.now() / 1000 - data.auth_date) > 86400) {
            return next(ApiError.conflict('Data is outdated'));
        }
        next();
    } catch (error) {
        console.log(error)
        return next(ApiError.notAuth());
    }
}