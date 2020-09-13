const Cart = require('../models/Cart');
 require('../models/Products')
const requireLogin = require('../middleware/requireLogin');
const mongoose=require('mongoose');

const Product= mongoose.model('products');

module.exports = (app) => {

    app.post('/api/addtocart/:id', requireLogin, async (req, res) => {
    try{
        const product = await Product.findById({ _id: req.params.id })
        const user = req.user;
        const item = {
            product: product,
            quantity: req.body.quantity
        };
  

    Cart.findOne({ user: user })
        .then((foundCart) => {
        if (foundCart) {
            let products = foundCart.items.map((item) => item.product + '');
            if (products.includes(item.product)) {
             Cart.findOneAndUpdate({
                user: user,
                items: {
                $elemMatch: { product: item.product }
                }
            },
                {
                $inc: { 'item.$.quantity': item.quantity }
                })
                .exec()
                .then(() => res.redirect('/main/products'))
                console.log(item.quantity)
                console.log(item.product)
                .catch((error)=> res.send(error));
            } else {
            foundCart.items.push(item);
            foundCart.save()
            .then(() => res.redirect('/main/products'))
            .catch((error)=> res.send(error));
            }
        } else {
            Cart.create({
            user: user,
            items: [item]
            })
            .then(() => res.redirect('/main/products'))
            .catch((error)=> res.send(error));
        }
        });
    }catch(error){
        res.send(error);
    }
    });

    app.get('/api/cart/:id', requireLogin, async (req, res) => {
        const cart= await Cart.find({user: req.user})
            if(!cart){
                return null;
            }else{
                res.send(cart);
            }
    });

    // app.put('/api/cart/:id', requireLogin, (req, res) => {
    // Cart.findById(req.body.cartId)
    //     .then((foundCart) => {
    //     foundCart.items = foundCart.items.filter((item) => item._id != req.body.itemId);
    //     foundCart.save(() => res.end());
    //     });
    // });

    app.get('/api/removefromcart/:id', requireLogin, async (req, res) => {
    
       try{
        const cart = await Cart.findOne({user: req.user});
        const product = req.params.id;

            cart.items.remove({_id: product});
            cart.save()


            res.redirect('/cart');
       }
       catch(error){ 
           res.send(error);
           console.log(error)
       }
          
    });

}