import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Bill, Status } from "../../types";

const initialState: InitialBillsState = {
  Bills: [],
  Status: "idle",
  Error: null,
};

export const fetchBills = createAsyncThunk(
  "/bills/fetchBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/bills");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBill = createAsyncThunk<any, BillProps, {}>(
  "/bills/createBill",
  async ({ Bill, Image, Present }, { rejectWithValue }) => {
    try {
      if (Present) {
        const response1 = await axios.post(`uploadbill/${Bill.Code}`, Image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Bill.Url = response1.data;
      }
      const response2 = await axios.post("/bills", Bill);
      return response2.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const patchBill = createAsyncThunk<any, BillProps, {}>(
  "/bills/patchBill",
  async ({ Bill, Image, Present }, { rejectWithValue }) => {
    try {
      if (Present) {
        const response1 = await axios.post(`uploadbill/${Bill.Code}`, Image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Bill.Url = response1.data;
      }
      const response2 = await axios.patch(`/bills/${Bill.Id}`, Bill);
      return response2.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBill = createAsyncThunk<any, number, {}>(
  "/bills/deleteBill",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/bills/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBills.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchBills.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Bills = action.payload;
      state.Error = null;
    },
    [fetchBills.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
    [createBill.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createBill.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Bills.push(action.payload);
      state.Error = null;
    },
    [createBill.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [patchBill.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [patchBill.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Bills.length; i++) {
        if (state.Bills[i].Id === action.payload.Id) {
          state.Bills[i] = action.payload;
          state.Error = null;
          return;
        }
      }
      state.Error = "It did not match";
    },
    [patchBill.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
    
    [deleteBill.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deleteBill.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Bills.length; i++) {
        if (state.Bills[i].Id === action.payload.Id) {
          state.Bills = state.Bills.slice(0, i).concat(
            state.Bills.slice(i + 1)
          );
          state.Error = null;
          return;
        }
      }
      state.Error = "Dit not delete";
    },
    [deleteBill.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    }
  },
});

interface InitialBillsState {
  Bills: Bill[];
  Status: Status;
  Error: string | null;
}

interface BillProps {
  Bill: Bill;
  Image: FormData;
  Present: Boolean;
}

export default billsSlice.reducer;
