import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export const UPDATE_USER = 'UPDATE_USER';

export interface User {
  id: number,
  fname: string,
  lname: string,
  email: string,
  avatar_url: string
}

export interface Auth {
    authenticated: boolean,
    user: User,
    token: string
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER,
    user: User
}

export type UserActions = UpdateUserAction;

type AuthState = Auth;

const initialState: AuthState = {
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
