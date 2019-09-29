const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: Number,
    imgFrom: String,
    imgBack: String
}, {
    timestamps: true
})

module.exports = Product = mongoose.model('product', productSchema)