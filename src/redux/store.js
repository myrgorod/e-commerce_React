import { configureStore } from "@reduxjs/toolkit";
import ItemReducer from "./slices/ItemSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    items: ItemReducer,
    cart: cartReducer,
  },
});

export default store;
