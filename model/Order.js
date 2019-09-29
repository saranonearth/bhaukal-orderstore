const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    name: String,
    hostel: String,
    roomNo: String,
    phone: String,
    size: String,
    success: false,
    amount: Number,
    orderId: String,
    paymentMode: String,
    custId: String,
    transactionDate: Date,
    status: String,
    transactionId: String,
    gatewayCode: String,
    bankTXNID: String,
    bankName: String,
    productName: String,
    responseMessage: String,
    checkhash: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
}, {
    timestamps: true
})
module.exports = Order = mongoose.model('orders', orderSchema)