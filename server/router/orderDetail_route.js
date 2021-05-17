let express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

let OrderDetails = require('../model/orderDetails')
router.post('/orderdata', async (req, res) => {
    try {
        var orderDetails = new OrderDetails(req.body);
        var result = await orderDetails.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/orderDetails/', async (req, res) => {
    try {
     // const count = await OrderDetails.countDocuments();
 // const { page = 1, limit = 10 } = req.query;

    var data = await OrderDetails.aggregate([{
      $lookup: {
        from: 'products',
        localField: 'productID',
        foreignField: '_id',
        as: 'product'
      }

    },{
      $lookup: {
        from: 'registers',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      },
    },
    { $sort :{ _id : -1} },
    //{ $skip : (page - 1) * limit },
   // { $limit : limit * 1 },
    ]);

     res.send(data);
} catch (error) {
    res.status(500).send(error);
}
});
router.get('/orderls/:orderDetailsId', async (req, res) => {
    try {
        var orderDetails = await OrderDetails.findById(req.params.orderDetailsId).exec();
        res.send(orderDetails);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put('/orderDetails/:id',async (req, res) => {
    try {
        var orderDetails = await OrderDetails.findById(req.params.id).exec();
        orderDetails.set(req.body);
        var result = await orderDetails.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/orderDetails/:id',async (req, res) => {
    try {
        var result = await OrderDetails.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/orderDetails',async (req, res) => {
    try {
        var result = await OrderDetails.deleteMany().exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
