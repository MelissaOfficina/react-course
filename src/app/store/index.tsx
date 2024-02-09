import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'pages/auth/auth-slice';

import listReducer from '../../components/list/list-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type IAppDispatch = typeof store.dispatch;
