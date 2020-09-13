const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
        name: String,

        description: String,

        image: String,

        price: Number,

        isFeatured:{
            type: Boolean,
            default: false
        },
});

productSchema.methods.toJSON = function(){
    const product = this;
    const productObject = product.toObject();

    return productObject;
};

// productSchema.virtual('product', {
//     ref: 'Cart',
//     localField: '_id',
//     foreignField: 'product'
// });

mongoose.model('products', productSchema);
