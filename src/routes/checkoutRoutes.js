const mongoose=require('mongoose');
const requireLogin=require('../middleware/requireLogin');
const requireAdmin=require('../middleware/requireAdmin');
const Cart=require('../models/Cart');
const paypal=require('paypal-rest-sdk');

const Order = mongoose.model('Order');

module.exports = (app) => {

    app.post('/api/pay', requireLogin , async (req, res)=>{
        const cart = await Cart.findOne({ user: req.user })
            let subTotal=0;
            let total=0;
            cart.items.forEach((item)=>{
                subTotal += item.product.price;
                let shipping = 10;
                let tax = subTotal * .07;
                total = tax + subTotal + shipping;
            });
            if(process.env.NODE_ENV === 'production'){
                const create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "http://localhost:8080/success",
                        "cancel_url": "http://localhost:3000/main/paymentfailure"
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": 'stuffed animal order',
                                "price": total,
                                "currency": "USD",
                                "quantity": 1
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": total
                        }
                    }]
                };
            }else{
                        const create_payment_json = {
                            "intent": "sale",
                            "payer": {
                                "payment_method": "paypal"
                            },
                            "redirect_urls": {
                                "return_url": "http://localhost:8080/success",
                                "cancel_url": "http://localhost:3000/main/paymentfailure"
                            },
                            "transactions": [{
                                "item_list": {
                                    "items": [{
                                        "name": 'stuffed animal order',
                                        "price": total,
                                        "currency": "USD",
                                        "quantity": 1
                                    }]
                                },
                                "amount": {
                                    "currency": "USD",
                                    "total": total
                                }
                            }]
                        };
            }
                        
                        
                        paypal.payment.create(create_payment_json, function (error, payment) {
                            if (error) {
                                console.log('inside error:', error.response);
                                throw error;
                            } else {
                               for(let i=0;i<payment.links.length;i++){
                                   if(payment.links[i].rel==='approval_url'){
                                       res.redirect(payment.links[i].href);
                                   }
                               }
                            }
                    });
                });

    app.get('/success', requireLogin, async (req, res)=>{
        const payerId= req.query.PayerID;
        const paymentId=req.query.paymentId;

        const cart = await Cart.findOne({ user: req.user })
            let subTotal=0;
            let total=0;
            let shipping;
            let tax;
            cart.items.forEach((item)=>{
                subTotal += item.product.price;
                shipping = 10;
                tax = subTotal * .07;
                total = tax + subTotal + shipping;
            });

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment)=>{
            if(error){
                console.log(error.response);
                throw error;
            } else {
                await Order.create({
                    user: req.user,
                    items:[{
                        product: cart.items
                    }],
                    orderInfo: {
                        orderId: payment.id,
                        orderDate: new Date( Date.now()).toLocaleDateString(),
                    
                        payer:{
                            email: payment.payer.payer_info.email,
                            name: {
                                given_name: payment.payer.payer_info.first_name,
                                surname: payment.payer.payer_info.last_name
                            },
                            payerId: payment.payer.payer_info.payer_info
                        }
                    },
                    purchase_units:{
                        amount: {
                            status: payment.state,
                            subtotal: subTotal.toFixed(2),
                            shipping: shipping.toFixed(2),
                            tax: tax.toFixed(2),
                            total: total.toFixed(2)
                        },
                    },
                    shipping: {
                        address: {
                            address_line_1: payment.payer.payer_info.shipping_address.line1,
                            admin_area_2: payment.payer.payer_info.shipping_address.city,
                            admin_area_1: payment.payer.payer_info.shipping_address.state,
                            country_code: payment.payer.payer_info.shipping_address.country_code,
                            postal_code: payment.payer.payer_info.shipping_address.postal_code 
                        },
                        name: {
                            full_name: payment.payer.payer_info.shipping_address.recipient_name
                        }
                    }
                });
                if(payment.state === 'approved'){
                    res.redirect('http://localhost:3000/main/paymentsuccess');
                } else {
                     res.redirect('/main/paymentfailure');
                }
            }
        })
        
       await cart.deleteOne();
    }); 
          
    app.get('/api/myorders/:id', requireLogin, async (req, res)=>{
        try{
        const order = await Order.find({ user: req.user });
        res.send(order);
        } catch(error){
            console.log(error)
            res.send(error);
        }
    });

    app.get('/api/admin/orders', requireLogin, requireAdmin, async (req, res)=>{
        try{
            const order = await Order.find();
            res.send(order);
        } catch (error){
            res.send(error);
        }
    });

    };