const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { authMessages } = require("./auth.messages");

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
            await this.#service.checkOTP(mobile, code);
            return {
                message: authMessages.loginSuccessfull,
            }
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();