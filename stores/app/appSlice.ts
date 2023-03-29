import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export interface User {
  id: number,
  fname: string,
  lname: string,
  email: string,
  phone: string,
  employment: number,
  avatar_url: string
}

export interface App {
  isLoading: boolean,
  authenticated: boolean,
  user: User,
  cartTotal: number,
  bank: string,
  token: string
}

const initialState: App = {
  isLoading: false,
  authenticated: false,
  user: {
    id: 0,
    fname: '',
    lname: '',
    email: '',
    phone: '',
    employment: 0,
    avatar_url: 'https://avatars.githubusercontent.com/u/23217542?v=4'
  },
  bank: "",
  cartTotal: 0,
  token: ""
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logIn: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    logOut: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user.id = action.payload.id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
      state.user.employment = action.payload.employment;
    },
    setBank: (state, action: PayloadAction<string>) => {
      state.bank = action.payload;
    },
    setCartTotal: (state, action: PayloadAction<number>) => {
      state.cartTotal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload.status === 'success') {
          state.token = payload.data.auth.accessToken;
          state.authenticated = true;
          state.user = payload.data.user;
        }
      }
    )
  }
});

export const { setLoading, logIn, logOut, updateUser, setBank, setCartTotal } = appSlice.actions;

export default appSlice.reducer;