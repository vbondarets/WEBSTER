const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const imagesController = require('../controllers/imagesController');

router.get('/', imagesController.getImages);
router.post('/', imagesController.postImage);

module.exports = router;