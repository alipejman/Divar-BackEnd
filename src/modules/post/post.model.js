const { Types } = require("mongoose");
const { schema } = require("../category/category.model");

const postSchema = new schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: 'Category', required: true},
    provice: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    coordinate: {type: [Number], required: true},
    image: {type: [String], required: false, default: []
    }
})