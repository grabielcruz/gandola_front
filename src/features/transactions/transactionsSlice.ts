import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../types";

const initialState: InitialTransactionsState = {
  Transactions: [],
  Status: "idle",
  Error: null,
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
  reducers: {
    setTransactionsStatus: (state, action) => {
      state.Status = action.payload;
    },
    addTransaction: (state, action) => {
      state.Transactions.unshift(action.payload);
    },
    removeLastTransaction: (state, action) => {
      state.Transactions.shift();
    },
    setTransactionsError: (state, action) => {
      state.Error = action.payload;
    },
    updateTransactionsActors: (state, action) => {
      for (let i = 0; i < state.Transactions.length; i++) {
        if (state.Transactions[i].Actor.Id === action.payload.Id) {
          state.Transactions[i].Actor.Name = action.payload.Name
        }
      }
    }
  },
  extraReducers: {
    [fetchTransactions.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchTransactions.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Transactions = action.payload;
      state.Error = null;
    },
    [fetchTransactions.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [createTransaction.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createTransaction.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Transactions.unshift(action.payload);
      state.Error = null;
    },
    [createTransaction.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [patchTransaction.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [patchTransaction.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Transactions.length; i++) {
        if (state.Transactions[i].Id === action.payload.Id) {
          state.Transactions[i] = action.payload;
          state.Error = null;
          return;
        }
      }
      state.Error = "It did not match";
    },
    [patchTransaction.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [deleteLastTransaction.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deleteLastTransaction.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      if (action.payload.Id === state.Transactions[0].Id) {
        state.Transactions.shift()
      } else {
        state.Error = "algo no funcionó como se esperaba";
      }
      state.Error = null;
      return;
       
    },
    [deleteLastTransaction.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
  },
});

interface InitialTransactionsState {
  Transactions: Transaction[];
  Status: "idle" | "succeeded" | "failed" | "loading";
  Error: string | null;
}

export const {
  setTransactionsStatus,
  addTransaction,
  removeLastTransaction,
  setTransactionsError,
  updateTransactionsActors
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
