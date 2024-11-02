import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  removeFromCart,
  setCartCounterIncrement,
  setCartCounterDecrement,
  clearCart,
  getTotal
} from "../redux/slices/cartSlice";

const CartStyled = styled.div`
  display: block;
  width: 1100px;
  margin: 25px auto;
  font-size: 25px;
  .item__data {
    width: 750px;
  }

  .cart__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 0;
    img {
      width: 350px;
      margin-right: 20px;
    }
  }
  .item__description,
  .item__price,
  .item__counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item__description {
    button {
      font-size: 20px;
      padding: 10px 15px;
      border: none;
      outline: none;
      background-color: green;
      color: #fff;
      border-radius: 5px;
      margin: 0 0 0 40px;
    }
  }
  .item__counter {
    button {
      font-size: 30px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      width: 35px;
      height: 35px;
      background-color: green;
      color: #fff;
      border: none;
      border-radius: 5px;
      outline: none;
    }
    span {
      padding: 25px;
    }
  }
  .clearCart {
    font-size: 20px;
    padding: 5px 15px;
    background: green;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }
`;

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartBig);
//   const itemAmount = useSelector((state) => state.cart.cartBig.amount);
  const {totalAmount} = useSelector((state) => state.cart);
  const {totalPrice} = useSelector((state) => state.cart);


  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getTotal())
  }, [cartItems, dispatch])


  const handleDeleteItemFromCart = (id) => {
    console.log(removeFromCart(id));
    dispatch(removeFromCart(id));
  
  };

  const handleChangeAmountIncr = (id) => {
    console.log(id);
    dispatch(setCartCounterIncrement(id));
  };
  const handleChangeAmountDecr = (id) => {
    dispatch(setCartCounterDecrement(id));
  };
  const handleClearCart = () => {
    
    dispatch(clearCart());
  };

  return (
    <CartStyled>
      <div className="cartStyled">
        {cartItems &&
          cartItems.map((item) => (
            <div className="cart__item" key={item.id}>
              <img
                key={item.item.id}
                src={item.item.thumbnail}
                alt={item.item.title}
              />
              <div className="item__data">
                <div className="item__description">
                  <p className="description">{item.item.description}</p>
                  <button
                    onClick={() => handleDeleteItemFromCart(item.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="item__price">
                  <div className="item__counter">
                    <button
                      onClick={() => handleChangeAmountIncr(item.id)}
                    >
                      +
                    </button>
                    <p>
                      <span>{item.amount}</span>
                    </p>
                    <button
                      onClick={() => handleChangeAmountDecr(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <p className="price">
                    Price: $ {item.item.price * item.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div className="cart__total">
          <h4>
            Together: <span>{totalAmount} products</span>
          </h4>
          <h4>
            Sum:<span> ${totalPrice}</span>
          </h4>
          <button className="clearCart" onClick={() => handleClearCart()}>
            Clear cart
          </button>
        </div>
      </div>
    </CartStyled>
  );
};

export default Cart;
