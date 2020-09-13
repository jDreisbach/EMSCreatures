const mongoose=require('mongoose');
const multer=require('multer');
const sharp=require('sharp');
const path=require('path');
const requireLogin=require('../middleware/requireLogin');
const requireAdmin=require('../middleware/requireAdmin');
require('../models/Products');

const Product=mongoose.model('products');

const storage = multer.memoryStorage(
    // destination: 'images/',
    // filename: function(req, file, cb){
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // },
);

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 2000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined, true);
    }
});



module.exports = (app) => {

    app.get('/api/products', async (req, res)=>{
        const products = await Product.find();

        res.send(products);
    });

    app.post('/api/admin/products', requireLogin, requireAdmin, upload.single('image'), async (req, res)=> {
      try{
        const buffer = await sharp(req.file.buffer).resize({width: 150, height: 200}).png().toBuffer('base64');
        const buf=Buffer.from(buffer);
    
        const product = await new Product({
            name: req.body.name,
            description: req.body.description,
            image: buf.toString('base64'),
            price: req.body.price
        });
        
            await product.save();
            res.status(201).redirect('/main/products')
        }catch(error){
            res.status(422).send('Server Error');
            console.log(error)
        }
        
    });

    app.patch('/api/admin/products/:id', requireLogin, requireAdmin, async (req, res)=>{
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'description', 'image', 'price', 'isFeatured'];
        const isValid = updates.every((update)=>{
            return allowedUpdates.includes(update);
        });

        if(!isValid){
            return res.status(400).send({error: 'Invalid'});
        }

        try{
            const product = await Product.findOne({ _id: req.params.id });

            updates.forEach((update)=>{
                product[update]=req.body[update];
            });

            if(!product){
                res.status(404).send(error, 'Product does not exist');
            }
            await product.save();
            res.send(product);
        }catch(error){
            res.status(400).send(error);
        }
    });

    app.get('/api/products/delete/:id', requireLogin, requireAdmin, async (req, res)=>{
        try{
            const product = await Product.findOneAndDelete({ _id: req.params.id });
                if(!product){
                    res.status(400).send(error, 'Product does not exist');
                }
            res.redirect('/admin');
        }catch(error){
            res.status(500).send(error);
            console.log(error)
        }
    });
};