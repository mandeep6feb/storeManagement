const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let schema = new Scheme({
    distributor_name: { type: String, index: true },
    distributor_address: { type: String,  },
    userId: [{ type: Scheme.Types.ObjectId }],
    Code: { type: String },
    created_on: { type: String, default: new Date() },
});
schema.index({
    distributor_name: "text",
});
module.exports = mongoose.model('Distributor', schema);