import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import courseSlice from "../course/courseSlice";

export interface Cart {
  id: number,
  name: string,
  shortDetail: string,
  instructor: string,
  prices: Array<object>,
  startDate: string,
  endDate: string,
  type: number,
  image: string
};

export interface Carts extends Array<Cart>{};

type CartState = Carts;
const initialState: CartState = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Cart>) => {
      state.push(action.payload);
    }
  }
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
