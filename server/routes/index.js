const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const imagesRouter = require('./imagesRouter');

router.use('/auth', authRouter);
router.use('/images', imagesRouter);


module.exports = router;