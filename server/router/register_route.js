let express = require('express')
const router = express.Router();
let Register = require('../model/register');
    router.post('/register', async (req, res) => {
        let promise = Register.findOne({ username: req.body.username });
        promise.then((doc) => {
            if (!doc) {
                var register = new Products(req.body);
                var result =  register.save();
                res.send(result);
            }
            else {
                res.status(501).json({ message: 'User username is already registerd.' })
            }
            });
    });
    router.post('/login', (req, res) => {
        let promise = Register.findOne({username: req.body.username}).exec();
        promise.then( ( doc) => {
            if(doc){
                if (doc.password === req.body.password) {
                    return res.status(201).json({doc });
                } else {
                    return res.status(404).send({ message: "wrong password!" });
                }
            }
            else {
                return res.status(404).send({message: "Please enter valid username!"});
            }
        });
    });

  
    router.get('/register', async (req, res) => {
        try {
            var adminLogin = await Register.find().exec();
            res.send(adminLogin);
        } catch (error) {
            res.status(500).send(error);
        }
    });
  
    router.get('/register/:id', async (req, res) => {
        try {
            var adminLogin = await Register.findById(req.params.id).exec();
            res.send(adminLogin);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.patch('/register/:id', async (req, res) => {
        try {
            var person = await Register.findById(req.params.id).exec();
            person.set(req.body);
            var result = await person.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.put('/register/:id', async (req, res) => {
        try {
            var person = await Register.findById(req.params.id).exec();
            let data = ({_id: req.body._id,f_name: req.body.f_name,l_name: req.body.l_name,mobile:req.body.mobile,creation_dt: Date.now(),email: req.body.email,password: bcrypt.hashSync(req.body.password, 10)})
            person.set(data);
            var result = await person.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.delete('/register/:id', async (req, res) => {
        try {
            var result = await Register.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
            // console.log(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    module.exports = router;