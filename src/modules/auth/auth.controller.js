const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { authMessages } = require("./auth.messages");
const nodeEnv = require("../../common/constant/env.enum");
const cookieName = require("../../common/constant/cookie.enum");

class authController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        console.log('Received request to send OTP:', req.body);
        try {
            const { mobile } = req.body;
            const user = await this.#service.sendOTP(mobile);
            return res.json({
                message: authMessages.sendOtpSuccessfully,
                user
            });
        } catch (error) {
            console.error('Error in sendOTP:', error);
            next(error);
        }
    }
    
    
    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res.cookie(cookieName.accessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === nodeEnv.production,
                
            }).status(200).json({
                message: authMessages.loginSuccessfull,
                token
            }) 

        } catch (error) {
            next(error);
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