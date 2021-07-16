import { useState } from "react";
import { useDispatch } from "react-redux";
import { Note } from "../../types";
import { createNote } from "./notesSlice";

const NotesForm:React.FC<Props> = ({zeroNote}) => {
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState<Note>(zeroNote);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNote(newNote));
    setNewNote(zeroNote);
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="Description">
        Descripción
        <textarea
          name="Description"
          onChange={(e) => handleChange(e)}
          value={newNote.Description}
        />
      </label>
      <label htmlFor="Urgency">
        Urgencia
        <select
          name="Urgency"
          onChange={(e) => handleChange(e)}
          value={newNote.Urgency}
        >
          <option value="low">baja</option>
          <option value="medium">media</option>
          <option value="high">alta</option>
          <option value="critical">crítica</option>
        </select>
      </label>
      <button type="submit">Crear nota</button>
    </form>
  );
};

export default NotesForm;

interface Props {
  zeroNote: Note;
}