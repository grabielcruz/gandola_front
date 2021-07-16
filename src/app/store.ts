import { configureStore } from "@reduxjs/toolkit";

import transactionsReducer from "../features/transactions/transactionsSlice";
import pendingTransactionReducer from "../features/pendingTransactions/pendingTransactionsSlice";
import actorsReducer from "../features/actors/actorsSlice";
import notesReducer from "../features/notes/notesSlice";

export const store = configureStore({
  reducer: {
    Transactions: transactionsReducer,
    PendingTransactions: pendingTransactionReducer,
    Actors: actorsReducer,
    Notes: notesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
