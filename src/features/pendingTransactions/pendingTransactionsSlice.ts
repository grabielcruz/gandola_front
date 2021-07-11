import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PendingTransaction } from "../../types";

const initialState: InitialPendingTransactionsState = {
  PendingTransactions: [],
  Status: "idle",
  Error: null,
};

export const fetchPendingTransactions = createAsyncThunk(
  "/pending_transactions/fetchPendingTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/pending_transactions");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPendingTransaction = createAsyncThunk<
  any,
  PendingTransaction,
  {}
>(
  "/pending_transactions/createPendingTransactions",
  async (newPendingTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/pending_transactions",
        newPendingTransaction
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const patchPendingTransactions = createAsyncThunk<
  any,
  PendingTransaction,
  {}
>(
  "/pending_transactions/patchPendingTransactions",
  async (newPendingTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/pending_transactions/${newPendingTransaction.Id}`,
        newPendingTransaction
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePendingTransaction = createAsyncThunk<any, number, {}>(
  "/pending_transactions/deletePendingTransaction",
  async (pendingTransactionId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/pending_transactions/${pendingTransactionId}`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const pendingTransactionsSlice = createSlice({
  name: "pendingTransactions",
  initialState,
  reducers: {
    setPendingTransactionsStatus: (state, action) => {
      state.Status = action.payload;
    },
    addPendingTransaction: (state, action) => {
      state.PendingTransactions.push(action.payload);
    },
    removePendingTransaction: (state, action) => {
      for (let i = 0; i < state.PendingTransactions.length; i++) {
        if (state.PendingTransactions[i].Id === action.payload) {
          state.PendingTransactions = state.PendingTransactions.slice(
            0,
            i
          ).concat(state.PendingTransactions.slice(i + 1));
          return
        }
      }
    },
    setPendingTransactionsError: (state, action) => {
      state.Error = action.payload;
    },
    updatePendingTransactionsActors: (state, action) => {
      for (let i = 0; i < state.PendingTransactions.length; i++) {
        if (state.PendingTransactions[i].Actor.Id === action.payload.Id) {
          state.PendingTransactions[i].Actor.Name = action.payload.Name
        }
      }
    }
  },
  extraReducers: {
    [fetchPendingTransactions.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchPendingTransactions.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.PendingTransactions = action.payload;
      state.Error = null;
    },
    [fetchPendingTransactions.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [createPendingTransaction.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createPendingTransaction.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.PendingTransactions.push(action.payload);
      state.Error = null;
    },
    [createPendingTransaction.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [patchPendingTransactions.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [patchPendingTransactions.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.PendingTransactions.length; i++) {
        if (state.PendingTransactions[i].Id === action.payload.Id) {
          state.PendingTransactions[i] = action.payload;
          state.Error = null;
          return;
        }
      }
    },
    [patchPendingTransactions.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [deletePendingTransaction.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deletePendingTransaction.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.PendingTransactions.length; i++) {
        if (state.PendingTransactions[i].Id === action.payload.Id) {
          state.PendingTransactions = state.PendingTransactions.slice(
            0,
            i
          ).concat(state.PendingTransactions.slice(i + 1));
          state.Error = null;
          return;
        }
      }
    },
    [deletePendingTransaction.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
  },
});

interface InitialPendingTransactionsState {
  PendingTransactions: PendingTransaction[];
  Status: "idle" | "succeeded" | "failed" | "loading";
  Error: string | null;
}

export const {
  setPendingTransactionsStatus,
  setPendingTransactionsError,
  addPendingTransaction,
  removePendingTransaction,
  updatePendingTransactionsActors
} = pendingTransactionsSlice.actions;

export default pendingTransactionsSlice.reducer;
