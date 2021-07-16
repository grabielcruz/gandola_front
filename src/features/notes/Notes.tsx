import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchNotes } from "./notesSlice";

const Notes = () => {
  const status = useSelector((state: RootState) => state.Notes.Status);
  const notes = useSelector((state: RootState) => state.Notes.Notes);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchNotes());
  }, [status, dispatch]);
  return (
    <div>
      {status === "loading" && <p>Cargando...</p>}
      {notes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Descripión</th>
              <th>Urgencia</th>
              <th>Atendida</th>
              <th>Created el</th>
              <th>Atendido el</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, i) => (
              <tr key={i}>
                <td>{note.Id}</td>
                <td>{note.Description}</td>
                <td>{note.Urgency}</td>
                <td>{note.Attended}</td>
                <td>{note.CreatedAt}</td>
                <td>{note.AttendedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notes;
