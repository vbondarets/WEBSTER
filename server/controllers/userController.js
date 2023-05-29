const ApiError = require("../helpers/error/ApiError");
const { User } = require('../models/models');

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'login', 'full_name', 'photo']
            });
            if (users) {
                return res.json(users)
            }
            else {
                return next(ApiError.badRequest(`Users not found`));
            }
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
    async getProfile(req, res, next) {
        try {
            const { id } = req.user;
            const user = await User.findOne({
                attributes: ['id', 'email', 'login', 'full_name', 'photo'],
                where: { id },
            });
            if (!user) {
                return next(ApiError.notFound(`User not found`));
            }
            return res.json(user);

        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
    async getByUserName(req, res, next) {
        try {
            const { username } = req.body;
            console.log(username);
            const user = await User.findOne({
                attributes: ['id'],
                where: { login: username },
            });
            if (!user) {
                return next(ApiError.notFound("User does not exist."));
            }
            return res.json(user);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
}

module.exports = new UserController();