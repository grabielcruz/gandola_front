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

export const createTruck = createAsyncThunk<any, TruckProps, {}>(
  "/trucks/createTruck",
  async ({ Truck, Image, Present }, { rejectWithValue }) => {
    try {
      if (Present) {
        const response1 = await axios.post(
          `uploadTrucks/11`,
          Image,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response1.data)
        Truck.Photos = response1.data;
      }
      const response2 = await axios.post("/trucks", Truck);
      return response2.data;
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

    [createTruck.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createTruck.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Trucks.push(action.payload);
      state.Error = null;
    },
    [createTruck.rejected.toString()]: (state, action) => {
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

interface TruckProps {
  Truck: Truck;
  Image: FormData;
  Present: Boolean;
}

export default trucksSlice.reducer;
