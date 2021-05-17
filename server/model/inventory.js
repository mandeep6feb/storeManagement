const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let schema = new Scheme({
    productId: [{ type: Scheme.Types.ObjectId }],
    distributorId: [{ type: Scheme.Types.ObjectId }],
    units: { type: Number },
    distributor_price: { type: Number },
    created_on: { type: String, default: new Date() },
});
schema.index({
    distributor_name: "text",
});
module.exports = mongoose.model('Inventory', schema);