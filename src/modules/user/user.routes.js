const {Router} = require('express');
const userController = require('./user.controller');
const authorizationGuard = require('../../common/guard/authorization.guard');
const router = Router();

    router.get('/whoami',authorizationGuard ,userController.whoami);


module.exports = {
    userRouter: router
}