import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ItemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, item: action.payload };
    },
  },
});

console.log(ItemSlice.actions);
export const { setData } = ItemSlice.actions;
export default ItemSlice.reducer;
