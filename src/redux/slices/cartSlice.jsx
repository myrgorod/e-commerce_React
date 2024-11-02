import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  cartBig: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCounterIncrement: (state, action) => {
      const itemIndex = state.cartBig.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex >= 0) {
        state.cartBig[itemIndex].amount += 1;
        state.totalAmount++;
      }
    },

    setCartCounterDecrement: (state, action) => {
      const itemIndex = state.cartBig.findIndex(
        (item) => item.id === action.payload
      );
      console.log(action.payload);
      if (state.cartBig[itemIndex].amount > 1) {
        state.cartBig[itemIndex].amount -= 1;
        // state.totalAmount--;
      } else if (state.cartBig[itemIndex].amount === 1) {
        const UpdateCart = state.cartBig.filter(
          (product) => product.id !== action.payload
        );

        //   return { ...state, ...{ cartBig: UpdateCart } };
        state.cartBig = UpdateCart;
      }
    },

    addToCart: (state, action) => {
      const productId = action.payload; // the whole Item

      try {
        const exist = state.cartBig.find(
          (product) => product.item.id === productId.item.id
        );

        if (exist) {
          exist.amount++;

          state.totalAmount++;
          state.totalPrice += productId.item.price;
        } else {
          const tempCart = {
            ...action.payload,
            amount: 1,
            productPrice: productId.item.price,
            id: uuidv4(),
          };
          state.cartBig.push(tempCart);
          state.totalAmount++;

          state.totalPrice += productId.item.price;
        }
      } catch (error) {
        return error;
      }
    },

    removeFromCart: (state, action) => {
      const UpdateCart = state.cartBig?.filter(
        (product) => product.id !== action.payload
      );

      //   return { ...state, ...{ cartBig: UpdateCart } };
      state.cartBig = UpdateCart;
    },
    clearCart: (state, action) => {
      state.cartBig = [];

      state.totalAmount = 0;
      state.totalPrice = 0;
    },

    getTotal: (state, action) => {
      let { total, quantity } = state.cartBig.reduce(
        (cartTotal, cartItem) => {
          const { productPrice, amount } = cartItem;
          const itemTotal = productPrice * amount;

          cartTotal.total += itemTotal;
          cartTotal.quantity += amount;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalAmount = quantity;
      state.totalPrice = total;
    },
  },
});
//

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  setCartCounterIncrement,
  setCartCounterDecrement,
  clearCart,
  getTotal,
} = cartSlice.actions;
