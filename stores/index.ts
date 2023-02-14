import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { app } from './app'
import { course } from './course'
import { favorite } from './favorite'
import { cart } from './cart'
import { api } from './api'

const reducers = combineReducers({
  app,
  course,
  favorite,
  cart,
  [api.reducerPath]: api.reducer
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof reducers>;
export default store