import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react"; 
import logoImage from "../assets/products/logo.png";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="hi">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logo" />
        </Link>
        </div>
      <div className="links">
        <Link to="/">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        <Link to="/profile" className="profile-icon">
          <UserCircle size={32} />
        </Link>
      </div>
    </div>
  );
};
