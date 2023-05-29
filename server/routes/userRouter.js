const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// router.get('/', authMiddleware, userController.getAll);
router.get('/', authMiddleware, userController.getProfile);
router.post('/getter', userController.getByUserName);
// router.post('/', authMiddleware, imagesController.postImage);

module.exports = router;