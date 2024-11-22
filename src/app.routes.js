const {Router} = require('express');
const {authRouter} = require('./modules/auth/auth.routes');
const { userRouter } = require('./modules/user/user.routes');

const mainRouter = Router();
mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;