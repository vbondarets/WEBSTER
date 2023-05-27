const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validationMiddleware');
const { joiUserRegisterSchema, joiUserLoginSchema } = require('../helpers/joiValidation/userSchema');
const authMiddleware = require('../middleware/authMiddleware');
const mailController = require('../controllers/mailController');
const authTelegramValidation = require('../middleware/authTelegramValidation');

router.get('/validation', authMiddleware, authController.email_activation, mailController.sendActivationMail);
router.get('/validation/:id', authMiddleware, authController.email_confirm);
router.get('/refresh', authController.handleRefreshToken);
router.post('/login', validation(joiUserLoginSchema), authController.login);
router.post('/telegram-login', authTelegramValidation, authController.telegram_login, authController.telegram_register);
router.post('/register', validation(joiUserRegisterSchema), authController.register);
router.post('/logout', authController.logout);

module.exports = router;