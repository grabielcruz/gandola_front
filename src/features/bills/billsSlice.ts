import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Bill, Status } from "../../types";

const initialState: InitialBillsState = {
  Bills: [],
  Status: "idle",
  Error: null,
  // ImageStatus: "idle",
  // ImageError: null,
  // LastImageUrl: "",
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

// export const createImage = createAsyncThunk<any, FormData, {}>(
//   "/bills/createImage",
//   async (newImage, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`upload/00022`, newImage, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const createBill = createAsyncThunk<any, CreateBillProps, {}>(
  "/bills/createBill",
  async ({ Bill, Image, Present }, { rejectWithValue }) => {
    try {
      if (Present) {
        const response1 = await axios.post(`upload/${Bill.Code}`, Image, {
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

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    // setBillsImageStatus: (state, action) => {
    //   state.ImageStatus = action.payload;
    // },
    // setBillsImageError: (state, action) => {
    //   state.ImageError = action.payload;
    // },
  },
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

    // [createImage.pending.toString()]: (state, action) => {
    //   state.ImageStatus = "loading";
    // },
    // [createImage.fulfilled.toString()]: (state, action) => {
    //   state.ImageStatus = "succeeded";
    //   state.LastImageUrl = action.payload;
    //   state.ImageError = null;
    // },
    // [createImage.rejected.toString()]: (state, action) => {
    //   state.ImageStatus = "failed";
    //   state.ImageError = action.payload;
    // },
  },
});

interface InitialBillsState {
  Bills: Bill[];
  Status: Status;
  Error: string | null;
  // ImageStatus: Status;
  // ImageError: string | null;
  // LastImageUrl: string;
}

interface CreateBillProps {
  Bill: Bill;
  Image: FormData;
  Present: Boolean;
}

// export const { setBillsImageStatus, setBillsImageError } = billsSlice.actions;

export default billsSlice.reducer;
