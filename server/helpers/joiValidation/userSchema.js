const Joi = require('joi');

const joiUserRegisterSchema = Joi.object({
    email: Joi.string().min(5).max(50).email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ua'] }
    }).required(),
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required(),
    password_conf: Joi.string().min(3).required().valid(Joi.ref('password')),
    full_name: Joi.string().min(4).max(128).required(),
});

const joiUserLoginSchema = Joi.object({
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required(),
});

module.exports = {
    joiUserRegisterSchema,
    joiUserLoginSchema,
};