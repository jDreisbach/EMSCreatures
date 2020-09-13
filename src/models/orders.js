const mongoose=require('mongoose');
const { string } = require('prop-types');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.Object,
        ref: 'User'
    },

    items: [{
        product:{
            type: mongoose.Schema.Types.Object,
            ref: 'Products'
        }
    }],

    orderInfo: {
        orderId: String,
        orderDate: String,
        
        payer:{
            email: String,
            name: {
                given_name: String,
                surname: String
            },
            payerId: String
        }
    },
    purchase_units:{
        amount: {
            subtotal: String,
            shipping: String,
            tax: String,
            total: String,
            status: String
        },
    },
    shipping: {
        address: {
            address_line_1: String,
            admin_area_2: String,
            admin_area_1: String,
            country_code: String,
            postal_code: String
        },
        name: {
            full_name: String
        }
    }
});

module.exports=mongoose.model('Order', orderSchema);