const { Types, Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    icon: {type: String, require: true},
    parent: {type: Types.ObjectId, ref: 'Category', required: false},
    parents: {type: Types.ObjectId, ref: 'Category', required: false, default: []}
}, {virtuals: true, versionKey: false, id: false});
categorySchema.virtual('children', {
    ref: 'category',
    localField: '__id',
    foreignField: 'parent'
})

const categoryModel = model('category', categorySchema);
module.exports = categoryModel;