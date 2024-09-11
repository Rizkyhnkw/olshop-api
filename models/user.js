const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    // stock: {
    //     type: Number,
    //     recuired: true
    // }
})
exports.User = mongoose.model('User', userSchema)
