// route.js
const express = require('express');
const router = express.Router();
const Cart = require('./model');

router.post('/api/cart', async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;

    const newCart = new Cart({
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity
      })),
      totalAmount
    });

    await newCart.save();

    res.status(201).send({ message: "Cart data received and stored successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error saving cart data", error });
  }
});

router.get('/api/totalAmount', async (req, res) => {
  try {
    const latestCart = await Cart.findOne().sort({ createdAt: -1 });
    const totalAmount = latestCart ? latestCart.totalAmount : 0; 

    res.status(200).send({ totalAmount });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving total amount", error });
  }
});

router.get('/api/allProductData', async (req, res) => {
  try {
    const allProducts = await Cart.find({}, 'items.productName items.quantity');
    const products = allProducts.flatMap(cart => cart.items.map(item => ({
      productName: item.productName,
      quantity: item.quantity
    })));

    res.status(200).send({ products });
  } catch (error) {
    console.error('Error retrieving product data:', error);
    res.status(500).send({ message: "Error retrieving product data", error });
  }
});



module.exports = router;
