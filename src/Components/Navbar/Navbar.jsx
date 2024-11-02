import React, { useState } from "react";
import "./Navbar.css";
import { BsFlower1 } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  //   console.log(cartItems);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <BsFlower1 />
          <p>OfficeChairs</p>
        </Link>
      </div>
      <div className="nav-login-cart">
        <Link to="/cart">
          <button>
            <FaShoppingCart />
            Cart
          </button>
        </Link>

        <div className="nav-cart-count">{totalAmount}</div>
      </div>
    </div>
  );
};

export default Navbar;
