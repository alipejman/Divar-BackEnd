const autoBind = require("auto-bind");
const postModel = require("./post.model");
const { isValidObjectId, Types, set } = require("mongoose");
const createHttpError = require("http-errors");
const slugify = require("slugify");
const { postMessage } = require("./post.message");
const optionModel = require("../option/option.model");

class postService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = postModel;
    this.#optionModel = optionModel;
  }
  async getCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({category: categoryId});
    return options;
  }

  async create(dto) {
    return await this.#model.create(dto)
  }
}

module.exports = new postService();
