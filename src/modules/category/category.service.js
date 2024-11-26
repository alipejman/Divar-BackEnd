const autoBind = require("auto-bind");
const categoryModel = require("./category.model");
const { isValidObjectId, Types, set } = require("mongoose");
const createHttpError = require("http-errors");
const slugify = require("slugify");
const { categoryMessage } = require("./category.message");
const optionModel = require("../option/option.model");

class CategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = categoryModel;
    this.#optionModel = optionModel;
  }

  async find() {
    const categories = await this.#model.find({
      $or: [{ parent: null }, { parent: { $exists: false } }],
    });
    return categories;
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = Array.from(new Set(
        [existCategory._id.toString()].concat(
          existCategory.parents.map((id) => id.toString())
        )
      )).map(id => new Types.ObjectId(id));
    }

    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExistBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }

    const category = await this.#model.create(categoryDto);
    return category;
  }


  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(categoryMessage.NotFound);
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(categoryMessage.NotFound);
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(categoryMessage.alreadyExist);
    return null;
  }

  async deleteCategory(id) {
    await this.checkExistById(id);
    await this.#optionModel.deleteMany({category: id}).then(async () => {
      await this.#model.deleteMany({_id : id});
    })
    return true;
  }
}

module.exports = new CategoryService();
