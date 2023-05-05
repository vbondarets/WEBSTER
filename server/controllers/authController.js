const ApiError = require("../helpers/error/ApiError");
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const { generate_tokens, clear_cookies, verify } = require("../helpers/jwtWorker/jwtController");

class AuthController {
    async register(req, res, next) {
        try {
            const { password, email, login, first_name, last_name } = req.body;
            if (await User.findOne({ where: { email } })) {
                return next(ApiError.conflict("Email already used."));
            }
            if (await User.findOne({ where: { login } })) {
                return next(ApiError.conflict("Login already used."));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ password: hashPassword, email, login, first_name, last_name });
            return res.json(generate_tokens(user.id, user.confirmed, user.role, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ where: { login } });
            if (!user) {
                return next(ApiError.notFound("User does not exist."));
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(ApiError.conflict("Wrong data."));
            }
            return res.json(generate_tokens(user.id, user.confirmed, user.role, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async logout(req, res, next) {
        try {
            const cookies = req.cookies;
            if (cookies?.token) {
                clear_cookies(req, res);
            }
            return res.json({ message: "Exit successed." });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async email_activation(req, res, next) {
        try {
            const { id } = req.user;
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.notFound("User does not exist!"));
            }
            req.user.hash = await bcrypt.hash(String(id), 5);
            req.user.email = user.email;
            next();
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async email_confirm(req, res, next) {
        try {
            const { id, role } = req.user;
            const crypted_id = req.params.id;
            if (!bcrypt.compareSync(String(id), decodeURIComponent(crypted_id))) {
                return next(ApiError.badRequest("Ling belongs to other user!"));
            }
            await User.update({ confirmed: true }, { where: { id } });
            generate_tokens(id, true, role);
            return res.json({ message: "Email confirm complete!" }); //wefwfwef
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async handleRefreshToken(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) return next(ApiError.notAuth());
            const { id, confirmed, role } = verify(token);
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.notAuth("User does not exist!"));
            }
            return res.json(generate_tokens(id, confirmed, role, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.notAuth());
        }
    }

}

module.exports = new AuthController();