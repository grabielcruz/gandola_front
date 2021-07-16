import { useDispatch } from "react-redux";
import { Note } from "../../types";
import { patchNote } from "./notesSlice";

const NotesPatchForm: React.FC<Props> = ({
  editingNote,
  setEditingNote,
  zeroNote,
}) => {
  const dispatch = useDispatch();

  const clearForm = () => {
    setEditingNote(zeroNote);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEditingNote({
      ...editingNote,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchNote(editingNote));
    clearForm();
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="Description">
        Descripción
        <textarea
          name="Description"
          value={editingNote.Description}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Urgency">
        Urgencia
        <select
          name="Urgency"
          value={editingNote.Urgency}
          onChange={(e) => handleChange(e)}
        >
          <option value="low">baja</option>
          <option value="medium">media</option>
          <option value="high">alta</option>
          <option value="critical">crítica</option>
        </select>
      </label>
      <button type="submit">Actualizar nota</button>
      <button type="button" onClick={() => clearForm()}>Limpiar</button>
    </form>
  );
};

export default NotesPatchForm;

interface Props {
  editingNote: Note;
  setEditingNote: React.Dispatch<React.SetStateAction<Note>>;
  zeroNote: Note;
}
