const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const userValidation = require('../middleware/validators/validation');
const joiUserSchema = require('../helpers/joiValidation/userSchema');

router.post('/register', userValidation(joiUserSchema),authController.registration);
router.post('/login', userValidation(joiUserSchema), authController.login);
router.post('/logout', authController.logout);


module.exports = router;