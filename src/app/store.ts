import animateTextFadedDurationReducer from '@/features/animateTextFadedDuration/animateTextFadedDurationSlice'
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    animateTextFadedDuration: animateTextFadedDurationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch