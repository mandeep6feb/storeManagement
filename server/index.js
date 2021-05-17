const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let http = require('http');
let core = require('cors');
const mongoose = require('./config/config')
let server = http.Server(app);
const multer = require('multer');
// ////////////////////  Routes  //////////////////////////
let products = require('./router/product_route');
let register = require('./router/register_route');
let orderDetail = require('./router/orderDetail_route');
let distributor = require('./router/disrubutor_route');
let inventory = require('./router/inventory_route');
const port = process.env.PORT || 3000;
app.use(express.static('view/client/dist/client'));
app.use(bodyParser.json());
app.use(core());
// API's ///////////////////////////////
app.use('/api', inventory);
app.use('/api', distributor);
app.use('/api', products);
app.use('/api', register);
app.use('/api', orderDetail);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});
const upload = multer({ storage: storage })
app.use('/api/look', express.static('uploads'))
app.post('/api/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File');
        return next(error);
    } else {
        res.json({
            success: true,
            profile_url: `http://localhost:3000/file/${req.file.filename}`,
        })
    }
});
app.post('/api/look', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File');
        return next(error);
    } else {
        res.json({
            success: true,
            profile_url: `http://localhost:3000/file/${req.file.filename}`,
        })
    }
});
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});