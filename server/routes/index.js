const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const imagesRouter = require('./imagesRouter');
const userRouter = require('./userRouter');

router.use('/auth', authRouter);
router.use('/images', imagesRouter);
router.use('/user', userRouter);


module.exports = router;