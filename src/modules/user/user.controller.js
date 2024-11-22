const autoBind = require("auto-bind");

const nodeEnv = require("../../common/constant/env.enum");
const userService = require("./user.service");

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
}

module.exports = new userController();
