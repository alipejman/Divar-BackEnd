const autoBind = require("auto-bind");
const categoryModel = require("./category.model");

class categoryService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = categoryModel;
    }

    async create(categoryDto) {
        
    }
}

module.exports = new categoryService();