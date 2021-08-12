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
        const response1 = await axios.post(`uploadTrucks`, Image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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

export const patchTruck = createAsyncThunk<any, TruckProps, {}>(
  "/trucks/patchTruck",
  async ({ Truck, Image, Present }, { rejectWithValue }) => {
    try {
      if (Present) {
        const response1 = await axios.post(`uploadTrucks`, Image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Truck.Photos = response1.data;
      }
      const response2 = await axios.patch(`/trucks/${Truck.Id}`, Truck);
      return response2.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTruck = createAsyncThunk<any, number, {}>(
  "/trucks/deleteTruck",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`trucks/${id}`);
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

    [patchTruck.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [patchTruck.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Trucks.length; i++) {
        if (state.Trucks[i].Id === action.payload.Id) {
          state.Trucks[i] = action.payload;
          state.Error = null;
          return;
        }
      }
      state.Error = "It did not match";
    },
    [patchTruck.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [deleteTruck.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deleteTruck.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Trucks.length; i++) {
        if (state.Trucks[i].Id === action.payload.Id) {
          state.Trucks = state.Trucks.slice(0, i).concat(
            state.Trucks.slice(i + 1)
          );
          state.Error = null;
          return;
        }
      }
    },
    [deleteTruck.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    }
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
