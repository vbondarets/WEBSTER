const ApiError = require("../helpers/error/ApiError");
const { User } = require('../models/models');

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await User.findAll({ 
                attributes: ['id', 'email', 'login', 'full_name', 'photo']
            });
            if(users){
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
    async getById(req, res, next) {
        try {
            if(!req.params.id){
                return next(ApiError.badRequest(`User not found`));
            }
            const user = await User.findOne({ 
                attributes: ['id', 'email', 'login', 'full_name', 'photo'],
                where: { id: req.params.id },
            });
            if(user){
                return res.json(user)
            }
            else {
                return next(ApiError.badRequest(`User not found`));
            }

        } catch (error) {
            console.log(error);
            return next(ApiError.internal(`Unknown error: ${error}`));
        }
    }
}

module.exports = new UserController();