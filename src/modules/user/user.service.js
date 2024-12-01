const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");

class userService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  
}
  

module.exports = new userService();
