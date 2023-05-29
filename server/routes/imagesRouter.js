const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const imagesController = require('../controllers/imagesController');

router.get('/', authMiddleware, imagesController.getImages);
router.post('/', authMiddleware, imagesController.save_image);
router.post('/telegram', imagesController.save_telegram_image);

module.exports = router;