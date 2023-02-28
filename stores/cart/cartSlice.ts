import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import courseSlice from "../course/courseSlice";

export interface Cart {
  id: number,
  name: string,
  shortDetail: string,
  instructor: string,
  prices: Array<object>,
  price: object,
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
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(course => course.id !== action.payload)
    },
    emptyCart: (state) => {
      state.length = 0;
    }
  }
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
