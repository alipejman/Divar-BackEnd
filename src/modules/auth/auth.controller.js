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
            const otpCode = await this.#service.sendOTP(mobile); // فرض بر این است که sendOTP کد OTP را برمی‌گرداند
            return res.json({
                message: authMessages.SendOtpSuccessfully,
                otp: otpCode // اضافه کردن کد OTP به پاسخ
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
            return res.clearCookie(cookieName.accessToken).status(200).json({
                message: 'Log Out Seccessfylly..'
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();