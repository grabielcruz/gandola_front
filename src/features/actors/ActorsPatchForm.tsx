import axios from "axios";
import { useDispatch } from "react-redux";
import { Actor } from "../../types";
import { updatePendingTransactionsActors } from "../pendingTransactions/pendingTransactionsSlice";
import { updateTransactionsActors } from "../transactions/transactionsSlice";
import {setActorsError, setActorsStatus, updateActor } from "./actorsSlice";

const ActorsPatchForm: React.FC<Props> = ({
  editingActor,
  setEditingActor,
  zeroActor,
}) => {
  const dispatch = useDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditingActor({
      ...editingActor,
      [name]: value,
    });
  };

  const clearForm = () => {
    setEditingActor(zeroActor);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(patchActor(editingActor));
    const patchActor = async () => {
      try {
        dispatch(setActorsStatus("loading"))
        const response = await axios.patch(`/actors/${editingActor.Id}`, editingActor);
        dispatch(updateActor(response.data))
        dispatch(updateTransactionsActors(response.data))
        dispatch(updatePendingTransactionsActors(response.data))
        dispatch(setActorsStatus("succeeded"))
      } catch (error) { 
        dispatch(setActorsStatus("failed"))
        dispatch(setActorsError(error.response.data))
      }
    }
    patchActor()
    clearForm();
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="Name">
        Nombre
        <input
          type="text"
          name="Name"
          value={editingActor.Name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="Description">
        Descripción
        <input
          type="text"
          name="Description"
          value={editingActor.Description}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="IsCompany">
        Empresa
        <input
          type="checkbox"
          name="IsCompany"
          checked={editingActor.IsCompany}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button>Guardar Cambios</button>
      <button type="button" onClick={() => clearForm()}>
        Cerrar
      </button>
    </form>
  );
};

export default ActorsPatchForm;

interface Props {
  editingActor: Actor;
  setEditingActor: React.Dispatch<React.SetStateAction<Actor>>;
  zeroActor: Actor;
}
