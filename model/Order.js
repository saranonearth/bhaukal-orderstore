const Schema = require('mongoose').Schema;

const orderSchema = new Schema({
    name: String,
    hostel: String,
    roomNo: String,
    phone: String,
    success: false,
    amount: Number,
    orderId: String,
    paymentMode: String,
    transactionDate: Date,
    status: String,
    gatewayCode: String,
    bankTXNID: String,
    bankName: String,
    productName: String,
    responseMessage: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
}, {
    timestamps: true
})