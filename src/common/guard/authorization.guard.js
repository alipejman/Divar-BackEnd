const createHttpError = require("http-errors");
const authorizationMessages = require("../messages/authorization-Messages");
const jwt = require("jsonwebtoken");
const userModel = require("../../modules/user/user.model");
require('dotenv').config();

const authorizationGuard = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if (!token) throw new createHttpError.Unauthorized(authorizationMessages.login);
        
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (data?.id) {
            const user = await userModel.findById(data.id, { accessToken: 0, otp: 0, __v: 0, verifiedMobile: 0, updatedAt: 0 }).lean();
            if (!user) throw new createHttpError.Unauthorized(authorizationMessages.notFoundAccount);
            
            req.user = user;
            return next();
        }
        
        throw new createHttpError.Unauthorized(authorizationMessages.invaliToken);
    } catch (error) {
        // در اینجا به جای next(error)، صفحه لاگین را رندر کنید
        res.locals.layout = 'layouts/auth/main'; // نام layout مورد نظر
        return res.render('pages/auth/login', { error: error.message }); // 'login' نام فایل view شماست
    }
}

module.exports = authorizationGuard;
