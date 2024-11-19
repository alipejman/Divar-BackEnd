const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { authMessages } = require("./auth.messages");
const {randomInt} = require('crypto');
class authService {
    #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile) {
    const now = new Date().getTime();
    const user = await this.#model.findOne({mobile});
    const otp = {
        code: randomInt(10000, 99999),
        expiresIn: expiresIn = now + (1000*60*2),
    }
    if(!user) {
        const newUser = await this.#model.create({mobile,otp});
        return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
        throw new createHttpError.BadRequest(authMessages.otpCodeNotExpireIn);
    };

    user.otp = otp;
    await user.save();
  }
  async checkOTP(mobile, code) {}
  async logout() {}

  async checkExistByMobile(mobile){
    const user = await this.#model.findOne({mobile});
    if(!user) throw new createHttpError.NotFound(authMessages.notFound);
    return user;
  }
}

module.exports = new authService();
