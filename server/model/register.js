const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
let schema = new Scheme({
    f_name: {type: String},
    l_name: {type: String},
    contact_number: {type: Number},
    password: {type: String},
    username: {type: String},
    email: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    address: {type: String},
    role_id: {type: Number, default: 2},
    createDate: {type: String, default: new Date()},
    createLastBill: {type: String},
    billAmount: {type: Number}
});
module.exports = mongoose.model('Register', schema);
