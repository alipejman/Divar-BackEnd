const { Types, model } = require("mongoose");
const { schema } = require("../category/category.model");

const optionSchema = new schema({
    title: {type: String, required: true},
    key: {type: String, required: true},
    type: {type: String, enum: ['number', 'string', 'array', 'boolean']},
    enum: {type: Array, default: []},
    guid: {type: String, required: false},
    category: {type: Types.ObjectId, ref: 'Category', required: true}
})

const optionModel = model('option', optionSchema);

module.exports = optionModel;