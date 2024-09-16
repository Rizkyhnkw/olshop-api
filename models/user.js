const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    // stock: {
    //     type: Number,
    //     recuired: true
    // }
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
  })
  productSchema.set('toJSON',{
    virtuals: true
  })
exports.User = mongoose.model('User', userSchema)
