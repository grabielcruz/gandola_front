import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Note } from "../../types";
import NotesForm from "./NotesForm";
import NotesPatchForm from "./NotesPatchForm";
import { attendNote, deleteNote, fetchNotes, unattendNote } from "./notesSlice";

const Notes = () => {
  const zeroNote: Note = {
    Id: 0,
    Description: "",
    Urgency: "low",
    Attended: false,
    CreatedAt: "",
    AttendedAt: "",
  };
  const [editingNote, setEditingNote] = useState<Note>(zeroNote);
  const notes = useSelector((state: RootState) => state.Notes.Notes);
  const status = useSelector((state: RootState) => state.Notes.Status);
  const error = useSelector((state: RootState) => state.Notes.Error);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchNotes());
  }, [status, dispatch]);
  return (
    <div>
      {status === "loading" && <p>Cargando...</p>}
      {error && error}
      <NotesForm zeroNote={zeroNote} />
      {editingNote.Id !== 0 && (
        <NotesPatchForm
          editingNote={editingNote}
          setEditingNote={setEditingNote}
          zeroNote={zeroNote}
        />
      )}
      {notes.length > 0 &&
        notes.map((note, i) => (
          <div key={i}>
            <span>{note.Id}</span>
            <pre>{note.Description}</pre>
            <span>{note.Urgency}</span>
            <br />
            <span>{note.Attended ? "Sí" : "No"}</span>
            {/* <p>{note.CreatedAt}</p> */}
            {/* <p>{note.AttendedAt}</p> */}
            <button type="button" onClick={() => setEditingNote(note)}>
              Editar
            </button>
            <button type="button" onClick={() => dispatch(deleteNote(note.Id))}>
              Borrar
            </button>
            {!note.Attended && <button type="button" onClick={() => dispatch(attendNote(note.Id))}>Marcar como completada</button>}
            {note.Attended && <button type="button" onClick={() => dispatch(unattendNote(note.Id))}>Marcar como sin completar</button>}
          </div>
        ))}
    </div>
  );
};

export default Notes;
