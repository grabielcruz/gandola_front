import { ChangeEvent } from "react";
import { PendingTransaction } from "../../types";
import { useDispatch } from "react-redux";
import { patchPendingTransactions } from "./pendingTransactionsSlice";

const PendingTransactionsPatchForm: React.FC<Props> = ({
  editingPendingTransaction,
  setEditingPendingTransaction,
}) => {
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount") {
      setEditingPendingTransaction({
        ...editingPendingTransaction,
        Amount: Number(e.target.value),
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
      Actor: 1,
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
          value={editingPendingTransaction.Actor}
        >
          <option value="1">Externo</option>
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
