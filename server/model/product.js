const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let schema = new Scheme({
    product_name: { type: String, index: true },
    quantity: { type: Number},
    details: { type: String},
    category: { type: String},
    price: { type: Number},
    image: { type: String },
    manufacturer: { type: String },
    created_on: { type: String, default: new Date() },
});
schema.index({
    product_name: "text",
    price: "text"
});
module.exports = mongoose.model('Products', schema);