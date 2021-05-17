const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
let schema = new Scheme({
    discount: {type: Number},
    customerAddress: {type: String},
    customerContactNumber: {type: String},
    discount: {type: Number},
    amount: { type: Number},
    quantity: { type: Number},
    productID: [{type: Scheme.Types.ObjectId}],
    userId: [{type: Scheme.Types.ObjectId}],
    createDate: {type: String, default: new Date()}
});
module.exports = mongoose.model('OrderDetail', schema);
