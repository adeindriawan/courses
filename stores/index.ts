import { combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import { app } from './app'
import { auth } from './auth'
import { course } from './course'
import { api } from './api'

const reducers = combineReducers({
  app,
  auth,
  course,
  [api.reducerPath]: api.reducer
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof reducers>;
export default store