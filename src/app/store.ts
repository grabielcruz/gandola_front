import { configureStore } from "@reduxjs/toolkit";

import transactionsReducer from "../features/transactions/transactionsSlice";
import pendingTransactionReducer from "../features/pendingTransactions/pendingTransactionsSlice";
import actorsReducer from "../features/actors/actorsSlice";
import notesReducer from "../features/notes/notesSlice";
import billsReducer from "../features/bills/billsSlice";

export const store = configureStore({
  reducer: {
    Transactions: transactionsReducer,
    PendingTransactions: pendingTransactionReducer,
    Actors: actorsReducer,
    Notes: notesReducer,
    Bills: billsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;