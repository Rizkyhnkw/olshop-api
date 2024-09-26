const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false
    },
    street: {
      type: String,
      required: ''
    },
    city: {
      type: String,
      required: ''
    },
    country: {
      type: String,
      required: ''
    },
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
  })
  userSchema.set('toJSON',{
    virtuals: true
  })
exports.User = mongoose.model('User', userSchema)
exports.userSchema = userSchema;
