const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', authMiddleware,userController.getAll);
router.get('/:id', authMiddleware,userController.getById);
// router.post('/', authMiddleware, imagesController.postImage);

module.exports = router;