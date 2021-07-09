import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const createTransaction = createAsyncThunk<any, Transaction, {}>(
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
);

export const patchTransaction = createAsyncThunk<
  any,
  { Id: number; Description: string },
  {}
>(
  "/transactions/patchTransaction",
  async ({ Id, Description }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/transactions/${Id}`, {
        Description,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLastTransaction = createAsyncThunk(
  "/transactions/deleteLastTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/transactions`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

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

    [patchTransaction.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [patchTransaction.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      for (let i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].Id === action.payload.Id) {
          state.transactions[i] = action.payload;
          state.error = null;
          return;
        }
      }
    },
    [patchTransaction.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    [deleteLastTransaction.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [deleteLastTransaction.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      for (let i = state.transactions.length - 1; i > 0; i--) {
        if (state.transactions[i].Id === action.payload.Id) {
          state.transactions = state.transactions
            .slice(0, i)
            .concat(state.transactions.slice(i + 1));
          state.error = null;
          return;
        }
      }
    },
    [deleteLastTransaction.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

interface InitialState {
  transactions: Transaction[];
  status: "idle" | "succeeded" | "failed" | "loading";
  error: string | null;
}

export default transactionsSlice.reducer;
