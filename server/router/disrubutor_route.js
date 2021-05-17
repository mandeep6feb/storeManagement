let express = require('express')
const router = express.Router();
let Distributor = require('../model/distributor')
router.post('/distributor', async (req, res) => {
    try {
        var distributor = new Distributor(req.body);
        var result = await distributor.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/distributor/', async (req, res) => {
    try {
        const count = await Distributor.countDocuments();
        const { page = 1, limit = 5 } = req.query;

        var data = await Distributor.aggregate([{
            $lookup: {
                from: 'registers',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
            { $sort :{ _id : -1} },
            { $skip : (page - 1) * limit },
            { $limit : limit * 1 },
        ]);
        // res.send(data);
         res.json({

        meta : {
          totalItem:count,
          itemPerPage: limit,
          totalPages: Math.ceil(count / limit),
          currentPage: page },
          data
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/distributor/:distributorId', async (req, res) => {
 try {
    var distributor = await Distributor.findById(req.params.DistributorId).exec();
    res.send(distributor);
} catch (error) {
    res.status(500).send(error);
}
});
router.put('/distributor/:id',async (req, res) => {
    try {
        var distributor = await Distributor.findById(req.params.id).exec();
        distributor.set(req.body);
        var result = await distributor.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/distributor/:id',async (req, res) => {
    try {
        var result = await Distributor.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/distributor',async (req, res) => {
    try {
        var result = await Distributor.deleteMany().exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
