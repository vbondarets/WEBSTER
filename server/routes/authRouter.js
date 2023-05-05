const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validationMiddleware');
const { joiUserRegisterSchema, joiUserLoginSchema } = require('../helpers/joiValidation/userSchema');
const authMiddleware = require('../middleware/authMiddleware');
const mailController = require('../controllers/mailController');

router.get('/validation', authMiddleware, authController.email_activation, mailController.sendActivationMail);
router.get('/validation/:id', authMiddleware, authController.email_confirm);
router.post('/register', validation(joiUserRegisterSchema), authController.register);
router.post('/login', validation(joiUserLoginSchema), authController.login);
router.post('/logout', authController.logout);


module.exports = router;