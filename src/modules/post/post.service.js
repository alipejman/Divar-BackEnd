const autoBind = require("auto-bind");
const postModel = require("./post.model");
const { isValidObjectId, Types, set } = require("mongoose");
const createHttpError = require("http-errors");
const slugify = require("slugify");
const { postMessage } = require("./post.message");

class postService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = postModel;
  }
  async create() {
   
  }
}

module.exports = new postService();
