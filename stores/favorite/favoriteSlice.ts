import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from '../api';

export const GET_FAVORITES = 'GET_FAVORITES';
export interface Favorite {
  id: number,
  name: string,
  instructor: string,
  prices: Array<object>,
  startDate: string,
  endDate: string,
  type: number
}

export interface Favorites extends Array<Favorite>{}
export interface GetFavorites {
  type: typeof GET_FAVORITES,
  favorites: Favorites
}
type FavoriteState = Favorites;
const initialState: FavoriteState = [];

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getFavorites: (state, action: PayloadAction<Favorites>) => {
      action.payload.map(v => state.push(v));
    },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCourses.matchFulfilled,
      (state, { payload }) => {
        state = payload
      }
    )
  }
});

export const { getFavorites, addFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;