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
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return {
                message: authMessages.sendOtpSuccessfully
            }
        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req, res, next) {
        try {
            
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