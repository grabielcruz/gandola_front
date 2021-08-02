import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Note } from "../../types";

const initialState: InitialNotesState = {
  Notes: [],
  Status: "idle",
  Error: null,
};

export const fetchNotes = createAsyncThunk(
  "/notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/notes");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNote = createAsyncThunk<any, Note, {}>(
  "/notes/createNote",
  async (newNote, { rejectWithValue }) => {
    try {
      const response = await axios.post("/notes", newNote);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const patchNote = createAsyncThunk<any, Note, {}>(
  "/notes/patchNote",
  async (note, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/notes/${note.Id}`, note);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk<any, number, {}>(
  "/notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const attendNote = createAsyncThunk<any, number, {}>(
  "/notes/attendNote",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/attend_note/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const unattendNote = createAsyncThunk<any, number, {}>(
  "/notes/attendNote",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/unattend_note/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
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
    },

    [createNote.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [createNote.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      state.Notes.push(action.payload);
      state.Error = null;
    },
    [createNote.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [patchNote.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [patchNote.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Notes.length; i++) {
        if (state.Notes[i].Id === action.payload.Id) {
          state.Notes[i] = action.payload;
          state.Error = null;
          return;
        }
      }
      state.Error = "It did not match";
    },
    [patchNote.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [deleteNote.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [deleteNote.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Notes.length; i++) {
        if (state.Notes[i].Id === action.payload.Id) {
          state.Notes = state.Notes.slice(0, i).concat(
            state.Notes.slice(i + 1)
          );
          state.Error = null;
          return;
        }
      }
      state.Error = "Dit not delete";
    },
    [deleteNote.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },

    [unattendNote.pending.toString()]: (state, action) => {
      state.Status = "loading";
    },
    [unattendNote.fulfilled.toString()]: (state, action) => {
      state.Status = "succeeded";
      for (let i = 0; i < state.Notes.length; i++) {
        if (state.Notes[i].Id === action.payload.Id) {
          state.Notes[i] = action.payload;
          state.Error = null;
          return;
        }
      }
      state.Error = "It did not match";
    },
    [unattendNote.rejected.toString()]: (state, action) => {
      state.Status = "failed";
      state.Error = action.payload;
    },
  },
});

interface InitialNotesState {
  Notes: Note[];
  Status: "idle" | "succeeded" | "failed" | "loading";
  Error: string | null;
}

export default notesSlice.reducer;
