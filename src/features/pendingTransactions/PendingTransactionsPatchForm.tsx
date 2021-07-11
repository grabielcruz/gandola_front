import { ChangeEvent, useEffect } from "react";
import { PendingTransaction } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { patchPendingTransactions } from "./pendingTransactionsSlice";
import { RootState } from "../../app/store";
import { fetchActors } from "../actors/actorsSlice";

const PendingTransactionsPatchForm: React.FC<Props> = ({
  editingPendingTransaction,
  setEditingPendingTransaction,
}) => {
  const dispatch = useDispatch();

  const actors = useSelector((state: RootState) => state.Actors.Actors);
  const actorsStatus = useSelector((state: RootState) => state.Actors.Status);

  useEffect(() => {
    if (actorsStatus === "idle") dispatch(fetchActors());
  }, [actorsStatus, dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount" || e.target.name === "Actor") {
      setEditingPendingTransaction({
        ...editingPendingTransaction,
        [e.target.name]: Number(e.target.value),
      });
      return;
    }
    if (e.target.name === "Actor") {
      setEditingPendingTransaction({
        ...editingPendingTransaction,
        Actor: {Id: Number(e.target.value), Name: ""},
      });
      return;
    }
    setEditingPendingTransaction({
      ...editingPendingTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setEditingPendingTransaction({
      Id: 0,
      Type: "input",
      Amount: 0,
      Description: "",
      Actor: {
        Id: 1,
        Name: ""
      },
      CreatedAt: "",
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchPendingTransactions(editingPendingTransaction));
    clearForm();
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="type">
        Tipo
        <select
          name="Type"
          placeholder="Tipo"
          onChange={(e) => handleChange(e)}
          value={editingPendingTransaction.Type}
        >
          <option value="output">Pago</option>
          <option value="input">Cobro</option>
        </select>
      </label>

      <label htmlFor="Description">
        Descripción
        <input
          type="text"
          name="Description"
          onChange={(e) => handleChange(e)}
          value={editingPendingTransaction.Description}
        />
      </label>

      <label htmlFor="Amount">
        Monto
        <input
          type="number"
          name="Amount"
          onChange={(e) => handleChange(e)}
          value={Number(editingPendingTransaction.Amount).toString()}
        />
      </label>

      <label htmlFor="Actor">
        Actor
        <select
          name="Actor"
          onChange={(e) => handleChange(e)}
          value={editingPendingTransaction.Actor.Id}
        >
          {actors.map((actor, i) => (
            <option key={i} value={actor.Id}>
              {actor.Name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={clearForm}>
        Cerrar
      </button>
    </form>
  );
};

export default PendingTransactionsPatchForm;

interface Props {
  editingPendingTransaction: PendingTransaction;
  setEditingPendingTransaction: React.Dispatch<
    React.SetStateAction<PendingTransaction>
  >;
}
