const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/storeManagement', (err) => {
    if(!err)
    console.log('MongoDB Connection Succeeded');
    else
    console.log('Error In MongoDB Connection : ', JSON.stringify(err, undefined, 2));
});
