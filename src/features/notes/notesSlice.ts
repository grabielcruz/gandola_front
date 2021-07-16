import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Note } from "../../types";

const initialState: InitialNotesState = {
  Notes: [],
  Status: "idle",
  Error: null,
}

export const fetchNotes = createAsyncThunk(
  "/notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/notes")
      return response.data
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
)

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchNotes.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [fetchNotes.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Notes = action.payload;
      state.Error = null;
    },
    [fetchNotes.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    }
  }
})

interface InitialNotesState {
  Notes: Note[];
  Status: "idle" | "succeeded" | "failed" | "loading";
  Error: string | null;
}

export default notesSlice.reducer;