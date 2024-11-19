const {Router} = require('express');
const {authRouter} = require('./modules/auth/auth.routes');

const mainRouter = Router();
mainRouter.use('/auth', authRouter);

module.exports = mainRouter;