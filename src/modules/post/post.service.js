const autoBind = require("auto-bind");
const postModel = require("./post.model");
const { isValidObjectId, Types, set } = require("mongoose");
const createHttpError = require("http-errors");
const slugify = require("slugify");
const { PostMessage } = require("./post.message");
const optionModel = require("../option/option.model");
const categoryModel = require("../category/category.model");

class postService {
  #model;
  #optionModel;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = postModel;
    this.#optionModel = optionModel;
    this.#categoryModel = categoryModel;
  }
  async getCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({category: categoryId});
    return options;
  }

  async create (dto) {
    return await this.#model.create(dto);

} 
async find (userId) {
  if (userId && isValidObjectId(userId)) return await this.#model.find({userId});
  throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
}
async checkExist (postId) {
  if (!postId || !isValidObjectId(postId)) throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
  const [post] = await this.#model.aggregate([
      {$match: {_id: new Types.ObjectId(postId)}},
      {
          $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user"
          }
      },
      {
          $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true
          }
      },
      {
          $addFields: {
              userMobile: "$user.mobile"
          }
      },
      {
          $project: {
              user: 0
          }
      }
  ]);
  if (!post) throw new createHttpError.NotFound(PostMessage.NotFound);
  return post;
}
async remove (postId) {
  await this.checkExist(postId);
  return await this.#model.deleteOne({_id: postId});
}

}

module.exports = new postService();
