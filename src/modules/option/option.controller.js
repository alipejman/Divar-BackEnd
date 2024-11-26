const autoBind = require("auto-bind");
const optionService = require("./option.service");
const StatusCodes = require('http-codes');
const { optionMessage } = require("./option.message");

class optionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }

    async create(req, res, next) {
        try {
            const { title, key, guid, enum: list, type, category, required } = req.body;
            await this.#service.create({ title, key, guid, enum: list, type, category, required });
            return res.status(StatusCodes.CREATED).json({
                message: optionMessage.created
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const option = await this.#service.findByCategoryId(categoryId);
            return res.json({ option });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const option = await this.#service.findById(id);
            return res.json({ option });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async find(req, res, next) {
        try {
            const options = await this.#service.find();
            res.json(options);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }


    async findByCategorySlug(req, res, next) {
        try {
            const {slug} = req.params;
            const options = await this.#service.findByCategorySlug(slug);
            return res.json(options);
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.params;
            const option = await this.#service.deleteById(id);
            return res.json({
                message: optionMessage.delete,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new optionController();
