const autoBind = require("auto-bind");

const nodeEnv = require("../../common/constant/env.enum");
const userService = require("./user.service");
const User = require('../user/user.model');
class userController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserCount(req, res) {
    try {
        const userCount = await User.countDocuments(); // تعداد کل کاربران
        res.render('pages/admin/dashboard', { userCount }); // ارسال تعداد کاربران به قالب
    } catch (error) {
        console.error(error);
        res.status(500).send('خطا در دریافت تعداد کاربران');
    }
}



}

module.exports = new userController();
