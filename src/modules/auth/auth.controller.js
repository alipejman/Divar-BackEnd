const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { authMessages } = require("./auth.messages");
const nodeEnv = require("../../common/constant/env.enum");
const cookieName = require("../../common/constant/cookie.enum");
const optionModel = require("../option/option.model");

class authController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            const otpCode = await this.#service.sendOTP(mobile);
            return res.json({
                message: authMessages.SendOtpSuccessfully,
                otp: otpCode.code
            });
        } catch (error) {
            next(error);
        }
    }
    
    
    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res.cookie(cookieName.accessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === nodeEnv.Production 
            }).status(200).json({
                message: authMessages.loginSuccessfull,
            });
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            res.clearCookie(cookieName.accessToken).status(200);
            return res.render("./pages/auth/login.ejs")
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();