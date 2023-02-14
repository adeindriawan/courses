import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export interface User {
  id: number,
  fname: string,
  lname: string,
  email: string,
  avatar_url: string
}

export interface App {
  isLoading: boolean,
  authenticated: boolean,
  user: User,
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
    avatar_url: 'https://avatars.githubusercontent.com/u/23217542?v=4'
  },
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
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.auth.accessToken;
        state.authenticated = true;
        state.user = payload.data.user;
      }
    )
  }
});

export const { setLoading, logIn, logOut, updateUser } = appSlice.actions;

export default appSlice.reducer;