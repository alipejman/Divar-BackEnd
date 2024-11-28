const { Types, model, Schema } = require("mongoose");
const { schema } = require("../category/category.model");
const timespan = require("jsonwebtoken/lib/timespan");

const postSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: 'Category', required: true},
    provice: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    coordinate: {type: [Number], required: true},
    image: {type: [String], required: false, default: []
    }
}, {timespan: true})

const postModel = model('post', postSchema);

module.exports = postModel;