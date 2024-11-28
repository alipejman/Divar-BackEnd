const {Router} = require('express');
const {authRouter} = require('./modules/auth/auth.routes');
const { userRouter } = require('./modules/user/user.routes');
const { categoryRouter } = require('./modules/category/category.routes');
const { optionRouter } = require('./modules/option/option.routes');
const { postRouter } = require('./modules/post/post.routes');

const mainRouter = Router();
mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/option', optionRouter);
mainRouter.use('/post', postRouter);
mainRouter.get('/', (req, res) => {
    res.locals.layout = './layouts/web/main';
    res.render('./pages/home/index');
})
mainRouter.get('/admin', (req, res) => {
    res.render('./pages/admin/dashboard');
})
mainRouter.get('/auth/login', (req, res) => {
    res.locals.layout = './layouts/auth/main';
    res.render('./pages/auth/login');
})

module.exports = mainRouter;