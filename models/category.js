const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
icon: {
    type: String
},
color: {
    type: String
}
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
  })
  productSchema.set('toJSON',{
    virtuals: true
  })
exports.Category = mongoose.model('Category', categorySchema)
