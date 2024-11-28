const autoBind = require("auto-bind");
const postService = require("./post.service");
const StatusCodes = require('http-codes');
const { postMessage } = require("./post.message");

class postController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = postService;
    }

    async createPostPage(req, res, next) {
        try {
           res.render('./pages/admin/create-post')
        } catch (error) {
            next(error);
        }
    }

    
    
}

module.exports = new postController();
