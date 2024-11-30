const autoBind = require("auto-bind");
const StatusCodes = require('http-codes');
const  postMessage  = require("./post.message");
const categoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const postService = require("./post.service");

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
            let {slug} = req.query;
            let showBack = false;
            let match = {parent: null};
            let options;
            if(slug) {
                slug = slug.trim();
                const category = await this.#categoryModel.findOne({slug});
                if (!category) throw new createHttpError.NotFound(postMessage.NotFound);
                options = await this.#service.getCategoryOptions(category._id);
                if(options.length === 0) options = null;
                showBack = true;
                match = {
                    parent: category._id
                };
            }
            const categories = await this.#categoryModel.aggregate([{
                $match: match
            }]);
           res.render('./pages/admin/create-post', {categories, showBack, options})
        } catch (error) {
            next(error);
        }
    }

    
    
}

module.exports = new postController();
