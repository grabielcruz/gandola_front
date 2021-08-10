import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Status, Truck } from "../../types";

const initialState: InitialTruckState = {
  Trucks: [],
  Status: "idle",
  Error: null,
};

export const fetchTrucks = createAsyncThunk(
  "/trucks/fetchTrucks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/trucks");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTrucks.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchTrucks.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Trucks = action.payload;
      state.Error = null;
    },
    [fetchTrucks.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
  },
});

interface InitialTruckState {
  Trucks: Truck[];
  Status: Status;
  Error: string | null;
}

export default trucksSlice.reducer;
