const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.Object,
    ref: 'User'
  },
  items: [
    {
      
      product: {
        type: mongoose.Schema.Types.Object,
        ref: 'Products'
      },
      quantity: {
        type: Number,
        default: 1
       }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
