import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../course';

export interface App {
  isLoading: boolean,
  cart: Array<Course>
}

const initialState: App = {
  isLoading: false,
  cart: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToCart: (state, action: PayloadAction<Course>) => {
      state.cart.push(action.payload);
    },
    updateCart: (state, action: PayloadAction<Array<Course>>) => {
      state.cart = action.payload;
    }
  }
});

export const { setLoading, addToCart, updateCart } = appSlice.actions;

export default appSlice.reducer;