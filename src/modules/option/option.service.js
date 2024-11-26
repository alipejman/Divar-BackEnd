const autoBind = require("auto-bind");
const optionModel = require("./option.model");
const createHttpError = require("http-errors");
const { optionMessage } = require("./option.message");
const { default: slugify } = require("slugify");
const { isTrue, isFalse } = require("../../common/utils/function");
const categoryService = require('../category/category.service');
class optionService {
  #model;
  #categoryService
  constructor() {
    autoBind(this);
    this.#model = optionModel;
    this.#categoryService = categoryService;

  }

  async find() {
    const options = await this.#model
      .find(
        {},
        {
          __v: 0,
        },
        { sort: { _id: -1 } }
      )
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }

  async create(optionDto) {
    const category = await this.#categoryService.checkExistById(optionDto.category);
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    }).toLowerCase();
    await this.alreadyExistByKeyAndCategory(optionDto.key, category._id);
    if (optionDto?.enum && typeof optionDto?.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (Array.isArray(optionDto.enum)) {
      optionDto.enum = [];
    }
    if(isTrue(optionDto?.required)) optionDto.required = true;
    if(isFalse(optionDto?.required)) optionDto.required = false;
    const option = await this.#model.create(optionDto);
    return option;
  }

  async findById(id) {
    return await this.checkExistById(id);
  }

  async findByCategoryId(id) {
    return await this.#model
      .find({ category: id }, {__v: 0})
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }

  async checkExistById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(optionMessage.NotFound);
    return option;
  }

  async alreadyExistByKeyAndCategory(key, category) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist) throw new createHttpError.Conflict(optionMessage.alreadyExist);
    return null;
  }


  async deleteById(id) {
    await this.checkExistById(id);
    return await this.#model.deleteOne({_id: id});
  }


  async findByCategorySlug(slug) {
    const option = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: 'category',
          foreignField: "_id",
          as: "category"
        }
      },
      {$unwind: '$category'},
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        }
      },
      {$project: {
        category: 0,
        __v:0
      }},
    ])
    return option;
  }
}

module.exports = new optionService();
