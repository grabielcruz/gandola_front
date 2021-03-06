import { ChangeEvent, useEffect, useState } from "react";
import { PendingTransaction } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { createPendingTransaction } from "./pendingTransactionsSlice";
import { RootState } from "../../app/store";
import { fetchActors } from "../actors/actorsSlice";

const PendingTransactionsForm = () => {
  const dispatch = useDispatch();
  const zeroTransaction: PendingTransaction = {
    Id: 0,
    Type: "input",
    Currency: "USD",
    Amount: 0,
    Description: "",
    Actor: {
      Id: 1,
      Name: ""
    },
    CreatedAt: "",
  };
  const [newPendingTransaction, setNewPendingTransaction] =
    useState<PendingTransaction>(zeroTransaction);

  const actors = useSelector((state: RootState) => state.Actors.Actors);
  const actorsStatus = useSelector((state: RootState) => state.Actors.Status);

  useEffect(() => {
    if (actorsStatus === "idle") dispatch(fetchActors());
  }, [actorsStatus, dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "Amount") {
      setNewPendingTransaction({
        ...newPendingTransaction,
        [e.target.name]: Number(e.target.value),
      });
      return;
    }
    if (e.target.name === "Actor") {
      setNewPendingTransaction({
        ...newPendingTransaction,
        Actor: {Id: Number(e.target.value), Name: ""},
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
    setNewPendingTransaction(zeroTransaction);
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

      <label htmlFor="type">
        Moneda
        <select
          name="Currency"
          placeholder="Moneda"
          onChange={(e) => handleChange(e)}
          value={newPendingTransaction.Currency}
        >
          <option value="USD">USD</option>
          <option value="VES">VES</option>
        </select>
      </label>

      <label htmlFor="Description">
        Descripci??n
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
          value={newPendingTransaction.Actor.Id}
        >
          {actors.map((actor, i) => (
            <option key={i} value={actor.Id}>
              {actor.Name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Crear transacci??n</button>
    </form>
  );
};

export default PendingTransactionsForm;
