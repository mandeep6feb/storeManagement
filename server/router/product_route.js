let express = require('express')
const router = express.Router();
let Products = require('../model/product')
router.post('/products', async (req, res) => {
    try {
        var products = new Products(req.body);
        var result = await products.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/products', async (req, res) => {
    var mysort = { _id: -1 };
    const { page = 1, limit = 5 } = req.query;
    let {product_name, model, price, quantity, status} = req.query;
    let query = {};
    if (product_name != null) query.product_name = product_name;
    if (model != null) query.model = model;
    if (price != null) query.price = price;
    if (quantity != null) query.quantity = quantity;
    if (status != null) query.status = status;
    try {
      var Data = await Products.find(query).sort(mysort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        const count = await Products.countDocuments();
            res.json({
        totalItem:count,
        itemPerPage: limit,
        currentPageItem: Math.ceil(Data.length),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        Data
      });
    } catch (error) {
      res.status(500).send(error);
}
}); 
router.get('/products/:productId', async (req, res) => {
 try {
    var product = await Products.findById(req.params.productId).exec();
    res.send(product);
} catch (error) {
    res.status(500).send(error);
}
}); 
router.get('/Allproducts/', async (req, res) => {
    try {
       var product = await Products.find().exec();
       res.send(product); 
   } catch (error) {
       res.status(500).send(error);
   }
   }); 
router.put('/products/:id',async (req, res) => {
    try {
        var person = await Products.findById(req.params.id).exec();
        person.set(req.body);
        var result = await person.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}); 
router.patch('/products/:id',async (req, res) => {
    try {
        var person = await Products.findById(req.params.id).exec();
        person.set(req.body);
        var result = await person.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}); 
router.delete('/products/:id',async (req, res) => {
    try {
        var result = await Products.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/products/',async (req, res) => {
    try {
        var result = await Products.deleteMany().exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;