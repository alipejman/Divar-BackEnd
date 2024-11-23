const { Types, Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    icon: {type: String, required: true},
    parent: {type: Types.ObjectId, ref: 'Category', required: false},
    parents: {type: Types.ObjectId, ref: 'Category', required: false, default: []}
}, {versionKey: false, id: false, toJSON: {virtuals: true}});
categorySchema.virtual('children', {
    ref: 'category',
    localField: '__id',
    foreignField: 'parent'
})

const categoryModel = model('category', categorySchema);
module.exports = categoryModel;