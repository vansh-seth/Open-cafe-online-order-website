const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [{
    productId: String,
    productName: String,
    quantity: Number,
  }],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
