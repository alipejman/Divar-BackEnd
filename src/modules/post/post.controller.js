const autoBind = require("auto-bind");
const HttpCodes = require("http-codes");
const postMessage = require("./post.message");
const categoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const postService = require("./post.service");
const { Types } = require("mongoose");

class postController {
  #service;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#service = postService;
    this.#categoryModel = categoryModel;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await this.#categoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(postMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await this.#categoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      res.render("./pages/admin/create-post", {
        categories,
        showBack,
        category: category?._id.toString(),
        options,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
      } = req.body;
      console.log(req.body);
      delete req.body["title_post"];
      delete req.body["description"];
      delete req.body["lat"];
      delete req.body["lng"];
      delete req.body["category"];
      const options = req.body;
      const newPost = await this.#service.create({
        title,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        image: req.files.map((file) => file.path),
        options,
      });

      return res.status(HttpCodes.CREATED).json({
        message: postMessage.created,
        post: newPost,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = new postController();
