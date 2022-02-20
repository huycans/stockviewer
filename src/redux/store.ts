import { configureStore } from '@reduxjs/toolkit'
import tickerReducer from './slices/tickerSlice'
import compareSlice from './slices/compareSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
    compare: compareSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch