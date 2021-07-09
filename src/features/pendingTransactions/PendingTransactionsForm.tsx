import { ChangeEvent, useState } from "react";
import { PendingTransaction } from "../../types";
import { useDispatch } from "react-redux";
import { createPendingTransaction } from "./pendingTransactionsSlice";

const PendingTransactionsForm = () => {
  const dispatch = useDispatch();
  const zeroTransaction: PendingTransaction = {
    Id: 0,
    Type: "input",
    Amount: 0,
    Description: "",
    Actor: 1,
    CreatedAt: "",
  };
  const [newPendingTransaction, setNewPendingTransaction] =
    useState<PendingTransaction>(zeroTransaction);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount") {
      setNewPendingTransaction({
        ...newPendingTransaction,
        Amount: Number(e.target.value),
      });
      return;
    }
    setNewPendingTransaction({
      ...newPendingTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPendingTransaction(newPendingTransaction));
    setNewPendingTransaction(zeroTransaction)
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <label htmlFor="type">
        Tipo
        <select
          name="Type"
          placeholder="Tipo"
          onChange={(e) => handleChange(e)}
          value={newPendingTransaction.Type}
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
          value={newPendingTransaction.Description}
        />
      </label>

      <label htmlFor="Amount">
        Monto
        <input
          type="number"
          name="Amount"
          onChange={(e) => handleChange(e)}
          value={Number(newPendingTransaction.Amount).toString()}
        />
      </label>

      <label htmlFor="Actor">
        Actor
        <select
          name="Actor"
          onChange={(e) => handleChange(e)}
          value={newPendingTransaction.Actor}
        >
          <option value="1">Externo</option>
        </select>
      </label>
      <button type="submit">Crear transacción</button>
    </form>
  );
};

export default PendingTransactionsForm;
