let express = require('express')
const router = express.Router();
let Inventory = require('../model/inventory')
router.post('/inventory', async (req, res) => {
    try {
        var inventory = new Inventory(req.body);
        var result = await inventory.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/inventory', async (req, res) => {
    try {
        const count = await Inventory.countDocuments();
        const { page = 1, limit = 5 } = req.query;
        var data = await Inventory.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $lookup: {
                from: 'distributors',
                localField: 'distributorId',
                foreignField: '_id',
                as: 'distributor'
            }
        },
        { $sort: { _id: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit * 1 },
        ]);
        res.json({

            meta: {
                totalItem: count,
                itemPerPage: limit,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            },
            data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/inventory/:/inventoryId', async (req, res) => {
 try {
    var inventory = await Inventory.findById(req.params.InventoryId).exec();
    res.send(inventory);
} catch (error) {
    res.status(500).send(error);
}
});
router.put('/inventory/:id',async (req, res) => {
    try {
        var inventory = await Inventory.findById(req.params.id).exec();
        inventory.set(req.body);
        var result = await inventory.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/inventory/:id',async (req, res) => {
    try {
        var result = await Inventory.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/inventory',async (req, res) => {
    try {
        var result = await Inventory.deleteMany().exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
