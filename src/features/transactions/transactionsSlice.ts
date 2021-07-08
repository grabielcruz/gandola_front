import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../types";

const initialState: InitialState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "/transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/transactions");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "/transactions/createTransaction",
  async (newTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.post("/transactions", newTransaction);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
) as AsyncThunk<any, Transaction, {}>;

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTransactions.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [fetchTransactions.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.transactions = state.transactions.concat(action.payload);
      state.error = null;
    },
    [fetchTransactions.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [createTransaction.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [createTransaction.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.transactions.push(action.payload);
      state.error = null;
    },
    [createTransaction.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

// export const { transactionWithBalanceAdded } =
//   transactionsWithBalanceSlice.actions;

interface InitialState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export default transactionsSlice.reducer;
