import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const cartData = PRODUCTS.filter(product => cartItems[product.id] !== 0).map(product => ({
        productId: product.id,
        productName: product.productName,
        quantity: cartItems[product.id],
      }));

      await axios.post("http://localhost:3001/api/cart", { cartItems: cartData, totalAmount });
      checkout();
      navigate("/checkout");
    } catch (error) {
      console.error("There was an error sending the cart data!", error);
    }
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.filter(product => cartItems[product.id] !== 0).map(product => (
          <CartItem key={product.id} data={product} />
        ))}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: Rs.{totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
