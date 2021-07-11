import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Actor } from "../../types";

const initialState: InitialActorsState = {
  Actors: [],
  Status: "idle",
  Error: null,
};

export const fetchActors = createAsyncThunk(
  "/actors/fetchActors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/actors");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createActor = createAsyncThunk<any, Actor, {}>(
  "/actors/createActor",
  async (newActor, { rejectWithValue }) => {
    try {
      const response = await axios.post("/actors", newActor);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// export const patchActor = createAsyncThunk<any, Actor, {}>(
//   "/actors/patchActor",
//   async (newActor, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`/actors/${newActor.Id}`, newActor);
//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const deleteActor = createAsyncThunk<any, number, {}>(
  "/actors/deleteActor",
  async (actorId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/actors/${actorId}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {
    setActorsStatus: (state, action) => {
      state.Status = action.payload;
    },
    updateActor: (state, action) => {
      for (let i = 0; i < state.Actors.length; i++) {
        if (state.Actors[i].Id === action.payload.Id) {
          state.Actors[i] = action.payload
          state.Error = null;
          return
        }
      }
    },
    setActorsError: (state, action) => {
      state.Error = action.payload
    }
  },
  extraReducers: {
    [fetchActors.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchActors.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Actors = action.payload;
      state.Error = null;
    },
    [fetchActors.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [createActor.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createActor.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Actors.push(action.payload);
      state.Error = null;
    },
    [createActor.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    // [patchActor.pending.toString()]: (state, action) => {
    //   state.Status = "loading";
    // },
    // [patchActor.fulfilled.toString()]: (state, action) => {
    //   state.Status = "succeeded";
    //   for (let i = 0; i < state.Actors.length; i++) {
    //     if (state.Actors[i].Id === action.payload.Id) {
    //       state.Actors[i] = action.payload;
    //       state.Error = null;
    //       return;
    //     }
    //   }
    // },
    // [patchActor.rejected.toString()]: (state, action) => {
    //   state.Status = "failed";
    //   state.Error = action.payload;
    // },

    [deleteActor.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deleteActor.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Actors.length; i++) {
        if (state.Actors[i].Id === action.payload.Id) {
          state.Actors = state.Actors.slice(0, i).concat(
            state.Actors.slice(i + 1)
          );
          state.Error = null;
          return;
        }
      }
    },
    [deleteActor.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
  },
});

interface InitialActorsState {
  Actors: Actor[];
  Status: "idle" | "succeeded" | "failed" | "loading";
  Error: string | null;
}

export const { setActorsStatus, updateActor, setActorsError } = actorsSlice.actions;

export default actorsSlice.reducer;
